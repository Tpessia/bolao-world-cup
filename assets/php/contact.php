<?php
    // header("Content-type: text/html; charset=utf-8");
    // error_reporting(-1);
    // ini_set('display_errors', 'On');
    // set_error_handler("var_dump");

    date_default_timezone_set('America/Sao_Paulo');

    mb_internal_encoding('UTF-8');
    
    $date = date('d/m/Y H:i:s');
    $dest = "bolaodomauricio@gmail.com";
    $subject = $_POST["assunto"];$e_subject = mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n", strlen('Subject: '));        
    $from = $_POST["email"];
    $name = $_POST["nome"];
    $msg = $_POST["mensagem"];

    $txt = $msg . "<br><p>" . $name . "<br>" . $date . "</p>";
    $headers = "From: " . $from . "\r\n" . "Content-Type: text/html; charset=UTF-8\r\n";

    $status = mail($dest,$e_subject,$txt,$headers);

    if($status) { 
        echo '1';
    }
    else { 
        echo '0'; 
    }
?>