<?php

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

$primeiro = $_GET["primeiro"];

date_default_timezone_set('America/Sao_Paulo');

//create

$date = date("dmy");

$sql = "

CREATE TABLE IF NOT EXISTS primeiros (

Date INT NOT NULL,

Nome VARCHAR(255)

);

";

if (!mysqli_query($conn, $sql)) {

die("Error: " . $sql . "<br>" . mysqli_error($conn));

}

//insert

$sql = "

INSERT INTO primeiros (Date, Nome)

VALUES (".$date.", '".$primeiro."')

";

if (!mysqli_query($conn, $sql)) {

die("Error: " . $sql . "<br>" . mysqli_error($conn));

}

// close

mysqli_close($conn);

?>