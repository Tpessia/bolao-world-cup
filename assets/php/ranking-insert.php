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
        
    
    
    $ranking = $_POST["ranking"];

    $tempData = html_entity_decode($ranking);
    $cleanData = json_decode($tempData);


    date_default_timezone_set('America/Sao_Paulo');


    //create

    $date = date("Y-m-d");

    // $sql = "
    // CREATE TABLE players_$date (
    //     Colocacao INT NOT NULL PRIMARY KEY,
    //     Name VARCHAR(255) NOT NULL,
    //     Pontuacao INT NOT NULL
    // );
    // ";

    $index = 1;
    foreach ($cleanData as $value) {

        // $name = strtolower($value->name);
        // $arr = array("ã","Ã","á","Á","â","Â","à","À","ä","Ä");
        // $name = str_replace($arr,"a",$name);
        // $arr = array("é","É","ê","Ê","è","È","ë","Ë");
        // $name = str_replace($arr,"a",$name);
        // $arr = array("í","Í","î","Î","ì","Ì","ï","Ï");
        // $name = str_replace($arr,"a",$name);
        // $arr = array("õ","Õ","ó","Ó","ô","Ô","ò","Ò","ö","Ö");
        // $name = str_replace($arr,"a",$name);
        // $arr = array("ú","Ú","û","Û","ù","Ù","ü","Ü");
        // $name = str_replace("¹","1",$name);
        // $name = str_replace("²","2",$name);
        // $name = str_replace("³","3",$name);
        // $name = str_replace("ç","c",$name);
        // $name = str_replace("ª","a",$name);
        // $name = str_replace("º","o",$name);
        // $name = str_replace("ñ","n",$name);
        // $arr = array("$","@","#","%","&","*","+","´","`","¨","^","!","?","'",'"',"~","£","¢","¬","<",">","®","0","1","2","3","4","5","6","7","8","9");
        // $name = str_replace($arr,"",$name);
        // $name = str_replace(" ","",$name);

        // $name = $value->name;

        // if(preg_match('/--/', $value->name)){
        //     die('Invalid Name (ranking): ' . $value->name);
        // }

        $value->name = mysqli_real_escape_string($conn, $value->name); //validate

        // if(!preg_match('/(?=\^.{0,40}\$)\^[a-zA-Z]\+\s[a-zA-Z]\+\$/', $value->name)){
        //     die('Invalid Name (ranking): ' . $value->name);
        // }

        $sql = "

        CREATE TABLE IF NOT EXISTS $value->name (

        ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

        Data DATE NOT NULL,
            
        Colocacao SMALLINT NOT NULL,
            
        Pontuacao SMALLINT NOT NULL
        
        );
        
        ";
                    
        if (!mysqli_query($conn, $sql)) {
            die("Error: " . $sql . "<br>" . mysqli_error($conn));
        }



        $sql = "
        INSERT INTO $value->name (Data, Colocacao, Pontuacao)
        VALUES ('".$date."', '".$index."', ".$value->pontuacao.")
        ";
            
        if (!mysqli_query($conn, $sql)) {
            die("Error: " . $sql . "<br>" . mysqli_error($conn));
        }

        $index++;
    }

    //media

    $media = $_POST["media"];

    $sql = "

    CREATE TABLE IF NOT EXISTS medias (

    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

    Data DATE NOT NULL,

    Media DECIMAL NOT NULL

    );

    ";
            
    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }

    $sql = "
    INSERT INTO medias (Data, Media)
    VALUES ('".$date."', ".$media.")
    ";
        
    if (!mysqli_query($conn, $sql)) {
        die("Error: " . $sql . "<br>" . mysqli_error($conn));
    }
    
    // close
    mysqli_close($conn);
?>