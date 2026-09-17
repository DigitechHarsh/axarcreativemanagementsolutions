<?php
// contact.php - Axar Creative Management Solutions Lead & Inquiry Ingestion Endpoint

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';

// Security & CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

// Handle Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method Not Allowed"]);
    exit();
}

// Parse JSON payload or form-encoded POST
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input || !is_array($input)) {
    $input = $_POST;
}

// Extract fields
$fullName = trim($input['fullName'] ?? $input['full_name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$companyName = trim($input['companyName'] ?? $input['company_name'] ?? '');
$serviceInterested = trim($input['serviceInterested'] ?? $input['service_interested'] ?? '');
$message = trim($input['message'] ?? '');
$honeypot = trim($input['_honeypot'] ?? '');
$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

// Anti-Spam Honeypot Verification
if (!empty($honeypot)) {
    // Silently accept bot submission without writing to DB or spamming email
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Inquiry received."]);
    exit();
}

// Validate required inputs
if (empty($fullName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please fill out all required fields (Name, Email, and Message)."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please provide a valid corporate email address."]);
    exit();
}

// Sanitize inputs
$fullNameClean = htmlspecialchars(strip_tags($fullName));
$emailClean = htmlspecialchars(strip_tags($email));
$phoneClean = htmlspecialchars(strip_tags($phone));
$companyNameClean = htmlspecialchars(strip_tags($companyName));
$serviceClean = htmlspecialchars(strip_tags($serviceInterested));
$messageClean = htmlspecialchars(strip_tags($message));

$dbInserted = false;

// 1. Attempt Database Recording
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    $sql = "INSERT INTO contact_submissions 
            (full_name, email, phone, company_name, service_interested, message, ip_address, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'new')";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $fullNameClean, 
        $emailClean, 
        $phoneClean, 
        $companyNameClean, 
        $serviceClean, 
        $messageClean, 
        $ipAddress
    ]);
    $dbInserted = true;
} catch (PDOException $e) {
    error_log("Database submission error in contact.php: " . $e->getMessage());
    // Continue execution to attempt email notification even if database is temporarily unavailable
}

// 2. Dispatch Email Notification
try {
    $subject = "New Inquiry: " . (!empty($serviceClean) ? $serviceClean : "Industrial Consultation") . " - " . SITE_NAME;
    
    $emailContent = "====================================================\n";
    $emailContent .= " NEW INQUIRY RECEIVED - " . SITE_NAME . "\n";
    $emailContent .= "====================================================\n\n";
    $emailContent .= "Client / Contact Name : $fullNameClean\n";
    $emailContent .= "Corporate Email       : $emailClean\n";
    $emailContent .= "Phone / WhatsApp      : $phoneClean\n";
    $emailContent .= "Company / Plant Name  : $companyNameClean\n";
    $emailContent .= "Service / Program     : $serviceClean\n";
    $emailContent .= "Submission Time       : " . date('Y-m-d H:i:s') . "\n";
    $emailContent .= "IP Address            : $ipAddress\n\n";
    $emailContent .= "----------------------------------------------------\n";
    $emailContent .= "FACILITY SCOPE & MESSAGE:\n";
    $emailContent .= "$messageClean\n";
    $emailContent .= "----------------------------------------------------\n";
    
    $headers = "From: noreply@axarcreative.com\r\n";
    $headers .= "Reply-To: $emailClean\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    @mail(ADMIN_EMAIL, $subject, $emailContent, $headers);
} catch (\Throwable $mailErr) {
    error_log("Mail notification error: " . $mailErr->getMessage());
}

// Return Clean Success JSON Response
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Your inquiry has been received successfully. Our principal consultant will connect with you promptly."
]);

