<?php
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

// sql to create table
	$sql = "CREATE TABLE arjit (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30),
	userName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	secretQuestion VARCHAR(50) NOT NULL,
	secretAnswer VARCHAR(50) NOT NULL,
	RegDate TIMESTAMP
	)";

	if ($conn->query($sql) === TRUE) {
    echo "Table dropboxUsers created successfully";
	} else {
    echo "Error creating table: " . $conn->error;
	}
	


	// $sql = "INSERT INTO user (firstname, lastname, email)
	// VALUES ('Vishnu', 'Chakravarthy', 'vishchakravarthy18@gmail.com')";

	// if ($conn->query($sql) === TRUE) {
	//     echo "New record created successfully";
	// } else {
	//     echo "Error: " . $sql . "<br>" . $conn->error;
	// }

$conn->close();
?>