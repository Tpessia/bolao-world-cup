<?php
if(isset($_FILES["fileToUpload"])) {
    $target_dir = "../assets/files/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Allow certain file formats
    if($imageFileType != "json") {
        echo "Sorry, only JSON files are allowed.";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded. You will be redirected in 3 seconds.";
            header('refresh: 3; url=novos-dados.html');
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
else {
    echo "Sorry, there was an error uploading your file.";
}
?>