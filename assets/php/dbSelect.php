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
    
    $sql = "
    SELECT Date, Colocacao, Pontuacao
    FROM $username
    ";
    $result = mysqli_query($conn, $sql);
    
    echo "[";
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            echo '{date: "' . $row['Date']. '", colocacao: ' . $row['Colocacao']. ', pontuacao: ' . $row['Pontuacao']. '},';
        }
    } else {
        echo "0 results";
    }
    echo "]";
    
    // close
    mysqli_close($conn);
?>