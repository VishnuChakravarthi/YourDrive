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

	// if (isset($_POST['action']) && $_POST['action'] == 'folderview'){
	// 	$id = $_POST['id'];
		$id = '11';
		$directory = 'uploads';
        $directory_seperator = '/';
		// listFolderFiles($dir);

        getAllSubDirectories( $directory, $directory_seperator );
		// };

	function getAllSubDirectories( $directory, $directory_seperator )
{
    // print_r("expression");
    $dirs = array_map( function($item)use($directory_seperator){ return $item . $directory_seperator;}, array_filter( glob( $directory . '*' ), 'is_dir') );

    foreach( $dirs AS $dir )
    {
        $dirs = array_merge( $dirs, (array)getAllSubDirectories( $dir, $directory_seperator ) );
    }

    print_r($dirs);
}


$conn->close();
?>