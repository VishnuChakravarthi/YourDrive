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


        $dir = 'uploads/17/virat1/';
        $id = '17';

        $folderFile = array();


            $dirf = $dir;
            $folderobj = new ArrayObject();
            foreach(glob($dirf.'/*', GLOB_ONLYDIR) as $dirff) {
                $dirname = basename($dirff);
                $folderobj -> append($dirname);
            }
            $folderFile = array($folderobj);

            // echo json_encode($folderFile);

            $fileobj = new ArrayObject();

            $files = scandir($dir); 
            foreach($files as $file)
                // echo $file;
            {
                if(is_file($dir . $file)){
                    $fileobj -> append($file);
                }
                
                // print_r('expression');

            }
            array_push($folderFile, $fileobj);


            $fileContentobj = new ArrayObject();
            foreach ($fileobj as $file) {
               echo $file;
               $path = $dir.$file;
               $sql = "SELECT * FROM upfile WHERE id = '$id' AND path = '$path' AND name = '$file'";
                $rs = $conn->query($sql);
                $row = mysqli_fetch_object($rs);
                $fileContentobj -> append($row -> file);
        // $num = mysqli_num_rows($rs);
                // echo $path;
            }

              echo json_encode($fileContentobj);
              array_push($folderFile, $fileContentobj);
            echo json_encode($folderFile);

$conn->close();
?>