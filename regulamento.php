<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Regulamento | Bolão do Maurício</title>

    <meta charset="utf-8">

    <meta name="robots" content="noindex,nofollow">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Bolão do Maurício">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="manifest" href="/manifest.json">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#151515">
    <meta name="description" content="Regulamento do Bolão.">

    <link rel="icon" type="image/png" href="assets/img/icon.png">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link rel="stylesheet" type="" href="assets/styles/css/min/regulamento.min.css">

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
</head>

<body>
    <header>
        <nav class="nav-extended navbar-fixed">
            <div class="nav-wrapper">
                <a href="/index.php" class="brand-logo">
                    <i class="material-icons right hide-on-small-only">
                        <img src="/assets/img/icon.png">
                    </i>Bolão 2018</a>

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

                    <?php } ?>
                    <li>
                        <a href="/contato.php">Contato</a>
                    </li>
                    <li class="active">
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

            <?php } ?>
            <li>
                <a href="/contato.php">Contato</a>
            </li>
            <li class="active">
                <a href="/regulamento.php">Regulamento</a>
            </li>
        </ul>
    </header>

    <main id="conteudo" class="container">
        <div id="regulamento">
            <h1>REGULAMENTO</h1>

            <div class="dwnld">
                <div>
                    <strong>Faça o download dos arquivos:</strong>
                </div>
                <div class="downloads">
                    <button class="btn">
                        <a href="/assets/files/Cartela - Bolão do Maurício.xlsx" download="Cartela - Bolão do Maurício.xlsx">Cartela</a>
                    </button>
                    <button class="btn">
                        <a href="/assets/files/REGBOL.docx" download="Regulamento - Bolão do Maurício.docx">Regulamento</a>
                    </button>
                </div>
            </div>

            <div class="texto-reg">
                <h3 class="main-title">9º BOLÃO COPA DO MUNDO (do Maurício) – RÚSSIA 2018</h3>

                <h4 class="title">Preenchimento da Planilha do Bolão e Sistema de Pontuação</h4>

                <p>Na planilha Excel que você baixou do site, a qual chamaremos de <strong>Cartela</strong>, encontram-se todas os jogos da Copa do Mundo da FIFA – Rússia 2018. <strong><u>Coloque seus dados como solicitado</u></strong> e seus palpites para o placar de cada uma desses jogos.</p>

                <h4 class="title">Pontuação para os jogos da Primeira Fase (Fase de Grupos)</h4>

                <p>Para os jogos desta fase, dependendo do que você acertar, serão atribuídos pontos conforme e <strong><u>somente “UM” dos critérios abaixo</u></strong> (não há critérios de pontos cumulativos):</p>

                <ol type="1">
                    <li>
                        <strong><u>Palpite idêntico ao do resultado final do jogo = 100 pontos</u></strong>
                        Ex.: Palpite: Rússia 8x5 Arábia Saudita – Resultado: Rússia 8x5 Arábia Saudita; ou,
                        <br>
                            Palpite: Portugal 6x6 Espanha – Resultado: Portugal 6x6 Espanha
                    </li>
                    <li>
                        <strong><u>Palpite acertando o vencedor e seu respectivo número de gols = 30 pontos</u></strong>
                        Ex.: Palpite: França 7x3 Austrália – Resultado: França 7x5 Austrália
                    </li>
                    <li>
                        <strong><u>Palpite que identifique o empate = 30 pontos</u></strong>
                        Ex.: Palpite: Argentina 5x5 Islândia – Resultado: Argentina 6x6 Islândia
                    </li>
                    <li>
                        <strong><u>Palpite acertando o vencedor e sua respectiva diferença de gols para o perdedor = 20 pontos</u></strong>
                        Ex.: Palpite: Sérvia 3x8 Suíça – Resultado: Sérvia 2x7 Suíça
                    </li>
                    <li>
                        <strong><u>Palpite acertando apenas o vencedor = 10 pontos</u></strong>
                        Ex.: Palpite: Alemanha 4x5 México – Resultado: Alemanha 2x7 México
                    </li>
                    <li>
                        <strong><u>Palpite acertando apenas a quantidade de gols da partida = 1 ponto</u></strong>
                        Ex.: Palpite: Bélgica 3x8 Panamá – Resultado: Bélgica 8x3 Panamá; ou,
                        <br>
                        Palpite: Polônia 2x8 Senegal – Resultado: Polônia 5x5 Senegal
                    </li>
                </ol>
                
                <h4 class="title">Pontuação para os jogos da Segunda Fase (Jogos eliminatórios “Mata-mata”)</h4>

                <p>Assim que você preencher todos os jogos da Primeira Fase, a Cartela preencherá automaticamente os confrontos das Oitavas-de-Final. Vá preenchendo com seus palpites os placares dos jogos desta fase (Oitavas, Quartas, Semifinais) que a Cartela também irá preencher os jogos subseqüentes (Disputa de 3º lugar e Final). Ressaltamos que nessa fase, caso um jogo termine empatado no tempo normal, haverá prorrogação: nesse caso, seu palpite já deverá contemplar os gols da prorrogação. Se mesmo assim você achar que o jogo terminará empatado após a prorrogação, a decisão irá para os pênaltis. Neste caso, a Cartela abrirá células para que você aponte o vencedor nos pênaltis, bastando que você coloque um número qualquer para a Seleção vencedora que deverá ser maior do que o da perdedora. De qualquer forma, não serão atribuídos pontos para os placares das decisões de pênaltis, uma vez que o preenchimento dessas células (dos pênaltis) destina-se apenas a apontar a Seleção que vencerá o confronto.</p>

                <p>Para a Segunda Fase haverá um sistema de Pontuação diferente, como segue:</p>
                <p>
                    <ul class="dashed">
                        <li>
                            <strong><u>Para cada Seleção acertada que passou para as Oitavas-de-Final = 50 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Para cada Seleção que, além de passar para as Oitavas-de-Final, você acertou a colocação dentro do grupo = 25 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Para cada Seleção acertada que passou para as Quartas-de-Final = 100 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Para cada Seleção acertada que passou para as Semifinais = 150 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Acertando a Seleção que ficará na 4ª colocação = 200 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Acertando a Seleção que ficará na 3ª colocação = 250 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Acertando a Seleção Vice-campeã = 300 pontos;</u></strong>
                        </li>
                        <li>
                            <strong><u>Acertando a Seleção Campeã = 500 pontos.</u></strong>
                        </li>
                    </ul>
                </p>
                <p>A pontuação da Primeira Fase continuará valendo para a Segunda Fase, desde que o jogo em questão esteja exatamente como na Tabela Oficial. (Ex.: o 1º colocado do Grupo C irá enfrentar nas Oitavas-de-Final o 2º colocado do Grupo D. Nos seus palpites, a Austrália ficou em 1º lugar no Grupo C e a Islândia ficou em 2º lugar do Grupo D. Assim, na sua Cartela, o jogo de número 50 será Austrália x Islândia. Se na Tabela Oficial o jogo 50 for o mesmo que nos seus palpites (Austrália x Islândia), você estará concorrendo à pontuação de acordo com os placares dos jogos). O mesmo critério se aplica aos demais jogos (Quartas-de-Final em diante), desde que as Seleções e a ordem delas estejam iguais à Tabela oficial. No entanto, se num determinado jogo a ordem das suas Seleções estiver invertida - Ex.: no jogo 57 das Quartas-de-Final os seus palpites apontaram Egito x Peru, mas na Tabela Oficial o jogo é Peru x Egito – nesse caso você não poderá pontuar para os acertos no placar. Eventualmente, o site da FIFA poderá inverter a ordem das Seleções num determinado jogo, porém a que irá prevalecer para a contagem de pontos é a do Regulamento Oficial da Copa do Mundo FIFA - Rússia 2018 (vide em <a href="https://resources.fifa.com/image/upload/2018-fifa-world-cup-russiatm-regulations-2843519.pdf?cloudid=ejmfg94ac7hypl9zmsys" target="_blank">https://resources.fifa.com/image/upload/2018-fifa-world-cup-russiatm-regulations-2843519.pdf?cloudid=ejmfg94ac7hypl9zmsys</a>, páginas 43, 44 e 45, em inglês), que é a mesma representada na Cartela do Bolão.</p>

                <p>Será considerada vencedora do Bolão a Cartela do Participante que obtiver o maior número de pontos. Havendo empate entre duas ou mais Cartelas, os critérios de desempate serão:</p>

                <ol class="nth">
                    <li>Cartela que acertou a Seleção Campeã;</li>
                    <li>Maior quantidade de “palpites” equivalentes a 100 pontos;</li>
                    <li>Maior quantidade de pontos computados nos jogos do BRASIL (somente os placares);</li>
                    <li>Divisão do prêmio.</li>
                </ol>

                <h4 class="title">Valor, Prêmio, Prazos e Considerações Finais</h4>

                <p>O Valor para participação será de R$. 20,00 (Vinte reais) para cada Cartela apostada.</p>
                <p>Após o preenchimento da Cartela devidamente preenchida, envie a mesma para o e-mail: <a href="mailto:bolaodomauricio@gmail.com">bolaodomauricio@gmail.com</a>, <strong><u>juntamente com o comprovante de pagamento</u></strong>, que poderá ser feito através de TED ou DOC para:</p>

                <ul class="dashed">
                    <li><u>ITAÚ UNIBANCO (Nº 341), AGÊNCIA Nº 8317, CONTA CORRENTE Nº 12279-7 ou,</u></li>
                    <li><u>BANCO BRADESCO (Nº 237), AGÊNCIA Nº 1628, CONTA CORRENTE Nº 45654-3</u></li>
                </ul>

                <p><strong>Em nome de <u>GUILHERME CAMPOS DA SILVA, CPF.: 441.914.278/22</u>.</strong></p>

                <p><strong><u>Cada Cartela é destinada a apenas um Participante</u></strong> (não serão aceitas Cartelas com dois ou mais nomes), porém um mesmo Participante poderá concorrer com quantas Cartelas desejar.</p>

                <p>O Prêmio será de 80% (Oitenta por cento) do total arrecadado. Entenda-se como total arrecadado como o número de Cartelas vezes R$. 20,00. Ex.: se 100 cartelas estiverem em disputa, o prêmio será de R$. 1.600,00 (Mil e Seiscentos Reais, 80% de R$. 2.000,00 = 100 cartelas x R$. 20,00).</p>

                <p><strong>A Cartela, bem como o comprovante de pagamento, deverão ser enviados <u>até dia 12 de junho de 2018</u>, quinta-feira, (dois dias antes do início da Copa do Mundo de 2018) para o e-mail: <a href="mailto:bolaodomauricio@gmail.com">bolaodomauricio@gmail.com</a>.</strong> Após recebimento da Cartela, enviaremos resposta ao Participante acusando a recepção e informando o número da mesma. Com o número da Cartela e o pagamento identificado, o Participante estará concorrendo ao Prêmio.</p>

                <p>Os Organizadores, (Maurício Vasco da Silva, Guilherme Campos da Silva e Thiago Vinícius Pessia poderão participar do Bolão, mas estarão concorrendo apenas a metade (50%) do Prêmio. O participante posteriormente colocado após um ou mais Organizador(es) receberá a metade restante.</p>

                <p>As eventuais Cartelas dos Organizadores bem como seus parentes e pessoas diretas (filhos, pais, namoradas), estarão concorrendo ao Prêmio e ficarão à disposição para verificação por qualquer outro Participante, desde que este as solicite por e-mail.</p>

                <p>O pagamento do Prêmio será efetuado no dia 18 de Julho de 2018, quarta-feira, após a conferência pelos Organizadores de todas as Cartelas, via TED para crédito em conta a ser informada pelo Vencedor e mediante Recibo.</p>

                <p>A confirmação do número da Cartela após recebimento da mesma e do pagamento condicionará o Participante a aceitar todas as regras aqui descritas. Os Organizadores não aceitarão reclamações posteriores.</p>

                <p>Em caso de dúvidas, envie e-mail para <a href="mailto:bolaodomauricio@gmail.com">bolaodomauricio@gmail.com</a> com seu número de telefone, que, dentro das possibilidades, um dos Organizadores entrará em contato com você.</p>

                <p>Muito obrigado e Boa Sorte!</p>
                
                <p style="text-align: center">
                    MAURÍCIO VASCO DA SILVA<br>
                    GUILHERME CAMPOS DA SILVA<br>
                    THIAGO VINÍCIUS PESSIA<br>
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
                        <br> Bolão Copa do Mundo 2018
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <a class="grey-text text-lighten-4" href="http://www.pessia.xyz/" target="_blank">Desenvolvido por
                            <strong>Thiago Pessia</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script type="text/javascript">
        $('.collapsible').collapsible();
        $(".button-collapse").sideNav();
        $(document).ready(function () {
            $('.modal').modal();
        });
    </script>
</body>
</html>