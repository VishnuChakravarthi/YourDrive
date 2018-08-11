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


	// header("Access-Control-Allow-Origin: *");
	// header("Content-Type: application/json; charset=utf-8");

	// if (isset($_POST['action']) && $_POST['action'] == 'deleteFile'){
		// $id = $_POST['id'];
		// $data = $_POST['data'];
		// $file = $_POST['file'];
		// for($i = 0; $i <= $data.length; $i++){
		// 	$date = $data[i].date;
		// 	$file = $data[i].file;
		// 	// $sql = "DELETE FROM upfile WHERE id='$id' AND dateUploaded='$date' AND file='$file' ";
	
		// 	// $rs=$conn->query($sql);
		// }
		

		// 	if ($rs === TRUE) {
		// 	    // echo "New record created successfully";
		// 	    echo $date;
		// 	    echo $file;
		// 	} else {
		// 	    echo json_encode("Error: " . $sql . "<br>" . $conn->error);
		// 	    // echo "0";
		// 	}"14-01-2017 16:40:39.555232"
		// };

// $sql1 = "SELECT path FROM upfile WHERE id = '10'"
$sql1 = "SELECT path FROM upfile WHERE id='10' AND dateUploaded='14-01-2017 17:59:31.664675'";
			$rs=$conn->query($sql1);
			// $row = $rs->fetch_assoc();
			$row=mysqli_fetch_object($rs);
			$r = $row -> path;
			$a = stripslashes($r);
			echo $ad;

$conn->close();
?>