<?php
// config.php - Keep this file out of version control in production!

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'axar_web');
define('DB_USER', 'root'); // Change to dedicated low-privilege user in prod
define('DB_PASS', '');

// Allowed Origin for CORS (Change to actual domain in prod, e.g., 'https://axarcreative.com')
define('ALLOWED_ORIGIN', 'http://localhost:3000');

// Email Settings
define('ADMIN_EMAIL', 'info@axarcreative.com');
define('SITE_NAME', 'Axar Creative Management Solutions');
