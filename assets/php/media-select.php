<?php
    $servername = preg_match('/localhost/' ,$_SERVER["SERVER_NAME"]) ? "sql131.main-hosting.eu" : "mysql.hostinger.com.br";
    $username = "u432755883_user";
    $password = "IhSoAnXZFmBi@314159";
    $dbname = "u432755883_db";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
        
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $sql = "
    SELECT Data, Media
    FROM medias
    ";
    $result = mysqli_query($conn, $sql);
    
    echo "[";
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($result)) {
            echo '{date: "' . $row['Data']. '", media: ' . $row['Media']. '},';
        }
    } else {
        echo "0 results";
    }
    echo "]";
    
    // close
    mysqli_close($conn);
?>