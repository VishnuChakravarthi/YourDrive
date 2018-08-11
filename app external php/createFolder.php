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

	if (isset($_POST['action']) && $_POST['action'] == 'create_folder'){
		$id = $_POST['id'];
        $dir = $_POST['path'];
		$folder_name = $_POST['folder_name'];

        if (!file_exists($dir.$folder_name)) {
            // print_r('expression');
            mkdir($dir.$folder_name, 0777, true);
            echo '1';
        }else if(file_exists($dir.$folder_name)){
            echo '0';
        }
    }

$conn->close();
?>