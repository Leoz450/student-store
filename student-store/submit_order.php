<?php


$host = "localhost";
$db = "student_store";
$user = "root";
$pass = ""; 

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);


$name = $_POST['customer_name'];
$email = $_POST['customer_email'];
$cartData = json_decode($_POST['cart_data'], true);

if (!$cartData || count($cartData) === 0) {
  die("Cart is empty.");
}


$productMap = [];
$result = $conn->query("SELECT id, price FROM products");
while ($row = $result->fetch_assoc()) {
  $productMap[$row['id']] = $row['price'];
}


$total = 0;
foreach ($cartData as $item) {
  $price = $productMap[$item['id']];
  $total += $price * $item['quantity'];
}


$stmt = $conn->prepare("INSERT INTO orders (customer_name, customer_email, total_price) VALUES (?, ?, ?)");
$stmt->bind_param("ssd", $name, $email, $total);
$stmt->execute();
$orderId = $stmt->insert_id;
$stmt->close();


$stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");
foreach ($cartData as $item) {
  $stmt->bind_param("iii", $orderId, $item['id'], $item['quantity']);
  $stmt->execute();
}
$stmt->close();

$conn->close();

echo "<h2>Thank you for your order!</h2><p>Order ID: $orderId</p><a href='index.html'>Back to store</a>";
?>
