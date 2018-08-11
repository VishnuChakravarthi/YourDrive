<?php

// include "sql.php";

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dropbox";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



// if (!isset($_SERVER['HTTP_ORIGIN'])) {
// 		echo "This is not cross-domain request";
//     exit;
// }
// $conn->close();

	// if (isset($_POST['action']) && $_POST['action'] == 'login'){
		$email = "vishnu10@gmail.com";
		$pass = "thelegend1093";

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
		
	

$conn->close();
?>