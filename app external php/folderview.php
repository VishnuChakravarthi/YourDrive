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

	if (isset($_POST['action']) && $_POST['action'] == 'folderview'){
		$id = $_POST['id'];
        $dir = $_POST['path'];
		// $id = '11';
		// $dir = 'uploads/10/New folder/';
		// listFolderFiles($dir);

        $folderFile = array();
        $total = array();
// 		// };

// 		function listFolderFiles($dir){
// 			// print_r("expression");
//     $ffs = scandir($dir);
//     echo '<ul>';
//     foreach($ffs as $ff){
//         if($ff != '.' && $ff != '..'){
//             echo '<li>'.$ff;
//             if(is_dir($dir.'/'.$ff));
//             echo '</li>';
//         }
//     }
//     echo '</ul>';
// }
// $dir    = '/tmp';
// $files1 = scandir($dir);
// $files2 = scandir($dir, 1);

// print_r($files1);
// print_r($files2);
        // function listFolderFiles($dir){
            // echo $dir;
            $dirf = $dir;
            $folderobj = array();
            foreach(glob($dirf.'/*', GLOB_ONLYDIR) as $dirff) {
                $dirname = basename($dirff);
                 array_push($folderobj, $dirname);
            }
            $folderFile = array($folderobj);
            // echo json_encode($folderobj);
         // echo json_encode($folderFile);
         // listfile($dir, $folderFile);
        // }

        // function listfile($dir, $folderFile){
             // echo $dir;
        $files = scandir($dir); 
        $fileobj = array();
        foreach($files as $file)
            // echo $file;
        {
            if(is_file($dir.$file)){
                // echo $files;
                // print_r('expression');
        // echo json_encode($file);
        array_push($fileobj, $file);
                }
        }
        // $folderFile = $fileobj;

        // $total[] = $folderFile;
        array_push($folderFile, $fileobj);

        // $fileContentobj = array();
        //     foreach ($fileobj as $file) {
        //        // echo $file;
        //        $path = $dir.$file;
        //        $sql = "SELECT * FROM upfile WHERE id = '$id' AND path = '$path' AND name = '$file'";
        //         $rs = $conn->query($sql);
        //         $row = mysqli_fetch_object($rs);
        //         $file64 =  $row -> file;
        //         array_push($fileContentobj, $file64);
        //         // $fileContentobj -> append();
        // // $num = mysqli_num_rows($rs);
        //         // echo $path;
        //     }
        //     array_push($folderFile, $fileContentobj);
        echo htmlspecialchars(json_encode($folderFile),ENT_NOQUOTES);

        // }
}
$conn->close();
?>