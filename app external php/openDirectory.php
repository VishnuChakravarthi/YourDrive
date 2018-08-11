<?php

// include "sql.php";

// if (!isset($_SERVER['HTTP_ORIGIN'])) {
//         echo "This is not cross-domain request";
//     exit;
// }

//     header("Access-Control-Allow-Origin: *");
//     header("Content-Type: application/json; charset=utf-8");

//     if (isset($_POST['action']) && $_POST['action'] == 'folderView'){

    $path = 'C:\xampp\htdocs\vishnu\uploads';
    //using the opendir function
    // $dir_handle = @opendir($path) or die("Unable to open $path");
    
    // //Leave only the lastest folder name
    // $dirname = explode("/", $path);
    
    // //display the target folder.
    // echo serialize($dirname);
    // echo "<ul>\n";
    // while (false !== ($file = readdir($dir_handle))) 
    // {
    //     if($file!="." && $file!="..")
    //     {
    //         if (is_dir($path."/".$file))
    //         {
    //             //Display a list of sub folders.
    //             ListFolder($path."/".$file);
    //         }
    //         else
    //         {
    //             //Display a list of files.
    //             echo "<li>$file</li>";
    //         }
    //     }
    // }
    // echo "</ul>\n";
    // echo "</li>\n";
    
    // //closing the directory
    // closedir($dir_handle);
// }
// $conn->close();
     $ffs = scandir($path);
    echo '<ol>';
    foreach($ffs as $ff){
        if($ff != '.' && $ff != '..'){
            // echo '<li>'.$ff;
                $ffss = scandir($path.'/'.$ff);
            foreach ($ffss as $f) {

                echo '<li>'.$f;
                }
            
            // if(is_dir($path.'/'.$ff)) listFolderFiles($path.'/'.$ff);
            echo '</li>';
        }
    }
    echo '</ol>';


?>