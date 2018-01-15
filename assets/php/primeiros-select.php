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

$username = $_GET["username"];

$sql = '

SELECT u.Nome, count(*) as "Ocorrencia"
FROM `primeiros` as u
GROUP BY u.Nome
ORDER BY count(*) DESC
LIMIT 1;

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

