<?php

include "sql.php";


if (!isset($_SERVER['HTTP_ORIGIN'])) {
		echo "This is not cross-domain request";
    exit;
}


	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");

	if (isset($_POST['action']) && $_POST['action'] == 'register'){
		$firstName = $_POST['firstName'];
		$lastName = $_POST['lastName'];
		$userName = $_POST['userName'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$secret_q = $_POST['secret_q'];
		$secret_a = $_POST['secret_a'];

		$sql = "SELECT * FROM new_dropbox WHERE email = '$email'";
	
		$rs=$conn->query($sql);

		if (mysqli_num_rows($rs) == 1){
			echo "0";
		} else {

			$sql1 = "INSERT INTO new_dropbox (firstName, lastName, userName, email, password, secretQuestion, secretAnswer)
			VALUES ('$firstName', '$lastName', '$userName', '$email', '$password', '$secret_q', '$secret_a')";

			if ($conn->query($sql1) === TRUE) {
			    echo "1";
			} else {
			    echo json_encode("Error: " . $sql . "<br>" . $conn->error);
			}
		}

		
	};

$conn->close();
?>
