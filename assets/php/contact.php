<html>
<head>
    <title>Meu PHP</title>
</head>
<body>
    <?php
        header("Content-type: text/html; charset=utf-8");
        error_reporting(-1);
        ini_set('display_errors', 'On');
        set_error_handler("var_dump");

        date_default_timezone_set('America/Sao_Paulo');
        
        $dest = "thiago@pessia.xyz";
        $subject = $_POST["assunto"];
        $txt = $_POST["mensagem"] . "<br><p>Enviada em: " . date('Y-m-d : H-i-s') . " </p>";
        $headers = "From: " . $_POST["email"] . "\r\n" . "Content-Type: text/html; charset=UTF-8";
    
        $status = mail($dest,$subject,$txt,$headers);

        if($status) { 
            echo '<p>Your mail has been sent!</p>';
        }
        else { 
            echo '<p>Something went wrong, Please try again!</p>'; 
        }
        
        echo "<p>" . date('Y-m-d H:i:s') . " " . $_POST["mensagem"] . " " . $_POST["assunto"] . " " . $_POST["email"] . "</p>";
    ?>
</body>
</html>