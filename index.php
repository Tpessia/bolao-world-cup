<?php
    date_default_timezone_set('America/Sao_Paulo');

    if(date('m/d/Y H:i:s') < date_format(date_create('06/15/2018 00:00:00'), 'm/d/Y H:i:s') && (!isset($_GET["admin"]) || $_GET["admin"] != "thiago")) {
        header('Location: '.'/apresentacao.php');
    }
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <script>
        if (localStorage.getItem("user") === null) {
            window.location.replace('/ganhador.php');
        }
    </script>

    <title>Bolão do Maurício</title>
    
    <meta charset="utf-8">
    <meta name="robots" content="noindex,nofollow">
    
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Bolão do Maurício">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="manifest" href="/manifest.json">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#151515">
    <meta name="description" content="9º Bolão Copa do Mundo (do Maurício). Participe do Bolão da Copa do Mundo de 2018!">

    <link rel="icon" type="image/png" href="assets/img/icon.png">
    
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link rel="stylesheet" href="assets/styles/css/min/home.min.css">

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/offline-js/0.7.19/offline.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.2.0/fuse.min.js"></script> -->
    <script src="assets/js/home.js"></script>

    <script>
        user = JSON.parse(localStorage.getItem("user"));

        var userNome = JSON.parse(localStorage.getItem("user")).nome.split(' ').filter(function (e,i,a) {
            return i == 0 || i == a.length - 1;
        }).join(' ');

        (function (p, u, s, h, x) { p.pushpad = p.pushpad || function () { (p.pushpad.q = p.pushpad.q || []).push(arguments) }; h = u.getElementsByTagName('head')[0]; x = u.createElement('script'); x.async = 1; x.src = s; h.appendChild(x); })(window, document, 'https://pushpad.xyz/pushpad.js');

        //(user.name + ' ' + user.page.toString()).replace(/ /gi, '_').replace(/\W/g, '').replace(/[^\x00-\x7F]/g, "")
        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.setHMACKey("c223935a7b4863008aab7455ea0048c5", "TEXT");
        shaObj.update(userNome);
        var hmac = shaObj.getHMAC("HEX");

        // pushpad('init', 5053);
        // pushpad('unsubscribe');
        // pushpad('subscribe', function() {}, {uid: user.name, uidSignature: hmac});
        // pushpad('uid', user.name, hmac);
        // for (var time = 0; time <= 5000; time = time + 1000) {
        //     setTimeout(() => {
        //         pushpad('subscribe', function () { }, { tags: [(user.name + ' ' + user.page.toString()).replace(/ /gi, '_').replace(/\W/g, '').replace(/[^\x00-\x7F]/g, "")] });
        //     }, time);
        // }
    </script>
</head>
<body class="loading">
    <div id="loading">
        <span id="ball">
            <img src="assets/img/loading-ball.gif">
        </span>
    </div>

    <a id="push-sub" class="btn-floating btn-large waves-effect waves-light colorB">
        <i class="material-icons">notifications_active</i>
    </a>

    <header>
        <nav class="nav-extended navbar-fixed">
            <div class="nav-wrapper">
                <a href="/index.php" class="brand-logo"><i class="material-icons right hide-on-small-only"><img src="/assets/img/icon.png"></i>Bolão 2018</a>

                <a href="#" data-activates="mobileNav" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <ul class="right hide-on-med-and-down">
                    <li>
                        <a href="/login.php" class="login">Login</a>
                    </li>
                    <li class="active">
                        <a href="/index.php">Ranking</a>
                    </li>
                    <li>
                        <a href="/ganhador.php">Ganhador</a>
                    </li>
                    <li>
                        <a href="/contato.php">Contato</a>
                    </li>
                    <li>
                        <a href="/regulamento.php">Regulamento</a>
                    </li>
                </ul>

            </div>

            <!-- <div class="nav-content" style="border-top: 3px solid rgba(0,0,0,0.1)">
                <form onsubmit="return false">
                    <div class="input-field">
                        <input type="search" id="searchVal" class="autocomplete" placeholder="Pesquisar Nome" required autocomplete="off" style="margin: 0; padding-left: 3.5em;" name="nome">
                        <i class="material-icons">search</i>
                        <i class="material-icons" style="top: -15%;">close</i>
                    </div>
                </form>
            </div> -->
        </nav>

        <ul class="side-nav" id="mobileNav">
            <!--Mobile Nav(2/3)-->
            <li>
                <a href="/login.php" class="login">Login</a>
            </li>
            <li class="active">
                <a href="/index.php">Ranking</a>
            </li>
            <li>
                <a href="/ganhador.php">Ganhador</a>
            </li>
            <li>
                <a href="/contato.php">Contato</a>
            </li>
            <li>
                <a href="/regulamento.php">Regulamento</a>
            </li>
        </ul>
    </header>

    <div id="imgHead">
        <span id="download-app">
            <a class="btn-floating waves-effect waves-light modal-trigger" href="#modal-download"><i class="material-icons">file_download</i></a>
        </span>
        <div id="overlay"></div>
        <div id="welcome">
            <h2>Bem Vindo(a), verifique seus dados!</h2>
            <div></div>
        </div>
        <div class="arrow-pulse-down"></div>
    </div>

    <main class="container">
        <div id="rank" class="row">
            
            <h1>RANKING</h1>

            <div id="rankList" class="col l9 s12">
                
                <div id="rankContent" class="row">
                         
                </div>
                
                <a id="moreRank" class="rankBtn waves-effect waves-light btn col s5"><i class="material-icons right">playlist_add</i>Ver Mais</a>
                
                <a id="refresh" class="rankBtn waves-effect waves-light btn col s5 offset-s1"><i class="material-icons">autorenew</i><span class="hide-on-small-only">Atualizar</span></a>

            </div>
            
            <div id="first" class="col l3 hide-on-med-and-down">

                <h3 style="text-align: center;">PRIMEIRO COLOCADO</h3>
                
                <div id="firstContent">
                    <h3></h3>
                    <h4></h4>
                </div>

            </div>
            
        </div>

        <div class="row" id="chart">
            <h1>DADOS</h1>
            <div class="col s12 l10">
                <h2>Minha Pontuaçao</h2>
                <p>Sua pontuação ao passar do tempo, comparada com a pontuação média dos jogadores.</p>
                <br>

                <div class="chartLoading">
                    <div>
                        <strong>Carregando...</strong>
                    </div>
                </div>
                
                <div class="blockMobile show">
                    <div>
                        <i class="material-icons">screen_rotation</i>
                        <p>Vire a tela para ver o gráfico!</p>
                        <button class="btn">Ver mesmo assim</button>
                    </div>
                </div>

                <canvas id="myChart1"></canvas>
            </div>

            <div class="col s12 l10">
                <h2>Minha Colocação</h2>
                <p>Sua colocação ao passar do tempo!</p>
                <br>

                <div class="chartLoading">
                    <div>
                        <strong>Carregando...</strong>
                    </div>
                </div>
                
                <div class="blockMobile show">
                    <div>
                        <i class="material-icons">screen_rotation</i>
                        <p>Vire a tela para ver o gráfico!</p>
                        <button class="btn">Ver mesmo assim</button>
                    </div>
                </div>

                <canvas id="myChart2"></canvas>
            </div>

            <div class="col s12 l10" style="display: none;">
                <h2>Primeiros Colocados</h2>
                <p>Jogadores que ficaram por maior tempo na primeira posição do ranking.</p>
                <br>

                <div class="chartLoading">
                    <div>
                        <strong>Carregando...</strong>
                    </div>
                </div>
                
                <div class="blockMobile show">
                    <div>
                        <i class="material-icons">screen_rotation</i>
                        <p>Vire a tela para ver o gráfico!</p>
                        <button class="btn">Ver mesmo assim</button>
                    </div>
                </div>

                <canvas id="myChart3"></canvas>
            </div>
        </div>
    </main>

    <!-- <aside>
        <div id="sideRank" class="hideSide hide-on-med-and-down">
            <div class="row">
                    <h2>Top 5</h2>
            </div>
        </div>
    </aside> -->

    <section>
        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4></h4>
                <div id="wrapper" class="row">
                    <div id="sidePont" class="col s3 offset-s1">
                        <h5>Pontuação</h5>
                        <div id="sideGames"></div>
                    </div>
                    <div id="playerStats" class="col s12 l9">
                        <div id="primeiro">
                            <strong>Vezes na primeira colocação: <span id="primeiroX"></span></strong>
                        </div>
                        <div id="jogos"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect btn-flat ">Fechar</a>
            </div>
        </div>
    </section>

    <section>
        <div id="modal2" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>ERRO</h4>
                <p>
                    
                </p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect btn-flat ">Fechar</a>
            </div>
        </div>
    </section>

    <section>
        <div id="modal-download" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>BAIXE O APP</h4>
                <p>
                    Caso o banner de download não apareça automaticamente, siga os seguintes passo:
                </p>
                <p>
                    <strong>Google Chrome:</strong> Clique no botão de configurações <i class="material-icons" style="vertical-align: text-bottom;">more_vert</i>, na parte superior direita da tela, e, em seguida, selecione a opção "Adicionar à tela inicial". Caso tenha dúvidas, <a href="http://www.techtudo.com.br/dicas-e-tutoriais/noticia/2015/12/chrome-adicione-um-atalho-para-site-na-area-de-trabalho-do-android.html" target="_blank">siga estes passos</a>.
                </p>
                <p>
                    <strong>Safari (iPhone):</strong> Clique no botão de compartilhamento <img src="\assets\img\safari-share.png" alt="Share" style="width: 25px;vertical-align: text-bottom;">, na parte inferior da tela, e, em seguida, selecione a opção "Tela de Início". Caso tenha dúvidas, <a href="http://www.techtudo.com.br/dicas-e-tutoriais/noticia/2011/06/como-adicionar-um-atalho-para-um-site-na-tela-de-inicio-do-iphone.html" target="_blank">siga estes passo</a>.
                </p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect btn-flat">Fechar</a>
            </div>
        </div>
    </section>

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
        $(document).ready(function () {
                // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
                $('.modal').modal();
            });
    </script>

    <script>
        pushpad('init', 5606);

        // optionally call 'uid' if the user is logged in to your website
        pushpad('uid', userNome, hmac);

        var pushInit = false;

        $(function () {
            var updateButton = function (isSubscribed) {
                var btn = $('#push-sub');
                var btnI = $('#push-sub i');
                btn.removeClass("processing");
                if (isSubscribed) {
                    btnI.html('notifications_off');
                    btn.addClass('subscribed');
                    if (pushInit) Materialize.toast('Notificações ativadas!', 3000);
                } else {
                    btnI.html('notifications_active');
                    btn.removeClass('subscribed');
                    if (pushInit) Materialize.toast('Notificações desativadas!', 3000);
                }
                pushInit = true;
            };
            // check whether the user is subscribed to the push notifications and
            // initialize the button status (e.g. display Subscribe or Unsubscribe)
            pushpad('status', updateButton);

            // when the user clicks the button...
            $('#push-sub').on('click', function (e) {
                e.preventDefault();
                
                $(this).addClass("processing");

                // if he wants to unsubscribe
                if ($(this).hasClass('subscribed')) {
                    pushpad('unsubscribe', function () {
                        updateButton(false);
                    });

                    // if he wants to subscribe
                } else {
                    // try to subscribe the user to push notifications
                    pushpad('subscribe', function (isSubscribed) {
                        if (isSubscribed) {
                            // success
                            updateButton(true);
                        } else {
                            // oops... the user has denied permission from the browser prompt
                            updateButton(false);

                            var msg = 'Você bloqueou as notificações do seu navegador! Para poder utilizar esta função, reative-as.';
                            if(typeof showError !== "undefined") { showError(msg); }
                            else { alert(msg); }
                        }
                    });
                }
            });

            pushpad('unsupported', function () {
                $('#push-sub').prop('disabled', true);

                var msg = "Seu navegador não suporta a função de notificações! Você pode tentar usar o Google Chrome ou o Mozilla Firefox para ativa-las.";
                if(typeof showError !== "undefined") { showError(msg); }
                else { alert(msg); }
            });
        });
    </script>

    <script> //SERVICE WORKER PWA
        if ('serviceWorker' in navigator) {
            console.log('CLIENT: service worker registration in progress.');
            navigator.serviceWorker.register('/service-worker.js').then(function() {
                console.log('CLIENT: service worker registration complete.');
            }, function() {
                console.log('CLIENT: service worker registration failure.');
            });
            } else {
            console.log('CLIENT: service worker is not supported.');
        }
    </script>
</body>
</html>
