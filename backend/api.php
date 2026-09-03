<?php
// Unified REST API for Admin & Frontend Operations
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

// Hardcoded Admin Credentials
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin123');

// Connect to Database
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Get Action
$action = $_GET['action'] ?? '';

// Parse JSON Body if present
$input_json = file_get_contents('php://input');
$body = json_decode($input_json, true) ?: [];

// -------------------------------------------------------------
// 1. AUTH: LOGIN
// -------------------------------------------------------------
if ($action === 'login') {
    $username = trim($body['username'] ?? $_POST['username'] ?? '');
    $password = trim($body['password'] ?? $_POST['password'] ?? '');

    if ($username === ADMIN_USER && $password === ADMIN_PASS) {
        // Simple token for frontend session validation
        $token = hash('sha256', ADMIN_USER . ADMIN_PASS . 'axar_secret_salt');
        echo json_encode([
            'success' => true,
            'token' => $token,
            'message' => 'Login successful'
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid username or password']);
    }
    exit;
}

// -------------------------------------------------------------
// 2. LEADS: GET, UPDATE, DELETE
// -------------------------------------------------------------
if ($action === 'get_leads') {
    $stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    $leads = $stmt->fetchAll();
    echo json_encode(['success' => true, 'data' => $leads]);
    exit;
}

if ($action === 'update_lead_status') {
    $id = intval($body['id'] ?? $_POST['id'] ?? 0);
    $status = $body['status'] ?? $_POST['status'] ?? '';
    $allowed = ['new', 'contacted', 'closed'];

    if ($id > 0 && in_array($status, $allowed)) {
        $stmt = $pdo->prepare("UPDATE contact_submissions SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        echo json_encode(['success' => true, 'message' => 'Status updated']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid lead data']);
    }
    exit;
}

if ($action === 'delete_lead') {
    $id = intval($body['id'] ?? $_POST['id'] ?? 0);
    if ($id > 0) {
        $stmt = $pdo->prepare("DELETE FROM contact_submissions WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Lead deleted']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid lead ID']);
    }
    exit;
}

// -------------------------------------------------------------
// 3. SERVICES: GET, SAVE (CREATE/UPDATE), DELETE
// -------------------------------------------------------------
if ($action === 'get_services') {
    $stmt = $pdo->query("SELECT * FROM services ORDER BY display_order ASC, id ASC");
    $services = $stmt->fetchAll();
    echo json_encode(['success' => true, 'data' => $services]);
    exit;
}

if ($action === 'save_service') {
    $id = !empty($body['id']) ? intval($body['id']) : (!empty($_POST['id']) ? intval($_POST['id']) : null);
    $title = trim($body['title'] ?? $_POST['title'] ?? '');
    $category = in_array($body['category'] ?? $_POST['category'] ?? '', ['Business Consulting', 'Technical Expertise']) ? ($body['category'] ?? $_POST['category']) : 'Business Consulting';
    $short_desc = trim($body['short_desc'] ?? $_POST['short_desc'] ?? '');
    $image_url = trim($body['image_url'] ?? $_POST['image_url'] ?? '');
    $details = trim($body['details'] ?? $_POST['details'] ?? '');
    $display_order = intval($body['display_order'] ?? $_POST['display_order'] ?? 0);

    if (!empty($title) && !empty($short_desc)) {
        if ($id) {
            $stmt = $pdo->prepare("UPDATE services SET title = ?, category = ?, short_desc = ?, image_url = ?, details = ?, display_order = ? WHERE id = ?");
            $stmt->execute([$title, $category, $short_desc, $image_url, $details, $display_order, $id]);
            echo json_encode(['success' => true, 'message' => 'Service updated successfully']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO services (title, category, short_desc, image_url, details, display_order) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$title, $category, $short_desc, $image_url, $details, $display_order]);
            echo json_encode(['success' => true, 'message' => 'Service created successfully']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title and description are required']);
    }
    exit;
}

if ($action === 'delete_service') {
    $id = intval($body['id'] ?? $_POST['id'] ?? 0);
    if ($id > 0) {
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Service deleted']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid service ID']);
    }
    exit;
}

// -------------------------------------------------------------
// 4. PROJECTS: GET, SAVE (CREATE/UPDATE), DELETE
// -------------------------------------------------------------
if ($action === 'get_projects') {
    $stmt = $pdo->query("
        SELECT p.*, s.title AS service_title, s.category AS service_category 
        FROM projects p 
        LEFT JOIN services s ON p.service_id = s.id 
        ORDER BY p.display_order ASC, p.id ASC
    ");
    $projects = $stmt->fetchAll();
    echo json_encode(['success' => true, 'data' => $projects]);
    exit;
}

if ($action === 'save_project') {
    $id = !empty($body['id']) ? intval($body['id']) : (!empty($_POST['id']) ? intval($_POST['id']) : null);
    $service_id = !empty($body['service_id']) ? intval($body['service_id']) : (!empty($_POST['service_id']) ? intval($_POST['service_id']) : null);
    $title = trim($body['title'] ?? $_POST['title'] ?? '');
    $category_name = trim($body['category_name'] ?? $_POST['category_name'] ?? 'General');
    $description = trim($body['description'] ?? $_POST['description'] ?? '');
    $image_url = trim($body['image_url'] ?? $_POST['image_url'] ?? '');
    $project_url = trim($body['project_url'] ?? $_POST['project_url'] ?? '');
    $tag_style = trim($body['tag_style'] ?? $_POST['tag_style'] ?? 'bg-accent/20 text-accent border border-accent/30');
    $featured = !empty($body['featured']) || !empty($_POST['featured']) ? 1 : 0;
    $display_order = intval($body['display_order'] ?? $_POST['display_order'] ?? 0);

    if (!empty($title) && !empty($description)) {
        if ($id) {
            $stmt = $pdo->prepare("
                UPDATE projects 
                SET service_id = ?, title = ?, category_name = ?, description = ?, image_url = ?, project_url = ?, tag_style = ?, featured = ?, display_order = ? 
                WHERE id = ?
            ");
            $stmt->execute([$service_id, $title, $category_name, $description, $image_url, $project_url, $tag_style, $featured, $display_order, $id]);
            echo json_encode(['success' => true, 'message' => 'Project updated successfully']);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO projects (service_id, title, category_name, description, image_url, project_url, tag_style, featured, display_order) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$service_id, $title, $category_name, $description, $image_url, $project_url, $tag_style, $featured, $display_order]);
            echo json_encode(['success' => true, 'message' => 'Project created successfully']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title and description are required']);
    }
    exit;
}

if ($action === 'delete_project') {
    $id = intval($body['id'] ?? $_POST['id'] ?? 0);
    if ($id > 0) {
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Project deleted']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid project ID']);
    }
    exit;
}

// -------------------------------------------------------------
// 5. CLOUDINARY DIRECT UPLOAD
// -------------------------------------------------------------
if ($action === 'upload_image') {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No image file provided']);
        exit;
    }

    $file = $_FILES['image'];
    $allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $allowed_types)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid file format']);
        exit;
    }

    $timestamp = time();
    $params_to_sign = "timestamp=" . $timestamp;
    $signature = sha1($params_to_sign . CLOUDINARY_API_SECRET);

    $post_fields = [
        'file' => new CURLFile($file['tmp_name'], $mime, $file['name']),
        'timestamp' => $timestamp,
        'api_key' => CLOUDINARY_API_KEY,
        'signature' => $signature,
        'folder' => 'axar_creative'
    ];

    $ch = curl_init("https://api.cloudinary.com/v1_1/" . CLOUDINARY_CLOUD_NAME . "/image/upload");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $curl_error = curl_error($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($curl_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Cloudinary error: ' . $curl_error]);
        exit;
    }

    $result = json_decode($response, true);
    if ($http_code === 200 && isset($result['secure_url'])) {
        echo json_encode([
            'success' => true,
            'url' => $result['secure_url']
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $result['error']['message'] ?? 'Upload failed']);
    }
    exit;
}

http_response_code(404);
echo json_encode(['success' => false, 'error' => 'Action not found']);
