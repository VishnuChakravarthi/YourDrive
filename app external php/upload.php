<?php

include "sql.php";

// if (!isset($_SERVER['HTTP_ORIGIN'])) {
// 		echo "This is not cross-domain request";
//     exit;
// }

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	if (isset($_POST['action']) && $_POST['action'] == 'fileUpload'){
	$id = $_POST['id'];
	$file = $_POST['file'];
	$name = $_POST['fileName']; 
	$type = $_POST['fileType']; 
	$size = $_POST['fileSize'];
	$path = $_POST['path'];
	
	if ((( $type== "image/gif") 
	|| ($type == "image/jpeg") 
	|| ($type == "image/png") 
	|| ($type == "application/msword") 
	|| ($type == "application/pdf") 
	|| ($type == "text/plain")
	|| ($type == "text/html") 
	|| ($type == "image/pjpeg")
	|| ($type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
	|| ($type == "audio/mp3")
	|| ($type == "audio/mpeg3")
	|| ($type == "audio/mpg")
	|| ($type == "audio/mpeg")
	|| ($type == "audio/x-mpeg")
	|| ($type == "audio/x-mpeg-3")
	|| ($type == "audio/x-mpegaudio")
	|| ($type == "audio/x-mp3")
	|| ($type == "audio/mpeg3")
	|| ($type == "video/mpeg")
	|| ($type == "video/x-mpeg")
	|| ($type == "video/3gpp")
	|| ($type == "video/quicktime")
	|| ($type == "video/x-msvideo")
	|| ($type == "video/x-ms-wmv")
	|| ($type == "video/mp4")
	|| ($type == "video/x-flv")))
	  { 

	    if($size < 10485900){
	    	$data = $file;

			list($type1, $data) = explode(';', $data);
			list(, $data)      = explode(',', $data);
			$data = base64_decode($data);

			if($path == ''){
				$path = 'uploads/'.$id.'/';
				if (!file_exists($path)) {
					mkdir('uploads/'.$id,0777);
				}

			}else{
				$path;
			}
				date_default_timezone_set('Europe/London');
				$t = microtime(true);
				$micro = sprintf("%06d",($t - floor($t)) * 1000000);
				$d = new DateTime( date('d-m-Y H:i:s.'.$micro, $t) );

				$date = $d->format("d-m-Y H:i:s.u");
				// date_default_timezone_set('Europe/London');
				// $date = date("m/d/Y h:i:s.u", time());
						file_put_contents($path.$name, $data);
				    	$sql = "INSERT INTO upfile (id, type, name, size, file, path, dateUploaded)
							VALUES ('$id', '$type', '$name', '$size', '$file', '$path$name', '$date')";

							if ($conn->query($sql) === TRUE) {
							    // echo "New record created successfully";
							    echo "1";
							} else {
							    echo "Error: " . $sql . "<br>" . $conn->error;
							    echo "0";
							}
				
				// }else{
				// 			file_put_contents($path.$name, $data);
				//     	$sql = "INSERT INTO upfile (id, type, name, size, file, path, dateUploaded)
				// 			VALUES ('$id', '$type', '$name', '$size', '$file', '$path$name', '$date')";

				// 			if ($conn->query($sql) === TRUE) {
				// 			    // echo "New record created successfully";
				// 			    echo "1";
				// 			} else {
				// 			    echo "Error: " . $sql . "<br>" . $conn->error;
				// 			    echo "0";
				// 			}
				// 		}
				
		}else{
			echo json_encode("File size is large");
		}
	}else{
		echo json_encode("File type error");
	}

	
}

$conn->close();

?>

