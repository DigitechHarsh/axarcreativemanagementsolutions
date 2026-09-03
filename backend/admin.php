<?php
session_start();
require_once 'config.php';

// Hardcoded Admin Credentials
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin123');

// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === ADMIN_USER && $password === ADMIN_PASS) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $login_error = "Invalid username or password.";
    }
}

// Check Authentication
$is_logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Active Tab
$active_tab = $_GET['tab'] ?? 'leads';
if (!in_array($active_tab, ['leads', 'services', 'projects'])) {
    $active_tab = 'leads';
}

$flash_success = $_SESSION['flash_success'] ?? null;
$flash_error = $_SESSION['flash_error'] ?? null;
unset($_SESSION['flash_success'], $_SESSION['flash_error']);

// Connect to Database if logged in
$pdo = null;
if ($is_logged_in) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    } catch (PDOException $e) {
        die("Database Connection failed: " . $e->getMessage());
    }

    // CSRF verification helper for POST requests
    function verify_csrf() {
        if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
            $_SESSION['flash_error'] = "Invalid CSRF security token.";
            return false;
        }
        return true;
    }

    // -------------------------------------------------------------
    // HANDLE LEADS ACTIONS
    // -------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_lead_status'])) {
        if (verify_csrf()) {
            $id = intval($_POST['id']);
            $status = $_POST['status'];
            $allowed_statuses = ['new', 'contacted', 'closed'];

            if (in_array($status, $allowed_statuses)) {
                $stmt = $pdo->prepare("UPDATE contact_submissions SET status = ? WHERE id = ?");
                $stmt->execute([$status, $id]);
                $_SESSION['flash_success'] = "Lead status updated successfully.";
            }
        }
        header('Location: admin.php?tab=leads');
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_lead'])) {
        if (verify_csrf()) {
            $id = intval($_POST['id']);
            $stmt = $pdo->prepare("DELETE FROM contact_submissions WHERE id = ?");
            $stmt->execute([$id]);
            $_SESSION['flash_success'] = "Lead deleted successfully.";
        }
        header('Location: admin.php?tab=leads');
        exit;
    }

    // -------------------------------------------------------------
    // HANDLE SERVICES ACTIONS (Add, Edit, Delete)
    // -------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_service'])) {
        if (verify_csrf()) {
            $id = !empty($_POST['service_id']) ? intval($_POST['service_id']) : null;
            $title = trim($_POST['title'] ?? '');
            $category = in_array($_POST['category'], ['Business Consulting', 'Technical Expertise']) ? $_POST['category'] : 'Business Consulting';
            $short_desc = trim($_POST['short_desc'] ?? '');
            $image_url = trim($_POST['image_url'] ?? '');
            $details = trim($_POST['details'] ?? '');
            $display_order = intval($_POST['display_order'] ?? 0);

            if (!empty($title) && !empty($short_desc)) {
                if ($id) {
                    // Update
                    $stmt = $pdo->prepare("UPDATE services SET title = ?, category = ?, short_desc = ?, image_url = ?, details = ?, display_order = ? WHERE id = ?");
                    $stmt->execute([$title, $category, $short_desc, $image_url, $details, $display_order, $id]);
                    $_SESSION['flash_success'] = "Service updated successfully.";
                } else {
                    // Insert
                    $stmt = $pdo->prepare("INSERT INTO services (title, category, short_desc, image_url, details, display_order) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([$title, $category, $short_desc, $image_url, $details, $display_order]);
                    $_SESSION['flash_success'] = "New service added successfully.";
                }
            } else {
                $_SESSION['flash_error'] = "Service title and short description are required.";
            }
        }
        header('Location: admin.php?tab=services');
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_service'])) {
        if (verify_csrf()) {
            $id = intval($_POST['service_id']);
            $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
            $stmt->execute([$id]);
            $_SESSION['flash_success'] = "Service removed successfully.";
        }
        header('Location: admin.php?tab=services');
        exit;
    }

    // -------------------------------------------------------------
    // HANDLE PROJECTS ACTIONS (Add, Edit, Delete)
    // -------------------------------------------------------------
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_project'])) {
        if (verify_csrf()) {
            $id = !empty($_POST['project_id']) ? intval($_POST['project_id']) : null;
            $service_id = !empty($_POST['service_id']) ? intval($_POST['service_id']) : null;
            $title = trim($_POST['title'] ?? '');
            $category_name = trim($_POST['category_name'] ?? 'General');
            $description = trim($_POST['description'] ?? '');
            $image_url = trim($_POST['image_url'] ?? '');
            $project_url = trim($_POST['project_url'] ?? '');
            $tag_style = trim($_POST['tag_style'] ?? 'bg-accent/20 text-accent border border-accent/30');
            $featured = isset($_POST['featured']) ? 1 : 0;
            $display_order = intval($_POST['display_order'] ?? 0);

            if (!empty($title) && !empty($description)) {
                if ($id) {
                    // Update
                    $stmt = $pdo->prepare("
                        UPDATE projects 
                        SET service_id = ?, title = ?, category_name = ?, description = ?, image_url = ?, project_url = ?, tag_style = ?, featured = ?, display_order = ? 
                        WHERE id = ?
                    ");
                    $stmt->execute([$service_id, $title, $category_name, $description, $image_url, $project_url, $tag_style, $featured, $display_order, $id]);
                    $_SESSION['flash_success'] = "Project updated successfully.";
                } else {
                    // Insert
                    $stmt = $pdo->prepare("
                        INSERT INTO projects (service_id, title, category_name, description, image_url, project_url, tag_style, featured, display_order) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ");
                    $stmt->execute([$service_id, $title, $category_name, $description, $image_url, $project_url, $tag_style, $featured, $display_order]);
                    $_SESSION['flash_success'] = "New project added successfully.";
                }
            } else {
                $_SESSION['flash_error'] = "Project title and description are required.";
            }
        }
        header('Location: admin.php?tab=projects');
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_project'])) {
        if (verify_csrf()) {
            $id = intval($_POST['project_id']);
            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            $_SESSION['flash_success'] = "Project deleted successfully.";
        }
        header('Location: admin.php?tab=projects');
        exit;
    }

    // -------------------------------------------------------------
    // FETCH DATA FOR ACTIVE VIEWS
    // -------------------------------------------------------------
    $services_stmt = $pdo->query("SELECT * FROM services ORDER BY display_order ASC, id ASC");
    $all_services = $services_stmt->fetchAll();

    $submissions_stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    $submissions = $submissions_stmt->fetchAll();

    $projects_stmt = $pdo->query("
        SELECT p.*, s.title AS service_title, s.category AS service_category 
        FROM projects p 
        LEFT JOIN services s ON p.service_id = s.id 
        ORDER BY p.display_order ASC, p.id ASC
    ");
    $projects = $projects_stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Axar Admin Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#b3282d', // Deep corporate red
                        accent: '#c99a3e',  // Luxury gold
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100 min-h-screen font-sans text-gray-900">

<?php if (!$is_logged_in): ?>
    <!-- Login Screen -->
    <div class="flex items-center justify-center min-h-screen bg-gray-900 px-4">
        <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
            <div class="text-center mb-8">
                <div class="inline-block px-3 py-1 bg-red-50 text-primary font-bold text-xs rounded-full uppercase tracking-wider mb-3">Admin Portal</div>
                <h1 class="text-2xl font-bold text-gray-900">Axar Creative Solutions</h1>
                <p class="text-gray-500 text-sm mt-1">Sign in to manage services, portfolio & leads</p>
            </div>
            
            <?php if (isset($login_error)): ?>
                <div class="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center">
                    <svg class="w-4 h-4 mr-2 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                    <?php echo htmlspecialchars($login_error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="admin.php">
                <input type="hidden" name="login" value="1">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">Username</label>
                    <input class="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-800 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" id="username" name="username" type="text" placeholder="admin" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">Password</label>
                    <input class="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-800 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" id="password" name="password" type="password" placeholder="••••••••" required>
                </div>
                <button class="w-full bg-primary hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none shadow-lg shadow-primary/30 transition-all duration-200" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    </div>
<?php else: ?>
    <!-- Admin Dashboard Header -->
    <header class="bg-gray-900 text-white shadow-lg sticky top-0 z-30">
        <div class="container mx-auto px-4 py-3.5 flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center space-x-6">
                <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 rounded-full bg-primary inline-block"></span>
                    <h1 class="text-xl font-bold tracking-wider">AXAR <span class="text-primary font-normal">ADMIN</span></h1>
                </div>

                <!-- Navigation Tabs -->
                <nav class="flex space-x-1 sm:space-x-2">
                    <a href="admin.php?tab=leads" class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors <?php echo $active_tab === 'leads' ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-800 hover:text-white'; ?>">
                        Leads (<?php echo count($submissions); ?>)
                    </a>
                    <a href="admin.php?tab=services" class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors <?php echo $active_tab === 'services' ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-800 hover:text-white'; ?>">
                        Manage Services (<?php echo count($all_services); ?>)
                    </a>
                    <a href="admin.php?tab=projects" class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors <?php echo $active_tab === 'projects' ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-800 hover:text-white'; ?>">
                        Manage Projects (<?php echo count($projects); ?>)
                    </a>
                </nav>
            </div>

            <div class="flex items-center space-x-3">
                <a href="https://acms.harshaicreations.com" target="_blank" class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors hidden sm:inline-block">
                    View Website ↗
                </a>
                <a href="logout.php" class="text-xs bg-red-950/80 text-red-200 hover:bg-red-900 border border-red-800/50 px-3 py-1.5 rounded-lg transition-colors">
                    Logout
                </a>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-7xl">
        <!-- Toast Alerts -->
        <?php if ($flash_success): ?>
            <div class="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center shadow-sm">
                <svg class="w-5 h-5 mr-2 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span><?php echo htmlspecialchars($flash_success); ?></span>
            </div>
        <?php endif; ?>

        <?php if ($flash_error): ?>
            <div class="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center shadow-sm">
                <svg class="w-5 h-5 mr-2 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                <span><?php echo htmlspecialchars($flash_error); ?></span>
            </div>
        <?php endif; ?>

        <!-- ============================================================= -->
        <!-- TAB 1: LEADS SUBMISSIONS -->
        <!-- ============================================================= -->
        <?php if ($active_tab === 'leads'): ?>
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Contact Submissions</h2>
                    <p class="text-gray-500 text-sm mt-1">Manage and track client inquiries submitted via contact forms.</p>
                </div>
                <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <span class="text-sm text-gray-500 font-medium">Total Leads:</span>
                    <span class="ml-2 font-bold text-gray-900"><?php echo count($submissions); ?></span>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                                <th class="p-4 font-semibold">Date</th>
                                <th class="p-4 font-semibold">Contact Details</th>
                                <th class="p-4 font-semibold">Service</th>
                                <th class="p-4 font-semibold">Message</th>
                                <th class="p-4 font-semibold">Status</th>
                                <th class="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 text-sm">
                            <?php if (empty($submissions)): ?>
                                <tr>
                                    <td colspan="6" class="p-12 text-center text-gray-500">No contact submissions found.</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($submissions as $sub): ?>
                                    <tr class="hover:bg-gray-50/80 transition-colors">
                                        <td class="p-4 whitespace-nowrap text-gray-500 align-top">
                                            <div class="font-medium text-gray-700"><?php echo date('M d, Y', strtotime($sub['submitted_at'])); ?></div>
                                            <div class="text-xs text-gray-400"><?php echo date('h:i A', strtotime($sub['submitted_at'])); ?></div>
                                        </td>
                                        <td class="p-4 align-top">
                                            <div class="font-bold text-gray-900"><?php echo htmlspecialchars($sub['full_name']); ?></div>
                                            <div class="text-xs text-gray-600 mt-0.5"><a href="mailto:<?php echo htmlspecialchars($sub['email']); ?>" class="hover:text-primary underline"><?php echo htmlspecialchars($sub['email']); ?></a></div>
                                            <?php if (!empty($sub['phone'])): ?>
                                                <div class="text-xs text-gray-600 mt-0.5"><a href="tel:<?php echo htmlspecialchars($sub['phone']); ?>" class="hover:text-primary"><?php echo htmlspecialchars($sub['phone']); ?></a></div>
                                            <?php endif; ?>
                                            <?php if (!empty($sub['company_name'])): ?>
                                                <div class="text-xs mt-1.5 inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium border border-gray-200">
                                                    <?php echo htmlspecialchars($sub['company_name']); ?>
                                                </div>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 text-gray-700 align-top font-medium">
                                            <span class="inline-block bg-red-50 text-primary px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100">
                                                <?php echo htmlspecialchars($sub['service_interested'] ?: 'General'); ?>
                                            </span>
                                        </td>
                                        <td class="p-4 align-top min-w-[240px]">
                                            <p class="text-gray-700 whitespace-pre-wrap break-words leading-relaxed"><?php echo htmlspecialchars($sub['message']); ?></p>
                                        </td>
                                        <td class="p-4 align-top">
                                            <form method="POST" action="admin.php">
                                                <input type="hidden" name="update_lead_status" value="1">
                                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                                                <input type="hidden" name="id" value="<?php echo $sub['id']; ?>">
                                                <select name="status" onchange="this.form.submit()" class="text-xs font-bold rounded-full px-3 py-1 border outline-none appearance-none cursor-pointer text-center
                                                    <?php 
                                                        echo $sub['status'] === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                                            ($sub['status'] === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                                            'bg-green-50 text-green-700 border-green-200'); 
                                                    ?>
                                                ">
                                                    <option value="new" <?php echo $sub['status'] === 'new' ? 'selected' : ''; ?>>New</option>
                                                    <option value="contacted" <?php echo $sub['status'] === 'contacted' ? 'selected' : ''; ?>>Contacted</option>
                                                    <option value="closed" <?php echo $sub['status'] === 'closed' ? 'selected' : ''; ?>>Closed</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td class="p-4 align-top text-right">
                                            <form method="POST" action="admin.php" onsubmit="return confirm('Are you sure you want to delete this lead?');">
                                                <input type="hidden" name="delete_lead" value="1">
                                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                                                <input type="hidden" name="id" value="<?php echo $sub['id']; ?>">
                                                <button type="submit" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete Lead">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        <!-- ============================================================= -->
        <!-- TAB 2: MANAGE SERVICES -->
        <!-- ============================================================= -->
        <?php elseif ($active_tab === 'services'): ?>
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Manage Services</h2>
                    <p class="text-gray-500 text-sm mt-1">Add, update, or remove business consulting and technical services.</p>
                </div>
                <button onclick="openServiceModal()" class="bg-primary hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-md shadow-primary/20 flex items-center transition-colors text-sm">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    + Add New Service
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                                <th class="p-4 font-semibold">Order</th>
                                <th class="p-4 font-semibold">Service Details</th>
                                <th class="p-4 font-semibold">Category</th>
                                <th class="p-4 font-semibold">Short Description</th>
                                <th class="p-4 font-semibold">Image</th>
                                <th class="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 text-sm">
                            <?php if (empty($all_services)): ?>
                                <tr>
                                    <td colspan="6" class="p-12 text-center text-gray-500">No services found. Click "+ Add New Service" to create one.</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($all_services as $srv): ?>
                                    <tr class="hover:bg-gray-50/80 transition-colors">
                                        <td class="p-4 text-gray-400 font-mono text-xs align-top">
                                            #<?php echo htmlspecialchars($srv['display_order']); ?>
                                        </td>
                                        <td class="p-4 align-top">
                                            <div class="font-bold text-gray-900 text-base"><?php echo htmlspecialchars($srv['title']); ?></div>
                                            <?php if (!empty($srv['details'])): ?>
                                                <div class="text-xs text-gray-500 mt-1 line-clamp-2 max-w-xs">
                                                    <?php echo nl2br(htmlspecialchars($srv['details'])); ?>
                                                </div>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold <?php echo $srv['category'] === 'Business Consulting' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-purple-50 text-purple-800 border border-purple-200'; ?>">
                                                <?php echo htmlspecialchars($srv['category']); ?>
                                            </span>
                                        </td>
                                        <td class="p-4 align-top max-w-sm text-gray-600">
                                            <?php echo htmlspecialchars($srv['short_desc']); ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <?php if (!empty($srv['image_url'])): ?>
                                                <img src="<?php echo htmlspecialchars($srv['image_url']); ?>" alt="Service thumbnail" class="w-12 h-12 object-cover rounded border border-gray-200 shadow-sm" onerror="this.style.display='none'">
                                            <?php else: ?>
                                                <span class="text-xs text-gray-400">Default</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top text-right whitespace-nowrap">
                                            <button 
                                                onclick='editService(<?php echo json_encode($srv, JSON_HEX_APOS | JSON_HEX_QUOT); ?>)' 
                                                class="text-blue-600 hover:text-blue-800 p-1 mr-2 transition-colors inline-block"
                                                title="Edit Service"
                                            >
                                                <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </button>
                                            <form method="POST" action="admin.php?tab=services" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this service? Linked projects will be unlinked.');">
                                                <input type="hidden" name="delete_service" value="1">
                                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                                                <input type="hidden" name="service_id" value="<?php echo $srv['id']; ?>">
                                                <button type="submit" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete Service">
                                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

        <!-- ============================================================= -->
        <!-- TAB 3: MANAGE PROJECTS (PORTFOLIO) -->
        <!-- ============================================================= -->
        <?php elseif ($active_tab === 'projects'): ?>
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Manage Projects (Portfolio)</h2>
                    <p class="text-gray-500 text-sm mt-1">Showcase client case studies, videos, and websites linked to your services.</p>
                </div>
                <button onclick="openProjectModal()" class="bg-primary hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-md shadow-primary/20 flex items-center transition-colors text-sm">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    + Add New Project
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                                <th class="p-4 font-semibold">Order</th>
                                <th class="p-4 font-semibold">Project Title</th>
                                <th class="p-4 font-semibold">Linked Service</th>
                                <th class="p-4 font-semibold">Category Tag</th>
                                <th class="p-4 font-semibold">Description</th>
                                <th class="p-4 font-semibold">Image</th>
                                <th class="p-4 font-semibold">Featured</th>
                                <th class="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 text-sm">
                            <?php if (empty($projects)): ?>
                                <tr>
                                    <td colspan="8" class="p-12 text-center text-gray-500">No projects found. Click "+ Add New Project" to create one.</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($projects as $proj): ?>
                                    <tr class="hover:bg-gray-50/80 transition-colors">
                                        <td class="p-4 text-gray-400 font-mono text-xs align-top">
                                            #<?php echo htmlspecialchars($proj['display_order']); ?>
                                        </td>
                                        <td class="p-4 align-top">
                                            <div class="font-bold text-gray-900 text-base"><?php echo htmlspecialchars($proj['title']); ?></div>
                                            <?php if (!empty($proj['project_url'])): ?>
                                                <a href="<?php echo htmlspecialchars($proj['project_url']); ?>" target="_blank" class="text-xs text-accent hover:underline mt-0.5 inline-block">
                                                    Live Link ↗
                                                </a>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <?php if (!empty($proj['service_title'])): ?>
                                                <span class="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-primary border border-red-200">
                                                    <?php echo htmlspecialchars($proj['service_title']); ?>
                                                </span>
                                            <?php else: ?>
                                                <span class="text-xs text-gray-400 italic">None (General)</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <span class="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                                <?php echo htmlspecialchars($proj['category_name']); ?>
                                            </span>
                                        </td>
                                        <td class="p-4 align-top max-w-sm text-gray-600">
                                            <?php echo htmlspecialchars($proj['description']); ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <?php if (!empty($proj['image_url'])): ?>
                                                <img src="<?php echo htmlspecialchars($proj['image_url']); ?>" alt="Project thumbnail" class="w-12 h-12 object-cover rounded border border-gray-200 shadow-sm" onerror="this.style.display='none'">
                                            <?php else: ?>
                                                <span class="text-xs text-gray-400">Default</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top whitespace-nowrap">
                                            <?php if ($proj['featured']): ?>
                                                <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">★ Home</span>
                                            <?php else: ?>
                                                <span class="text-gray-400 text-xs">-</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="p-4 align-top text-right whitespace-nowrap">
                                            <button 
                                                onclick='editProject(<?php echo json_encode($proj, JSON_HEX_APOS | JSON_HEX_QUOT); ?>)' 
                                                class="text-blue-600 hover:text-blue-800 p-1 mr-2 transition-colors inline-block"
                                                title="Edit Project"
                                            >
                                                <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            </button>
                                            <form method="POST" action="admin.php?tab=projects" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this project?');">
                                                <input type="hidden" name="delete_project" value="1">
                                                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                                                <input type="hidden" name="project_id" value="<?php echo $proj['id']; ?>">
                                                <button type="submit" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete Project">
                                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php endif; ?>
    </main>

    <!-- ============================================================= -->
    <!-- SERVICE MODAL (Add / Edit) -->
    <!-- ============================================================= -->
    <div id="serviceModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
                <h3 id="serviceModalTitle" class="text-lg font-bold">Add New Service</h3>
                <button onclick="closeServiceModal()" class="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>
            <form method="POST" action="admin.php?tab=services" class="p-6 space-y-4">
                <input type="hidden" name="save_service" value="1">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                <input type="hidden" id="service_id" name="service_id" value="">

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Title *</label>
                    <input type="text" id="service_title" name="title" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="e.g. ISO Management Systems">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category *</label>
                        <select id="service_category" name="category" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none bg-white">
                            <option value="Business Consulting">Business Consulting</option>
                            <option value="Technical Expertise">Technical Expertise</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input type="number" id="service_display_order" name="display_order" value="0" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Short Description *</label>
                    <textarea id="service_short_desc" name="short_desc" rows="2" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="Brief summary of the service..."></textarea>
                </div>

                <!-- Image Upload / URL Section -->
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Image</label>
                    <div class="flex items-center space-x-3 mb-2">
                        <label class="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 transition-colors">
                            <svg class="w-4 h-4 mr-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            Upload File (Cloudinary)
                            <input type="file" accept="image/*" class="hidden" onchange="uploadImageHandler(this, 'service_image_url', 'service_img_preview', 'service_upload_status')">
                        </label>
                        <span id="service_upload_status" class="text-xs text-gray-500"></span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <input type="text" id="service_image_url" name="image_url" class="flex-1 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="Or enter image URL directly...">
                        <img id="service_img_preview" src="" alt="Preview" class="w-10 h-10 object-cover rounded border border-gray-200 hidden">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Detailed Highlights (1 per line)</label>
                    <textarea id="service_details" name="details" rows="3" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="Point 1&#10;Point 2&#10;Point 3"></textarea>
                </div>

                <div class="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                    <button type="button" onclick="closeServiceModal()" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                    <button type="submit" class="px-5 py-2 text-sm bg-primary hover:bg-red-800 text-white rounded-lg font-bold shadow-md shadow-primary/20">Save Service</button>
                </div>
            </form>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PROJECT MODAL (Add / Edit with Service Dropdown) -->
    <!-- ============================================================= -->
    <div id="projectModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
                <h3 id="projectModalTitle" class="text-lg font-bold">Add New Project / Portfolio</h3>
                <button onclick="closeProjectModal()" class="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            </div>
            <form method="POST" action="admin.php?tab=projects" class="p-6 space-y-4">
                <input type="hidden" name="save_project" value="1">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
                <input type="hidden" id="project_id" name="project_id" value="">

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Belongs to Service (Dropdown) *</label>
                    <select id="project_service_id" name="service_id" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none bg-white">
                        <option value="">-- General / No Service Linked --</option>
                        <?php foreach ($all_services as $srv): ?>
                            <option value="<?php echo $srv['id']; ?>">
                                <?php echo htmlspecialchars($srv['title']); ?> (<?php echo htmlspecialchars($srv['category']); ?>)
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Title *</label>
                    <input type="text" id="project_title" name="title" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="e.g. Global Supply Chain Overhaul">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category Filter Tag *</label>
                        <input type="text" id="project_category_name" name="category_name" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="e.g. Consulting Case Studies">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Display Order</label>
                        <input type="number" id="project_display_order" name="display_order" value="0" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Description *</label>
                    <textarea id="project_description" name="description" rows="3" required class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="Outcome and impact of this project..."></textarea>
                </div>

                <!-- Image Upload / URL Section -->
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Image</label>
                    <div class="flex items-center space-x-3 mb-2">
                        <label class="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 transition-colors">
                            <svg class="w-4 h-4 mr-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            Upload File (Cloudinary)
                            <input type="file" accept="image/*" class="hidden" onchange="uploadImageHandler(this, 'project_image_url', 'project_img_preview', 'project_upload_status')">
                        </label>
                        <span id="project_upload_status" class="text-xs text-gray-500"></span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <input type="text" id="project_image_url" name="image_url" class="flex-1 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="Or enter image URL directly...">
                        <img id="project_img_preview" src="" alt="Preview" class="w-10 h-10 object-cover rounded border border-gray-200 hidden">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Live URL</label>
                    <input type="text" id="project_project_url" name="project_url" class="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none" placeholder="https://example.com">
                </div>

                <div class="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="project_featured" name="featured" class="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary">
                    <label for="project_featured" class="text-sm text-gray-700 font-semibold cursor-pointer">Feature on Homepage (Preview Section)</label>
                </div>

                <div class="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                    <button type="button" onclick="closeProjectModal()" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                    <button type="submit" class="px-5 py-2 text-sm bg-primary hover:bg-red-800 text-white rounded-lg font-bold shadow-md shadow-primary/20">Save Project</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Upload Image Helper using Fetch API
        async function uploadImageHandler(inputEl, inputTargetId, previewImgId, statusTextId) {
            if (!inputEl.files || inputEl.files.length === 0) return;
            const file = inputEl.files[0];
            const statusEl = document.getElementById(statusTextId);
            const targetInput = document.getElementById(inputTargetId);
            const previewImg = document.getElementById(previewImgId);

            statusEl.innerText = "Uploading to Cloudinary...";
            statusEl.className = "text-xs text-blue-600 font-semibold";

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('upload.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success && data.url) {
                    targetInput.value = data.url;
                    previewImg.src = data.url;
                    previewImg.classList.remove('hidden');
                    statusEl.innerText = "✓ Uploaded successfully!";
                    statusEl.className = "text-xs text-green-600 font-semibold";
                } else {
                    statusEl.innerText = "Upload failed: " + (data.error || 'Unknown error');
                    statusEl.className = "text-xs text-red-600 font-semibold";
                }
            } catch (err) {
                statusEl.innerText = "Network upload error";
                statusEl.className = "text-xs text-red-600 font-semibold";
            }
        }

        // Service Modal Operations
        function openServiceModal() {
            document.getElementById('serviceModalTitle').innerText = 'Add New Service';
            document.getElementById('service_id').value = '';
            document.getElementById('service_title').value = '';
            document.getElementById('service_category').value = 'Business Consulting';
            document.getElementById('service_short_desc').value = '';
            document.getElementById('service_image_url').value = '';
            document.getElementById('service_details').value = '';
            document.getElementById('service_display_order').value = '0';
            document.getElementById('service_upload_status').innerText = '';
            document.getElementById('service_img_preview').classList.add('hidden');
            document.getElementById('serviceModal').classList.remove('hidden');
        }

        function editService(data) {
            document.getElementById('serviceModalTitle').innerText = 'Edit Service';
            document.getElementById('service_id').value = data.id || '';
            document.getElementById('service_title').value = data.title || '';
            document.getElementById('service_category').value = data.category || 'Business Consulting';
            document.getElementById('service_short_desc').value = data.short_desc || '';
            document.getElementById('service_image_url').value = data.image_url || '';
            document.getElementById('service_details').value = data.details || '';
            document.getElementById('service_display_order').value = data.display_order || '0';
            document.getElementById('service_upload_status').innerText = '';
            
            const preview = document.getElementById('service_img_preview');
            if (data.image_url) {
                preview.src = data.image_url;
                preview.classList.remove('hidden');
            } else {
                preview.classList.add('hidden');
            }
            document.getElementById('serviceModal').classList.remove('hidden');
        }

        function closeServiceModal() {
            document.getElementById('serviceModal').classList.add('hidden');
        }

        // Project Modal Operations
        function openProjectModal() {
            document.getElementById('projectModalTitle').innerText = 'Add New Project / Portfolio';
            document.getElementById('project_id').value = '';
            document.getElementById('project_service_id').value = '';
            document.getElementById('project_title').value = '';
            document.getElementById('project_category_name').value = 'Consulting Case Studies';
            document.getElementById('project_description').value = '';
            document.getElementById('project_image_url').value = '';
            document.getElementById('project_project_url').value = '';
            document.getElementById('project_featured').checked = false;
            document.getElementById('project_display_order').value = '0';
            document.getElementById('project_upload_status').innerText = '';
            document.getElementById('project_img_preview').classList.add('hidden');
            document.getElementById('projectModal').classList.remove('hidden');
        }

        function editProject(data) {
            document.getElementById('projectModalTitle').innerText = 'Edit Project';
            document.getElementById('project_id').value = data.id || '';
            document.getElementById('project_service_id').value = data.service_id || '';
            document.getElementById('project_title').value = data.title || '';
            document.getElementById('project_category_name').value = data.category_name || '';
            document.getElementById('project_description').value = data.description || '';
            document.getElementById('project_image_url').value = data.image_url || '';
            document.getElementById('project_project_url').value = data.project_url || '';
            document.getElementById('project_featured').checked = (data.featured == 1);
            document.getElementById('project_display_order').value = data.display_order || '0';
            document.getElementById('project_upload_status').innerText = '';

            const preview = document.getElementById('project_img_preview');
            if (data.image_url) {
                preview.src = data.image_url;
                preview.classList.remove('hidden');
            } else {
                preview.classList.add('hidden');
            }
            document.getElementById('projectModal').classList.remove('hidden');
        }

        function closeProjectModal() {
            document.getElementById('projectModal').classList.add('hidden');
        }

        // Close modal on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeServiceModal();
                closeProjectModal();
            }
        });
    </script>
<?php endif; ?>

</body>
</html>
