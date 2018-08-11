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

	if (isset($_POST['action']) && $_POST['action'] == 'download_file'){
		$id = $_POST['id'];
        $dir = $_POST['path'];
		$file_name = $_POST['file_name'];

        $path = $dir.$file_name;
               $sql = "SELECT * FROM upfile WHERE id = '$id' AND path = '$path' AND name = '$file_name'";
                $rs = $conn->query($sql);
                $row = mysqli_fetch_object($rs);
                $file64 =  $row -> file;
                echo $file64;
        
    }

$conn->close();
?>