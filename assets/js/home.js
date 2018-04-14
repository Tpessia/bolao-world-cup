//NETWORK CONTROLLER

$(function () { //document ready

    //Inicia como Offline ou Online

    if (navigator.onLine) {
        OnlineGet('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0'); //Recebe o JSON do Google Sheets, e o transforma no objeto table.pageN.rows, além de chamar as funções que criam os objetos/arrays ranking (guarda os nomes e as pontuações em ordem decrescente), players (guarda o nome dos jogadores e a página em que estão no Google Sheets - referência para o search - ) e a winner div
    } else {
        OfflineGet();
        Network.unbind();
    }

    //offline/online events

    Offline.on("down", function () {
        Network.unbind();
    });
    Offline.on("up", function () {
        Network.bind();
        OnlineGet('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0');
    });
});

//DEBUG ALERT

// window.onerror = function (msg, url, linenumber) {
//     alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
//     return true;
// }

//SAFARI BUG

if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () { };
        alert('O seu navegador não suporta o armazenamento local de informações. No Safari, a causa mais comum é usar "Modo de Navegação Privada". Tente entrar novamente com outro navegador ou entre em contato caso o problema persista.');
        $("body").html("");
        window.stop();
        throw new Error("Aplicação parada devido à falta de recursos essenciais!");
    }
}

//LOADING ANIMATION

var loading = {
    remove: function() {
        if (typeof logged != "undefined") {
            setTimeout(function () {
                $("body").removeClass("loading");
            }, 500);
        } else {
            setTimeout(function() {
                loading.remove();
            }, 500);
        }
    },
    soft: {
        start: function() {
            $("body").addClass("loading opacity");
        },
        stop: function() {
            $("body").removeClass("loading opacity");
        }
    }
}

window.onload = function () { //window load
    loading.remove();
};

//NETWORK EVENTS

var Network = {
    bind: function() {
        $("a.login, #refresh, #rankList .verMais, #sideRank .card-action, .input-field input[type=search]~i:first-of-type, #push-sub").css({
            "opacity": "1",
            "cursor": "pointer",
            "pointer-events": "auto"
        }); //event: when online, allow all online content
        $("#searchVal").prop('disabled', false);
    },
    unbind: function() {
        $("a.login, #refresh, #rankList .verMais, #sideRank .card-action, .input-field input[type=search]~i:first-of-type, #push-sub").css({
            "opacity": "0.5",
            "cursor": "default",
            "pointer-events": "none"
        }); //blocks all online content
        $("#searchVal").prop('disabled', true);
    }
}

//LOGIN

function Login() {
    //auto log in

    if (localStorage.getItem("user") !== null) { //usuário já salvo no local storage
        $("body").removeClass("login");
        user = JSON.parse(localStorage.getItem("user")); //receive user data from local storage
        UserPosition();

        Welcome();
        Highlight();

        logged = true;
    }

    function UserPosition() { //current user position
        for (var i in ranking) {
            if (ranking[i].name.match(user.name)) {
                user.currentPosition = parseInt(i) + 1;
                break;
            }
        }
    }

    function Welcome() { //welcome name update
        $("#welcome h2").html($("#welcome h2").html().replace(/,.*/, ", " + user.name.split(" ")[0] + "!"));

        $("#welcome div").html("Você é o " + user.currentPosition + "º dentre " + ranking.length + " pessoas.");
    }

    function Highlight() { //current user highlight on ranking
        $('#rankContent div.col .col-wrapper.colorA').removeClass("colorA");
        $('#sideRank .col .card.highlight').removeClass("highlight");

        $('#rankContent div.col:nth-of-type(' + user.currentPosition + ') .col-wrapper').addClass("colorA");
        $('#sideRank .col:nth-of-type(' + user.currentPosition + ') .card').addClass("highlight");
    }
}

//DATA PARSING

function OnlineGet(pages, ID) { //request spreadsheet page data
    id = ID; //cria id global
    pages = pages.split(',');

    pages.forEach(function (page, index) {

        var urlJSON = 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + page + '/public/values?alt=json&_=' + new Date().getTime();

        if (typeof onlineGetAjax !== "undefined" && onlineGetAjax.readyState !== 4 && onlineGetAjax.readyState !== 0) {
            onlineGetAjax.abort();
        }

        onlineGetAjax = $.ajax({ //verifica se a url existe
            url: urlJSON,
            dataType: 'html',
            // async: false,
            // timeout: 5000,
            success: function (json) {
                data = JSON.parse(json).feed.entry //recebe a data como json

                page = "page" + page; //cria a pageN

                TableCreate(page, false); //gera array (table.pageN.rowM[cell1,cell2,cell3])
                RankingArray();
                RankCreate();
                PlayersArray();
                BindEvents();
                charts.charts1.create(); //create charts
                charts.charts2.create();
                charts.charts3.create();

                Login(); //manages the login "page" or automatically logs in

                $(".chartLoading").addClass("active");

                //se online, verifica os dados no DB
                if (typeof user !== "undefined") {
                    GetChartData();
                }

                GetMedias(); //recebe a média de pontuação (DB)

                GetPrimeiros();
            },
            error: function (xhr, status, error) {
                if (status != "abort") {
                    OnlineGet(pages.join(","), id);
                }
            }
        });
    })
}

function OfflineGet() {
    OfflineParse(); //receive user and ranking
    RankCreate(); //create DOM based on ranking

    Login(); //manages the login "page" or automatically logs in

    BindEvents();

    charts.charts1.create(); //create charts
    charts.charts2.create();
    charts.charts3.create();

    // ResizeChartArrays(20);

    charts.charts1.change(0, media.mediaArr, media.dateArr);
    charts.charts1.change(1, user.pontuacao, user.date);
    charts.charts2.change(0, user.colocacao, user.date);
    charts.charts3.change(0, primeirosTop.ocorrencias, primeirosTop.nome);

    loading.remove();
}

//online

function GetChartData() {
    if (typeof getChartAjax !== "undefined" && getChartAjax.readyState !== 4 && getChartAjax.readyState !== 0) {
        getChartAjax.abort();
    }

    getChartAjax = $.ajax({
        url: "assets/php/ranking-select.php?username=" + ValidadeDbInput(user.name) + "_" + user.page + '&_=' + new Date().getTime(),
        type: "GET",
        success: function (dataDB) {
            try {
                var chartData = evalSecure(dataDB);
            } catch (error) {
                var msg = 'Encontramos alguns problemas ao procurar seu cadastro no banco de dados, caso o problema persista, entre em contato conosco na seguinte página: <a href="/contato.html">www.bolaodomauricio.xyz/contato.html</a>';
                var error = 'UnableToFindUser';
                parseError(msg, error);
            }

            user.date = [];
            user.pontuacao = [];
            user.colocacao = [];

            for (i in chartData) {
                var date = new Date(chartData[i].date + 'T00:00-03:00'); //weakest link
                user.date.push(FormatarData(date));
                user.pontuacao.push(chartData[i].pontuacao);
                user.colocacao.push(chartData[i].colocacao);
            }

            // ResizeChartArrays(20);

            charts.charts1.change(1, user.pontuacao, user.date);

            charts.charts2.change(0, user.colocacao, user.date);

            PrepareOffline();

            $(".chartLoading").removeClass("active");
            $("a.login").css({
                "opacity": "1",
                "cursor": "pointer",
                "pointer-events": "auto"
            }); //prevent new logins while ajax is running
        },
        error: function () {
            GetChartData();
        }
    });
}

function GetMedias() {
    if (typeof getMediaAjax !== "undefined" && getMediaAjax.readyState !== 4 && getMediaAjax.readyState !== 0) {
        getMediaAjax.abort();
    }

    getMediaAjax = $.ajax({
        url: "assets/php/media-select.php?_=" + new Date().getTime(),
        type: "GET",
        success: function (data) {
            try {
                var medias = evalSecure(data);
            } catch (error) {
                // var msg = 'Encontramos alguns problemas ao procurar pela pontuação média dos usuários, caso o problema persista, entre em contato conosco na seguinte página: <a href="/contato.html">www.bolaodomauricio.xyz/contato.html</a>';
                // var error = 'UnableToFindMedias';
                // parseError(msg, error);
            }

            media = { mediaArr: [], dateArr: [] };

            for (i in medias) {
                media.mediaArr.push(medias[i].media);
                var date = new Date(medias[i].date + 'T00:00-03:00'); //weakest link
                media.dateArr.push(FormatarData(date));
            }

            // ResizeChartArrays(20);

            charts.charts1.change(0, media.mediaArr, media.dateArr);

            localStorage.setItem("media", JSON.stringify(media));
        },
        error: function () {
            GetMedias();
        }
    });
}

function GetPrimeiros() {
    if (typeof getPrimeirosAjax !== "undefined" && getPrimeirosAjax.readyState !== 4 && getPrimeirosAjax.readyState !== 0) {
        getPrimeirosAjax.abort();
    }

    getPrimeirosAjax = $.ajax({
        url: "assets/php/primeiros-select.php?_=" + new Date().getTime(),
        type: "GET",
        success: function (data) {
            try {
                var primeirosData = evalSecure(data);
            } catch (error) {
                // var msg = 'Encontramos alguns problemas ao procurar seu cadastro no banco de dados, caso o problema persista, entre em contato conosco na seguinte página: <a href="/contato.html">www.bolaodomauricio.xyz/contato.html</a>';
                // var error = 'UnableToFindUser';
                // parseError(msg, error);
            }

            primeiros = { nome: [], ocorrencias: [] };

            for (var p in primeirosData) {
                primeiros.nome.push(primeirosData[p].nome);
                primeiros.ocorrencias.push(primeirosData[p].ocorrencia);
            }

            // ResizeChartArrays(20);

            primeirosTop = { nome: [], ocorrencias: [] };
            for (var i in primeiros.nome) {
                if (i < 3) {
                    primeirosTop.nome.push(primeiros.nome[i]);
                    primeirosTop.ocorrencias.push(primeiros.ocorrencias[i]);
                }
                else {
                    break;
                }
            }

            charts.charts3.change(0, primeirosTop.ocorrencias, primeirosTop.nome);

            chart3.options.scales.yAxes[0].ticks.suggestedMax = primeiros.ocorrencias[0] + 1;

            localStorage.setItem("primeiros", JSON.stringify(primeiros));
            localStorage.setItem("primeirosTop", JSON.stringify(primeirosTop));
        },
        error: function () {
            GetPrimeiros();
        }
    });
}

function evalSecure(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

function parseError(msg,error) {
    showError(msg);

    $(".chartLoading").removeClass("active");
    $("a.login").css({
        "opacity": "1",
        "cursor": "pointer",
        "pointer-events": "auto"
    });

    throw error;
}

function ValidadeDbInput(str) { //antigo lower()
    var lower = str.toLowerCase();
    var upper = str.toUpperCase();

    var res = "";
    for (var i = 0; i < lower.length; ++i) {
        if (lower[i] != upper[i] || lower[i].trim() === '')
            res += str[i];
    }

    return res /*.replace(/ã|Ã|á|Á|â|Â|à|À|ä|Ä/g, "a").replace(/é|É|ê|Ê|è|È|ë|Ë/g, "e").replace(/í|Í|î|Î|ì|Ì|ï|Ï/g, "i").replace(/õ|Õ|ó|Ó|ô|Ô|ò|Ò|ö|Ö/g, "o").replace(/ú|Ú|û|Û|ù|Ù|ü|Ü/g, "u").replace(/ñ/g, "n")*/.replace(/¹/g, "1").replace(/²/g, "2").replace(/³/g, "3").replace(/ç/g, "c").replace(/ª/g, "a").replace(/°|º/g, "o").replace(/^-|-$|@+|#+|\$+|%+|&+|\*+|\++|´+|`+|¨+|\^+|!+|\?+|'+|"+|~+|£+|¢+|¬+|<+|>+|®+/g, "").replace(/0-9/g, "").replace(/ /g, "_");
}

function FormatarData(data) {
    var dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    var mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    return dia + "/" + mes;
}

//offline

function PrepareOffline() {
    if (navigator.onLine) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }
}

function OfflineParse() { //recebe as informações de 'user' e 'ranking' do localStorage, para serem usadas no gráfico e no ranking
    user = JSON.parse(localStorage.getItem("user"));
    ranking = JSON.parse(localStorage.getItem("ranking"));
    media = JSON.parse(localStorage.getItem("media"));
    primeiros = JSON.parse(localStorage.getItem("primeiros"));
    primeirosTop = JSON.parse(localStorage.getItem("primeirosTop"));
}

//RANK LOGIC

function RankCreate() { //create ranking element and object
    var viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // viewport > 600 ? k = 9 : 
    k = 4; //numero de itens do rank mostrados por vez

    $("#rankContent").html("");
    $("#moreRank").removeClass("hide");
    $("#sideRank .row").html("<h2>Top 5</h2>");

    for (i in ranking) { //só mostra na div (remover no projeto oficial)
        if (i == 0) {
            rankBlock = '<div class="col s12">'; //maior se for o primeiro
            btn = 'btn-large';
        } else {
            rankBlock = '<div class="col s11">'; //2nd,3rd,4th...
            btn = 'btn';
        }

        sideRank = rankBlock;

        rankBlock =
            rankBlock + `
                <div class="col-wrapper">
                    <div class="nome">` + (parseInt(i) + 1) + ". " + ranking[i].name + `</div>
                    <div class="pontuacao">` + ranking[i].pontuacao + " pts" + `</div>
                    <div class="verMais"><a class="rankElem hide-on-med-and-down">VER DADOS</a><a class="btn-floating ` + btn + ` waves-effect waves-light hide-on-large-only colorB"><i class="material-icons">search</i></a></div>
                </div>
            </div>
        `;

        $("#rankContent").html($("#rankContent").html() + rankBlock); //append main rank block

        if (i > k) {
            $($("#rankContent>.col")[i]).addClass("hide");
        } //hide players that are not at the top "k+1"

        if (i < 5) { //create side rank
            sideRank += '<div class="card"><div class="card-content white-text row"><span class="card-title col s8 nome">' + (parseInt(i) + 1) + ". " + ranking[i].name + '</span><span class="card-action col s3 verMais"><a class="btn-floating btn waves-effect waves-light"><i class="material-icons">search</i></a></span></div></div></div>';

            $("#sideRank>.row").append(sideRank);
            $("#sideRank>.row>.col:gt(4)").remove();
        }
    }

    //winner div
    // function smallSurname(fullName) {
    //     return fullName.split(" ")[0] + " " + (fullName.split(" ").pop().length <= 10 ? fullName.split(" ").pop() : fullName.split(" ").pop()[0] + ".")
    // }
    $("#firstContent h3").html(ranking[0].name);
    $("#firstContent h4").html(ranking[0].pontuacao + 'pts');
}

function TableCreate(sheetPage) { //create an array based on the spreadsheet page
    if (typeof table == "undefined") {
        table = {};
    }

    table[sheetPage] = {};

    var lastRow = 0;

    for (var i = 0; i < data.length; i++) {
        var dataTemp = data[i];

        if (!table[sheetPage]["row" + dataTemp.gs$cell.row]) {
            table[sheetPage]["row" + dataTemp.gs$cell.row] = [];
        } //create table.rowN

        if (lastRow != dataTemp.gs$cell.row) {
            lastCol = 0;
        } //new row

        table[sheetPage]["row" + dataTemp.gs$cell.row].push(dataTemp.gs$cell.$t); //add value

        lastCol = dataTemp.gs$cell.col;
        lastRow = dataTemp.gs$cell.row;
    }
}

function RankingArray() {
    ranking = []; //array ranking (ranking[i].name; ranking[i].pontuacao)

    j = 0;
    for (i in table.page1) { //cria array do ranking
        if (j > 1) {
            ranking.push({
                name: table.page1[i][1], //sheet format (Participante)
                pontuacao: table.page1[i][2] //sheet format (Pontuação)
            });
        }
        j++;
    }
}

function PlayersArray() {
    players = [];

    j = 0;
    for (i in table.page1) {
        if (j > 1) {
            pageVar = table.page1[i][3]; //sheet format (Página)
            nameVar = table.page1[i][4]; //sheet format (Nome)
            codigoVar = table.page1[i][6]; //sheet format (Nome)
            players.push({
                page: pageVar,
                name: nameVar,
                code: codigoVar
            });
        }
        j++;
    }
}

//CHART LOGIC

var charts = {
    charts1: {
        create: function () {
            ctx1 = document.getElementById('myChart1').getContext('2d');
            chart1 = new Chart(ctx1, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: [
                        // "01/Jan", "15/Jan", "01/Fev", "15/Fev", "01/Mar", "15/Mar", "01/Abr", "15/Abr", "01/Mai", "15/Mai", "01/Jun", "15/Jun"
                    ],
                    datasets: [{
                            label: "Pontuação Média",
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderColor: 'rgb(0,0,0)',
                            // data: [0, 25, 40, 50, 90, 100, 125, 145, 180, 180, 200, 230],
                        },

                        {
                            label: "Minha Pontuação",
                            backgroundColor: 'rgba(255, 171, 64, 0.7)',
                            borderColor: 'rgb(255, 171, 64)',
                            // data: [0, 10, 15, 20, 20, 30, 50, 100, 125, 125, 200, 230]
                        }
                    ]
                },

                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Pontuação'
                            }
                        }]
                    }
                }
            });
        },

        change: function (datasetIndex, dataArr, labelsArr) {
            chart1.data.datasets[datasetIndex].data = dataArr;
            chart1.data.labels = labelsArr;
            //chart animation
            if (typeof scrollChart[1] === "undefined") {
                for (var i in chart1.data.datasets) {
                    chart1.data.datasets[i].hidden = true;
                }
                scrollFireCharts("#myChart1", function () {
                    for (var i in chart1.data.datasets) {
                        chart1.data.datasets[i].hidden = false;
                    }
                    chart1.update();
                }, 1);
            } else {
                chart1.update();
            }
            //*chart animation
            // chart1.update();
        }
    },
    charts2: {
        create: function () {
            ctx2 = document.getElementById('myChart2').getContext('2d');
            // var gradient = ctx2.createLinearGradient(0, 0, 0, 400);
            // gradient.addColorStop(0, '#25365d33');
            // gradient.addColorStop(1, '#25365dff');
            chart2 = new Chart(ctx2, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: [
                        // "01/Jan", "15/Jan", "01/Fev", "15/Fev", "01/Mar", "15/Mar", "01/Abr", "15/Abr", "01/Mai", "15/Mai", "01/Jun", "15/Jun"
                    ],
                    datasets: [
                        // {
                        //     label: "Minha Colocação",
                        //     backgroundColor: gradient,
                        //     hoverBackgroundColor: "#102149",
                        //     data: [5, 2, 4, 5, 9, 10, 5, 4, 8, 8, 2, 3]
                        // },

                        {
                            label: "Minha Colocação",
                            // backgroundColor: '#25365d66',
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: '#25365d',
                            // data: [5, 2, 4, 5, 9, 10, 5, 4, 8, 8, 2, 3]
                        }
                    ]
                },

                // Configuration options go here
                options: {
                    legend: false,

                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                min: 1, // minimum will be 0, unless there is a lower value.
                                suggestedMax: ranking.length,
                                reverse: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Colocação'
                            }
                        }]
                    }
                }
            });
        },

        change: function (datasetIndex, dataArr, labelsArr) {
            chart2.data.datasets[datasetIndex].data = dataArr;
            chart2.data.labels = labelsArr;
            //chart animation
            if (typeof scrollChart[2] === "undefined") {
                for (var i in chart2.data.datasets) {
                    chart2.data.datasets[i].hidden = true;
                }
                scrollFireCharts("#myChart2", function () {
                    for (var i in chart2.data.datasets) {
                        chart2.data.datasets[i].hidden = false;
                    }
                    chart2.update();
                }, 2);
            } else {
                chart2.update();
            }
            //*chart animation
            // chart2.update();
        }
    },
    charts3: {
        create: function () {
            ctx3 = document.getElementById('myChart3').getContext('2d');
            chart3 = new Chart(ctx3, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: [
                        // "01/Jan", "15/Jan", "01/Fev", "15/Fev", "01/Mar", "15/Mar", "01/Abr", "15/Abr", "01/Mai", "15/Mai", "01/Jun", "15/Jun"
                    ],
                    datasets: [{
                        label: "Primeiro Colocado",
                        // backgroundColor: '#25365d66',
                        backgroundColor: 'rgba(11,21,43,0.9)',
                        // borderColor: '#25365d',
                        // data: [5, 2, 4, 5, 9, 10, 5, 4, 8, 8, 2, 3]
                    }]
                },

                // Configuration options go here
                options: {
                    legend: false,

                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                                suggestedMax: typeof primeiros !== "undefined" ? primeiros.ocorrencias[0] + 1 : 0
                                //reverse: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Vezes como Primeiro'
                            }
                        }]
                    }
                }
            });
        },

        change: function (datasetIndex, dataArr, labelsArr) {
            chart3.data.datasets[datasetIndex].data = dataArr;
            chart3.data.labels = labelsArr;
            //chart animation
            if (typeof scrollChart[3] === "undefined") {
                for (var i in chart3.data.datasets) {
                    chart3.data.datasets[i].hidden = true;
                }
                scrollFireCharts("#myChart3", function () {
                    for (var i in chart3.data.datasets) {
                        chart3.data.datasets[i].hidden = false;
                    }
                    chart3.update();
                }, 3);
            } else {
                chart3.update();
            }
            //*chart animation
            // chart3.update();
        }
    }
}

scrollChart = []
function scrollFireCharts(selector, foo, id) {

    scrollChart[id] = 0;

    $(window).scroll(function () {
        if (scrollChart[id] == 0) {
            var sT = $(selector).offset().top,
                sH = $(selector).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();

            if (wS + wH + window.innerHeight * ((window.innerWidth > 900) ? 0.15 : 0.4) > sT + sH) {
                foo();
                scrollChart[id] = 1;
            }
        }
    });
}

//DOM EVENTS

//bind

function BindEvents() {
    var playersJSON = {};
    for (var p in players) {
        playersJSON[players[p].name] = null;
    }

    $('input.autocomplete').autocomplete({
        data: playersJSON,
        limit: 3, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            Search(val);
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

    $(".arrow-pulse-down").on("click", function() { $('html,body').animate({ scrollTop: window.innerHeight }, 'slow'); return false; });

    Scrolls();

    $(".verMais a").on("click", function() { //simulates search on "plus" click
        var nome = $(this).parent().siblings(".nome").html(); //modal
        nome = nome.split(" ")
        nome.shift()
        nome = nome.join(" ");
        Search(nome);
    });

    $("#refresh").on("click", function() {
        $(".chartLoading").addClass("active");
        OnlineGet('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0');
    });

    $("#moreRank").on("click", function() { ShowMoreRank(); });

    $('.input-field input[type=search]~i:first-of-type').on("click", function() {
        $("#searchVal").blur();
        Search($('#searchVal').val()); //search on click Magnifying glass
    });

    $("#searchVal").on("search", function() {
        $('#searchVal').blur();
        Search($('#searchVal').val());
    });

    $('.input-field input[type=search]~i:nth-of-type(2)').on("click", function() {
        $('#searchVal').val(''); //clean search on close
    });

    $(".blockMobile .btn").on("click", function() {
        $(".blockMobile").removeClass("show");
    });
}

function ShowMoreRank() {
    k += 6; //number of players shown on click (= k-1)

    for (i in ranking) {
        if (i < k) {
            $($("#rankContent>.col")[i]).removeClass("hide"); //show player
        }
        if (k > ranking.length - 1) {
            $("#moreRank").addClass('hide'); //hide button if there are no more players
        }
    }
}

//search

function Search(key) {

    loading.soft.start();

    var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name"
        ]
    };
    var fuse = new Fuse(players, options); // "list" is the item array
    var result = fuse.search(key);

    if (result.length != 0) {
        GetSearchedPage(result[0].page);
    }
    else {
        loading.soft.stop();
        ShowNameNotFound();
    }

    function GetSearchedPage(page) {
        if (typeof searchAjax !== "undefined" && searchAjax.readyState !== 4 && searchAjax.readyState !== 0) {
            searchAjax.abort();
        }

        searchAjax = $.ajax({
            url: 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + page + '/public/values?alt=json&_=' + new Date().getTime(),
            dataType: 'html',
            timeout: 10000,
            success: function (json) {
                data = JSON.parse(json).feed.entry //recebe a data como json

                var pageStr = "page" + page; //referencia para o novo array (table.pageN)

                TableCreate(pageStr, false); //gera array (table.pageN.rowM[cell1,cell2,cell3])

                BuildSearchModal(page, pageStr);

                loading.soft.stop();

                $('#modal1').modal('open');
                $("#modal1 .modal-footer a").trigger("focus");
            },
            error: function (xhr, status, error) {
                if (status != "abort") {
                    loading.soft.stop();
                    ShowNoConnection();
                }
            }
        });
    }

    function VezesPrimeiro(nome) {
        for (var i in primeiros.nome) {
            if (primeiros.nome[i] == nome) {
                return primeiros.ocorrencias[i];
            }
        }
        return 0;
    }

    function BuildSearchModal(page, pageStr) {

        var pIndex = players.findIndex(
            function (element) {
                if (element.page == page) { return true; }
                else { return false; }
            }
        );

        //Prepare Modal
        $("#modal1 .modal-content>h4").html("Dados de " + players[pIndex].name); //MAIN TITLE

        $("#jogos").html('');
        $("#sideGames").html('');

        table[pageStr].dados = {}; //player data broken down

        j = 0;
        for (var i in table[pageStr]) { //itera sobre a página, e i é row1, row2, row3... //sheet format (Participante)
            //j1 é o header, por isso j > 0
            //jImpar é o header de cada jogo
            //jPar é o resultado de cada jogo
            //jLast é a pontuação final
            if (j % 2 != 0 && j < Object.keys(table[pageStr]).length - 2 && j > 0) { //fileira impar (jogo1, jogo2...)
                table[pageStr].dados[table[pageStr][i]] = []; //cria jogo1, jogo2...
                lastJogo = table[pageStr][i];

                jogoTitle = '<span id="' + i + '" class="jogo col s12 m6"><h5>' + lastJogo + '</h5>'; //GAME TITLE (JOGO 1...)
            }
            if (j % 2 == 0 && j < Object.keys(table[pageStr]).length - 2 && j > 0) { //fileira par (timeA 10 x 10 timeB ponto1 ponto2)
                table[pageStr].dados[lastJogo].jogos = [table[pageStr][i][0], table[pageStr][i][1], table[pageStr][i][3], table[pageStr][i][4], table[pageStr][i].pop()];
                var jogos = table[pageStr].dados[lastJogo].jogos;

                $("#jogos").append(jogoTitle + jogos[0] + " " + jogos[1] + " x " + jogos[2] + " " + jogos[3] + "</span>"); //EACH GAME MAIN BLOCK

                $("#sideGames").append("<div><span class='sideJogo'>" + lastJogo + "</span><span class='sideNum'>" + jogos[4] + "</span></div>"); //EACH GAME SIDE BLOCK

                var rowAnterior = i.split("row")[1] - 1;
                $("#jogos .col#row" + rowAnterior).attr("data-content", jogos[4])
            }
            if (j == Object.keys(table[pageStr]).length - 2) { //ultima fileira (pontuação final)
                table[pageStr].dados.pontuacao = table[pageStr][i][1];
                pontuacao = table[pageStr].dados.pontuacao;

                $(".sideTotal").remove(); //REFRESH SIDETOTAL (FOOTER)
                $("#sidePont").append("<div class='sideTotal'><span>Final</span><span>" + pontuacao + "</span></div>"); //SIDETOTAL
            }

            j++;
        }

        $("#modal1 #primeiroX").html(VezesPrimeiro(result[0].name));
    }

    function ShowNameNotFound() {
        showError('Nome não encontrado! Verifique se o nome inserido está correto.<br>Se o problema persistir, entre em contato através da <a href="contato.html" target="_blank" style="color: rgba(0,0,0,0.87);"><em>página de contato</em></a>.');
    }

    function ShowNoConnection() {
        showError('Pesquisa Inválida! Verifique sua conexão com a internet e/ou se o nome inserido está correto.<br>Se o problema persistir, entre em contato através da <a href="contato.html" target="_blank" style="color: rgba(0,0,0,0.87);"><em>página de contato</em></a>.');
    }
}

//scroll

function ScrollFire(selector, id, foo1, foo2) {
    if (typeof scrollIds === "undefined") { scrollIds = [] }
    scrollIds[id] = 0;
    $(window).scroll(function () {
        var sT = $(selector).offset().top,
            sH = $(selector).outerHeight(),
            wH = $(window).height(),
            wS = $(window).scrollTop();

        if (scrollIds[id] == 0) { //só roda uma vez
            if (wS > sT + sH) { //trigger quando o ranking não está acima da visão
                foo1();
                scrollIds[id] ^= 1;
            }
        }
        else {
            if (wS < sT + sH) { //trigger quando o ranking volta a estar visível
                (typeof foo2 === "undefined") ? foo1() : foo2();
                scrollIds[id] ^= 1;
            }
        }
    });
}

function Scrolls() {
    ScrollFire('#rankList', 1, function () {
        $('#sideRank').removeClass('hideSide');
    },
    function () {
        $('#sideRank').addClass('hideSide');
    });

    ScrollFire('#rankContent>div:first-child', 2, function () {
        $('#first').addClass('transform');
    },
    function() {
        $('#first').removeClass('transform');
    });
}

//error

function showError(msg) {
    $("#modal2 .modal-content>p").html(msg);
    $('#modal2').modal('open');
}

// function ResizeArray(arr, size) {
//     if (arr.length > size) {
//         var num = arr.length / size; //mostra só 20
//         var num2 = num - Math.floor(num);
//         num2 = (num2 == 0 ? 1 : 1 / num2); //evita Infinity
//         num = Math.round(num * num2);
//         var temp = [];
//         for (var i in arr) {
//             // console.log(i % num == 0 ? "Fora:" + i + " " + num + " " + arr[i] + " Resto:" + i % num : "Dentro" + i + " " + num + " " + arr[i] + " Resto:" + i % num );
//             if (i % num != 0) {
//                 temp.push(arr[i]);
//             }
//         }
//         return temp;
//     }

//     return arr;
// }

// function ResizeChartArrays(size) {
//     if (typeof media !== "undefined" && typeof media.mediaArr !== "undefined" && media.mediaArr.length > 0) { media.mediaArr = ResizeArray(media.mediaArr, size);}
//     if (typeof media !== "undefined" && typeof media.dateArr !== "undefined" && media.dateArr.length > 0) { media.dateArr = ResizeArray(media.dateArr, size);}
//     if (typeof user !== "undefined" && typeof user.pontuacao !== "undefined" && user.pontuacao.length > 0) { user.pontuacao = ResizeArray(user.pontuacao, size);}
//     if (typeof user !== "undefined" && typeof user.date !== "undefined" && user.date.length > 0) { user.date = ResizeArray(user.date, size);}
//     if (typeof user !== "undefined" && typeof user.colocacao !== "undefined" && user.colocacao.length > 0) { user.colocacao = ResizeArray(user.colocacao, size);}
//     // if (typeof primeiros !== "undefined" && typeof primeiros.ocorrencias !== "undefined" && primeiros.ocorrencias.length > 0) { primeiros.ocorrencias = ResizeArray(primeiros.ocorrencias, size);}
//     // if (typeof primeiros !== "undefined" && typeof primeiros.nome !== "undefined" && primeiros.nome.length > 0) { primeiros.nome = ResizeArray(primeiros.nome, size);}
// }