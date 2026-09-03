<?php
session_start();
header('Content-Type: application/json');

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No image file uploaded']);
    exit;
}

$file = $_FILES['image'];

// Basic validation
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'File upload error code: ' . $file['error']]);
    exit;
}

$allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime, $allowed_types)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Allowed: JPG, PNG, WEBP, GIF, SVG']);
    exit;
}

// Check Cloudinary configuration
if (defined('CLOUDINARY_CLOUD_NAME') && CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME' && !empty(CLOUDINARY_CLOUD_NAME)) {
    $timestamp = time();
    $folder = 'axar_creative';
    $params_to_sign = "folder=" . $folder . "&timestamp=" . $timestamp;
    $signature = sha1($params_to_sign . CLOUDINARY_API_SECRET);

    $post_fields = [
        'file' => new CURLFile($file['tmp_name'], $mime, $file['name']),
        'folder' => $folder,
        'timestamp' => $timestamp,
        'api_key' => CLOUDINARY_API_KEY,
        'signature' => $signature
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
        echo json_encode(['success' => false, 'error' => 'Cloudinary connection error: ' . $curl_error]);
        exit;
    }

    $result = json_decode($response, true);
    if ($http_code === 200 && isset($result['secure_url'])) {
        echo json_encode([
            'success' => true,
            'url' => $result['secure_url'],
            'public_id' => $result['public_id'] ?? ''
        ]);
        exit;
    } else {
        $msg = $result['error']['message'] ?? 'Cloudinary upload failed';
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $msg]);
        exit;
    }
} else {
    // Fallback to local /uploads/ folder if Cloudinary credentials are not set yet
    $upload_dir = __DIR__ . '/uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $safe_name = uniqid('img_', true) . '.' . strtolower($ext);
    $target_path = $upload_dir . $safe_name;

    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
        $host = $_SERVER['HTTP_HOST'];
        $url = $protocol . $host . '/uploads/' . $safe_name;

        echo json_encode([
            'success' => true,
            'url' => $url,
            'local' => true
        ]);
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file locally.']);
        exit;
    }
}
