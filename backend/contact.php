<?php
// contact.php

// Disable error display in production for security
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';

// Security Headers
header("Access-Control-Allow-Origin: " . ALLOWED_ORIGIN);
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("Content-Security-Policy: default-src 'none'");

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

// Parse JSON payload
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// If not JSON, try $_POST (form-encoded)
if (!$input) {
    $input = $_POST;
}

// Extract fields
$fullName = $input['fullName'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$companyName = $input['companyName'] ?? '';
$serviceInterested = $input['serviceInterested'] ?? '';
$message = $input['message'] ?? '';
$honeypot = $input['_honeypot'] ?? '';
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';

// Basic Spam Check / Honeypot
if (!empty($honeypot)) {
    // Silently ignore bot submissions
    http_response_code(200);
    echo json_encode(["success" => true]);
    exit();
}

// Validate required fields
if (empty($fullName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please fill out all required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid email address format."]);
    exit();
}

// Sanitize inputs before insertion/emailing
$fullName = htmlspecialchars(strip_tags($fullName));
$email = htmlspecialchars(strip_tags($email));
$phone = htmlspecialchars(strip_tags($phone));
$companyName = htmlspecialchars(strip_tags($companyName));
$serviceInterested = htmlspecialchars(strip_tags($serviceInterested));
$message = htmlspecialchars(strip_tags($message));

try {
    // Database connection using PDO
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false, // Essential for security
    ];
    
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Prepare SQL Statement (Prevent SQL Injection)
    $sql = "INSERT INTO contact_submissions 
            (full_name, email, phone, company_name, service_interested, message, ip_address) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $fullName, 
        $email, 
        $phone, 
        $companyName, 
        $serviceInterested, 
        $message, 
        $ipAddress
    ]);
    
    // Send Notification Email
    $subject = "New Contact Submission from " . SITE_NAME;
    $emailBody = "You have received a new contact submission:\n\n";
    $emailBody .= "Name: $fullName\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Phone: $phone\n";
    $emailBody .= "Company: $companyName\n";
    $emailBody .= "Service: $serviceInterested\n\n";
    $emailBody .= "Message:\n$message\n\n";
    $emailBody .= "IP Address: $ipAddress\n";
    
    $headers = "From: no-reply@axarcreative.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // mail(ADMIN_EMAIL, $subject, $emailBody, $headers); // Uncomment when on Hostinger server

    // Return success response
    http_response_code(200);
    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    // Log error internally, do not expose to user
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "An internal server error occurred. Please try again later."]);
}
