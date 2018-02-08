<?php

//validate

date_default_timezone_set('America/Sao_Paulo');

$date = date("Y-m-d");

// $primeiro = $_POST["primeiro"];

// if(preg_match('/--/', $primeiro)){
//     die("Invalid Name (primeiro): " . $primeiro);
// }

// if(!preg_match('/(?=^.{0,40}$)^[a-zA-Z]+\s[a-zA-Z]+$/', $primeiro)){
//     die("Invalid Name (primeiro): " . $primeiro);
// }

//dbinfo

$servername = "mysql.hostinger.com.br";

$username = "u662107342_user";

$password = "k]9VFku[OHBf]Dc^SM";

$dbname = "u662107342_db";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection

if (!$conn) {

die("Connection failed: " . mysqli_connect_error());

}

//create

$primeiro = mysqli_real_escape_string($conn, $_POST["primeiro"]); //validate

$sql = "

CREATE TABLE IF NOT EXISTS primeiros (

ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

Data DATE NOT NULL,

Nome VARCHAR(255) NOT NULL

);

";

if (!mysqli_query($conn, $sql)) {

die("Error: " . $sql . "<br>" . mysqli_error($conn));

}

//insert

$sql = "

INSERT INTO primeiros (Data, Nome)

VALUES ('".$date."', '".$primeiro."')

";

if (!mysqli_query($conn, $sql)) {

die("Error: " . $sql . "<br>" . mysqli_error($conn));

}

// close

mysqli_close($conn);

?>