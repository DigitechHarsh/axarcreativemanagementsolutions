<?php
// Public API: Get Projects / Portfolio
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $stmt = $pdo->query("
        SELECT 
            p.id, 
            p.service_id, 
            s.title AS service_title, 
            s.category AS service_category,
            p.title, 
            p.category_name, 
            p.description, 
            p.image_url, 
            p.project_url, 
            p.tag_style, 
            p.featured, 
            p.display_order, 
            p.created_at
        FROM projects p
        LEFT JOIN services s ON p.service_id = s.id
        ORDER BY p.display_order ASC, p.id ASC
    ");
    $projects = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $projects
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to fetch projects: ' . $e->getMessage()
    ]);
}
