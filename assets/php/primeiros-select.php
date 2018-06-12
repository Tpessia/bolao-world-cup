<?php

$servername = $_SERVER["SERVER_ADDR"] == "127.0.0.1" ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
$username = "u432755883_user";
$password = "IhSoAnXZFmBi@314159";
$dbname = "u432755883_db";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection

if (!$conn) {

die("Connection failed: " . mysqli_connect_error());

}

$sql = '

SELECT u.Nome, count(*) as "Ocorrencia"
FROM `primeiros` as u
GROUP BY u.Nome
ORDER BY count(*) DESC;

';

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

// output data of each row

echo '[ ';

while($row = mysqli_fetch_assoc($result)) {

echo '{nome: "' . $row['Nome']. '", ocorrencia: ' . $row['Ocorrencia']. '},';

}

echo ' ]';

} else {

echo "0 results";

}

// close

mysqli_close($conn);

?>

