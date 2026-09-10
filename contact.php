<?php
header('Content-Type: application/json');
require __DIR__ . '/database/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name, email, and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email.']);
    exit;
}

$pdo = getDbConnection();

$stmt = $pdo->prepare(
    "INSERT INTO contact_messages (name, email, subject, message) VALUES (:name, :email, :subject, :message)"
);
$stmt->execute([
    ':name'    => $name,
    ':email'   => $email,
    ':subject' => $subject,
    ':message' => $message,
]);

echo json_encode(['success' => true, 'message' => "Thanks! Your message has been received — I'll get back to you soon."]);
