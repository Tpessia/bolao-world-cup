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
    
    $sql = `
    SELECT 
    CONCAT('DELETE FROM ',TABLE_NAME,' ORDER BY ID DESC LIMIT 1;') comd
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = 'u662107342_db'
    AND COLUMN_NAME ='column1';


    

    DELIMITER $$
CREATE PROCEDURE my_proc()
BEGIN

DECLARE s_fields, s_sql varchar(1000);

SELECT 
CONCAT('DELETE FROM ',TABLE_NAME,' ORDER BY ID DESC LIMIT 1;') into s_fields
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'u662107342_db'
AND ORDINAL_POSITION = 1;

prepare stmt from s_sql;
execute stmt;
deallocate prepare stmt;

END$$
DELIMITER ;

CALL my_proc();




SET @queryString = (
SELECT 
CONCAT('DELETE FROM ',TABLE_NAME,' ORDER BY ID DESC LIMIT 1;')
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'u662107342_db'
AND ORDINAL_POSITION = 1
);

PREPARE stmt FROM @queryString;
EXECUTE stmt;
DEALLOCATE PREPARE stmt; 
    `;
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        echo "Os dados desejados foram removidos!";
    } else {
        echo "0 results";
    }
    
    // close
    mysqli_close($conn);
?>