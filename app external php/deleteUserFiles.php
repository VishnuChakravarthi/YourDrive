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
		$len = count($data)-1;
		for($i = 0; $i <= $len; $i++){
			$date = $data[$i]['date'];
			$file = $data[$i]['file'];
			
			$sql1 = "SELECT path FROM upfile WHERE id='$id' AND dateUploaded='$date' AND file='$file'";
			$rs1=$conn->query($sql1);
			$row=mysqli_fetch_object($rs1);
			$r = $row -> path;
			$p = stripcslashes($r);
			unlink($p);

			$sql = "DELETE FROM upfile WHERE id='$id' AND dateUploaded='$date' AND file='$file' ";
	
			$rs=$conn->query($sql);
		// echo json_encode($date);
			
			// echo json_encode($row);
		}
		// echo json_encode($len);
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