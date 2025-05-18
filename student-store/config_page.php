<?php
$host = "localhost";
$db = "student_store";
$user = "root";
$pass = ""; // Empty password is default for XAMPP on macOS

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>