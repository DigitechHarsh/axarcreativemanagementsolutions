<?php
session_start();
require_once 'config.php';

// Hardcoded Admin Credentials (Change in Production!)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'admin123');

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

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

    // Handle Status Update
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
        $id = intval($_POST['id']);
        $status = $_POST['status'];
        $allowed_statuses = ['new', 'contacted', 'closed'];

        if (in_array($status, $allowed_statuses)) {
            $stmt = $pdo->prepare("UPDATE contact_submissions SET status = ? WHERE id = ?");
            $stmt->execute([$status, $id]);
        }
        header('Location: admin.php');
        exit;
    }

    // Handle Deletion
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_entry'])) {
        $id = intval($_POST['id']);
        $stmt = $pdo->prepare("DELETE FROM contact_submissions WHERE id = ?");
        $stmt->execute([$id]);
        header('Location: admin.php');
        exit;
    }

    // Fetch Submissions
    $stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    $submissions = $stmt->fetchAll();
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
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100 min-h-screen font-sans">

<?php if (!$is_logged_in): ?>
    <!-- Login Screen -->
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
        <div class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-gray-900">Axar Admin Panel</h1>
                <p class="text-gray-500 mt-2">Sign in to manage leads</p>
            </div>
            
            <?php if (isset($login_error)): ?>
                <div class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    <?php echo htmlspecialchars($login_error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="admin.php">
                <input type="hidden" name="login" value="1">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" id="username" name="username" type="text" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" id="password" name="password" type="password" required>
                </div>
                <div class="flex items-center justify-between">
                    <button class="w-full bg-primary hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
<?php else: ?>
    <!-- Dashboard -->
    <nav class="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 class="text-xl font-bold tracking-wider">AXAR <span class="text-primary font-normal">ADMIN</span></h1>
        <a href="logout.php" class="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors">Logout</a>
    </nav>

    <main class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-end mb-6">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Contact Submissions</h2>
                <p class="text-gray-500 text-sm mt-1">Manage all leads generated from the website.</p>
            </div>
            <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span class="text-sm text-gray-500 font-medium">Total Leads:</span>
                <span class="ml-2 font-bold text-gray-900"><?php echo count($submissions); ?></span>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                            <th class="p-4 font-semibold">Date</th>
                            <th class="p-4 font-semibold">Contact Details</th>
                            <th class="p-4 font-semibold">Service</th>
                            <th class="p-4 font-semibold">Message</th>
                            <th class="p-4 font-semibold">Status</th>
                            <th class="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <?php if (empty($submissions)): ?>
                            <tr>
                                <td colspan="6" class="p-8 text-center text-gray-500">No submissions found.</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($submissions as $sub): ?>
                                <tr class="hover:bg-gray-50 transition-colors group">
                                    <td class="p-4 whitespace-nowrap text-sm text-gray-500 align-top">
                                        <?php echo date('M d, Y', strtotime($sub['submitted_at'])); ?><br>
                                        <span class="text-xs text-gray-400"><?php echo date('h:i A', strtotime($sub['submitted_at'])); ?></span>
                                    </td>
                                    <td class="p-4 align-top">
                                        <div class="font-bold text-gray-900"><?php echo htmlspecialchars($sub['full_name']); ?></div>
                                        <div class="text-sm text-gray-600"><a href="mailto:<?php echo htmlspecialchars($sub['email']); ?>" class="hover:text-primary"><?php echo htmlspecialchars($sub['email']); ?></a></div>
                                        <?php if (!empty($sub['phone'])): ?>
                                            <div class="text-sm text-gray-600"><a href="tel:<?php echo htmlspecialchars($sub['phone']); ?>" class="hover:text-primary"><?php echo htmlspecialchars($sub['phone']); ?></a></div>
                                        <?php endif; ?>
                                        <?php if (!empty($sub['company_name'])): ?>
                                            <div class="text-xs mt-1 inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                                                <?php echo htmlspecialchars($sub['company_name']); ?>
                                            </div>
                                        <?php endif; ?>
                                    </td>
                                    <td class="p-4 text-sm text-gray-700 align-top">
                                        <?php echo htmlspecialchars($sub['service_interested'] ?: 'N/A'); ?>
                                    </td>
                                    <td class="p-4 align-top min-w-[250px]">
                                        <p class="text-sm text-gray-700 whitespace-pre-wrap break-words"><?php echo htmlspecialchars($sub['message']); ?></p>
                                    </td>
                                    <td class="p-4 align-top">
                                        <form method="POST" action="admin.php">
                                            <input type="hidden" name="update_status" value="1">
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
                                        <form method="POST" action="admin.php" onsubmit="return confirm('Are you sure you want to delete this lead? This cannot be undone.');">
                                            <input type="hidden" name="delete_entry" value="1">
                                            <input type="hidden" name="id" value="<?php echo $sub['id']; ?>">
                                            <button type="submit" class="text-red-400 hover:text-red-600 transition-colors p-1" title="Delete">
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
    </main>
<?php endif; ?>

</body>
</html>
