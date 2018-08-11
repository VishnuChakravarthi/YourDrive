<?php

include "sql.php";

// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "dropbox";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

session_start([
    'cookie_lifetime' => 86400,
]);


// if (!isset($_SERVER['HTTP_ORIGIN'])) {
// 		echo "This is not cross-domain request";
//     exit;
// }
// $conn->close();


	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	if (isset($_POST['action']) && $_POST['action'] == 'login'){
		$email = $_POST['email'];
		$pass = $_POST['password'];

		$sql = "SELECT * FROM new_dropbox WHERE email = '$email' AND password = '$pass' limit 1";

		$rs=$conn->query($sql);
		$row=mysqli_fetch_object($rs);
		$userDetail = array();
		if (mysqli_num_rows($rs) <= 0){
			echo "0";
		} else {
			$sql1 = "UPDATE new_dropbox SET login='isTrue' WHERE email='$email'";
			$rs1=$conn->query($sql1);
			$token = bin2hex(openssl_random_pseudo_bytes(16));
			$row -> auth = $token;
			$userDetail[] = $row;
			echo htmlspecialchars(json_encode($userDetail),ENT_NOQUOTES);
		}
		
	} else if (isset($_POST['action']) && $_POST['action'] == 'logout'){
		$email = $_POST['email'];
		date_default_timezone_set('Europe/London');
		$date = date("m/d/Y h:i:sa", time());
		session_destroy(); 
		$sql = "UPDATE new_dropbox SET login='isFalse', lastLogin='$date' WHERE email='$email'";
		$rs=$conn->query($sql);
		if($rs === TRUE){
			echo '1';
		}
		
	} else echo "this is not Login";

$conn->close();
?>