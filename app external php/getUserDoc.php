<?php
include "sql.php";
// // include_once 'dbconfig.php';
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


	if (isset($_POST['action']) && $_POST['action'] == 'fileGetDoc'){
		$id = $_POST['id'];

		$sql = "SELECT * FROM upfile WHERE id = '$id'";
		$rs=$conn->query($sql);
		$num = mysqli_num_rows($rs);
		for ($i=0; $i < $num ; $i++) { 
	
			$row=mysqli_fetch_object($rs);
			$type = $row->type;
			if((($type == "application/msword") 
				|| ($type == "application/pdf") 
				|| ($type == "text/plain")
				|| ($type == "text/html")
				|| ($type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))){
					$userDocs[]=$row;					
				}	
		}
		echo htmlspecialchars(json_encode($userDocs),ENT_NOQUOTES);
	}

	if (isset($_POST['action']) && $_POST['action'] == 'fileGetImg'){
		$id = $_POST['id'];

		$sql = "SELECT * FROM upfile WHERE id = '$id'";
		$rs=$conn->query($sql);
		$num = mysqli_num_rows($rs);
		for ($i=0; $i < $num ; $i++) { 
	
			$row=mysqli_fetch_object($rs);
			$type = $row->type;
			if ((( $type== "image/gif") 
				|| ($type == "image/jpeg") 
				|| ($type == "image/png") 
				|| ($type == "image/pjpeg"))){
					$userImgs[]=$row;
				}	
		}
	echo htmlspecialchars(json_encode($userImgs),ENT_NOQUOTES);
	}

	if (isset($_POST['action']) && $_POST['action'] == 'fileGetAud'){
		$id = $_POST['id'];

		$sql = "SELECT * FROM upfile WHERE id = '$id'";
		$rs=$conn->query($sql);
		$num = mysqli_num_rows($rs);
		for ($i=0; $i < $num ; $i++) { 
	
			$row=mysqli_fetch_object($rs);
			$type = $row->type;
			if((($type == "audio/mp3")
				|| ($type == "audio/mpeg3")
				|| ($type == "audio/mpg")
				|| ($type == "audio/mpeg")
				|| ($type == "audio/x-mpeg")
				|| ($type == "audio/x-mpeg-3")
				|| ($type == "audio/x-mpegaudio")
				|| ($type == "audio/x-mp3")
				|| ($type == "audio/mpeg3"))){
					$userAuds[]=$row;					
				}	
		}
		echo htmlspecialchars(json_encode($userAuds),ENT_NOQUOTES);
	}

	if (isset($_POST['action']) && $_POST['action'] == 'fileGetVid'){
		$id = $_POST['id'];

		$sql = "SELECT * FROM upfile WHERE id = '$id'";
		$rs=$conn->query($sql);
		$num = mysqli_num_rows($rs);
		for ($i=0; $i < $num ; $i++) { 
	
			$row=mysqli_fetch_object($rs);
			$type = $row->type;
			if((($type == "video/mpeg")
				|| ($type == "video/x-mpeg")
				|| ($type == "video/3gpp")
				|| ($type == "video/quicktime")
				|| ($type == "video/x-msvideo")
				|| ($type == "video/x-ms-wmv")
				|| ($type == "video/mp4")
				|| ($type == "video/x-flv"))){
					$userVids[]=$row;					
				}	
		}
		echo htmlspecialchars(json_encode($userVids),ENT_NOQUOTES);
	}

	$conn->close();

	?>
