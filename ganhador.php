<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Bolão do Maurício</title>
    
    <meta charset="utf-8">
    <meta name="robots" content="noindex,nofollow">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#151515">

    <link rel="icon" type="image/png" href="assets/img/icon.png">
    
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link rel="stylesheet" href="/assets/styles/css/apresentacao.css">

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
</head>
<body>

    <header>
        <nav class="nav-extended navbar-fixed">
            <div class="nav-wrapper">
                <a href="/index.php" class="brand-logo"><i class="material-icons right hide-on-small-only"><img src="/assets/img/icon.png"></i>Bolão 2018</a>

                <a href="#" data-activates="mobileNav" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="right hide-on-med-and-down">
                    <?php if(date('m/d/Y H:i:s') < date_format(date_create('06/15/2018 00:00:00'), 'm/d/Y H:i:s') && (!isset($_GET["admin"]) || $_GET["admin"] != "thiago")) { ?>
                            
                        <li>
                            <a href="/apresentacao.php">Apresentação</a>
                        </li>

                    <?php } else { ?>

                        <li>
                            <a href="/login.php" class="login">Login</a>
                        </li>
                        <li>
                            <a href="/index.php">Ranking</a>
                        </li>                        
                        <li class="active">
                            <a href="/ganhador.php">Ganhador</a>
                        </li>

                    <?php } ?>
                    <li>
                        <a href="/contato.php">Contato</a>
                    </li>
                    <li>
                        <a href="/regulamento.php">Regulamento</a>
                    </li>
                </ul>
            </div>
        </nav>

        <ul class="side-nav" id="mobileNav">
            <?php if(date('m/d/Y H:i:s') < date_format(date_create('06/15/2018 00:00:00'), 'm/d/Y H:i:s') && (!isset($_GET["admin"]) || $_GET["admin"] != "thiago")) { ?>
                            
                <li>
                    <a href="/apresentacao.php">Apresentação</a>
                </li>

            <?php } else { ?>

                <li>
                    <a href="/login.php" class="login">Login</a>
                </li>
                <li>
                    <a href="/index.php">Ranking</a>
                </li>                
                <li class="active">
                    <a href="/ganhador.php">Ganhador</a>
                </li>

            <?php } ?>
            <li>
                <a href="/contato.php">Contato</a>
            </li>
            <li>
                <a href="/regulamento.php">Regulamento</a>
            </li>
        </ul>
    </header>

    <div id="imgHead">
        <div id="overlay"></div>
        <div id="welcome">
            <h2>9º Bolão do Maurício</h2>
            <div></div>
        </div>
    </div>

    <main class="container">
        <div class="row">
            <div class="col s12">
                <h2>Ganhador</h2>

                <p>
                    Pessoal,
                </p>

                <p>
                    Notificamos que a Cartela vencedora do 9º Bolão Copa do Mundo - Rússia foi a de número <strong>036</strong> de <strong>Vagner Trindade</strong>, com 3191 pontos.
                </p>

                <p>
                    Conforme o <a href="/regulamento.php">Regulamento</a>, o prêmio de <em>R$ 1.488,00</em> será pago em 18/07/2018.
                </p>

                <br>

                <p>
                    Muito obrigado a todos pela participação!
                </p>

                <p style="font-size: 2rem;">
                    Até 2022!!!
                </p>
                    
            </div>
        </div>
    </main>

    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Contatos</h5>
                    <p class="grey-text text-lighten-4">
                        <a href="/contato.php" class="grey-text text-lighten-4">Formulário</a>
                        <br>
                        <a href="mailto:bolaodomauricio@gmail.com" class="grey-text text-lighten-4">bolaodomauricio@gmail.com</a>
                    </p>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Notícias</h5>
                    <ul>
                        <li>
                            <a class="grey-text text-lighten-3" href="http://globoesporte.globo.com/futebol/copa-do-mundo" target="_blank">Globo Esporte</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="https://esporte.uol.com.br/futebol/copa-do-mundo/" target="_blank">UOL Esporte</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="http://www.fifa.com/worldcup/" target="_blank">FIFA</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        Aplicação Web
                        <br>
                        Bolão Copa do Mundo 2018
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <a class="grey-text text-lighten-4" href="http://www.pessia.xyz/" target="_blank">Desenvolvido por <strong>Thiago Pessia</strong></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script type="text/javascript">
        /*Mobile Nav (3/3) / Necessário para a sidebar funcionar*/
        $('.collapsible').collapsible();/*não sei se é necessário*/
        $(".button-collapse").sideNav({ closeOnClick: true });
    </script>
</body>
</html>
