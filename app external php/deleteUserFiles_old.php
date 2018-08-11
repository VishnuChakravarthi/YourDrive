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

	if (isset($_POST['action']) && $_POST['action'] == 'deleteFile'){
		$id = $_POST['id'];
		$data = $_POST['data'];
		// $file = $_POST['file'];

		$sql = "DELETE FROM upfile WHERE id='$id'AND dateUploaded='$date' AND file='$file' ";
	
		$rs=$conn->query($sql);

			if ($rs === TRUE) {
			    // echo "New record created successfully";
			    echo "1";
			} else {
			    echo json_encode("Error: " . $sql . "<br>" . $conn->error);
			    // echo "0";
			}
		};

$conn->close();
?>