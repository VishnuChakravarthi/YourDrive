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


// if (!isset($_SERVER['HTTP_ORIGIN'])) {
// 		echo "This is not cross-domain request";
//     exit;
// }


	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	if (isset($_POST['action']) && $_POST['action'] == 'check_email'){
		$email = $_POST['email'];

		$sql = "SELECT secretQuestion FROM new_dropbox WHERE email = '$email' limit 1";
	
		$rs=$conn->query($sql);
		
		if (mysqli_num_rows($rs) == 1){
			// echo "1";
			$row=mysqli_fetch_object($rs);
		$v=$row->secretQuestion;
			echo json_encode($v);
		} else {
			echo "0";
		}

		
	};

	if (isset($_POST['action']) && $_POST['action'] == 'check_det'){
		$email = $_POST['email'];
		$secretAnswer = $_POST['answer'];

		$sql = "SELECT * FROM new_dropbox WHERE email = '$email' AND secretAnswer = '$secretAnswer' limit 1";
	
		$rs=$conn->query($sql);
		$row=mysqli_fetch_object($rs);
		if (mysqli_num_rows($rs) == 1){
			echo "1";
			// echo json_encode($v);
		} else {
			echo "0";
		}

		
	};

	if (isset($_POST['action']) && $_POST['action'] == 'change_pword'){
		$email = $_POST['email'];
		$password = $_POST['password'];

		// $sql = "SELECT * FROM new_dropbox WHERE email = '$email' AND secretAnswer = '$secretAnswer' limit 1";
		$sql = "UPDATE new_dropbox SET password='$password' WHERE email='$email'";

		// $rs=$conn->query($sql);
		if ($conn->query($sql) === TRUE) {
    	echo json_encode("Record updated successfully");
		} else {
    	echo json_encode("Error updating record: " . $conn->error);
		}

		
	};

$conn->close();
?>