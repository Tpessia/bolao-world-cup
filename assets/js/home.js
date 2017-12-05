$(function() {
    newData('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0');
    //setInterval((function () { newData('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0'); bindClick();}),180000);

    $('.input-field input[type=search]~i:first-of-type').on("click", function () {
        search($('#searchVal').val()); //search on click Magnifying glass
    })

    $('.input-field input[type=search]~i:nth-of-type(2)').on("click", function () {
        $('#searchVal').val(''); //clean search on close
    })
})

function bindClick() { //está rodando quando o rankfy roda, que por sua vez roda quando o new data roda
    $(".card-content .rankElem, .card-content .btn-floating").on("click", function () {
        nome = $(this).closest(".card").find(".card-title").html(); //modal
        nome = nome.split(" ")
        nome.shift()
        nome = nome.join(" ");
        search(nome);
    })

    $("#moreRank").on("click", function () {
        showMoreRank();
    })

    $("#refresh").on("click", function () {
        newData('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0');
    })
}


function newData(pages, ID) { //request spreadsheet page data
    id = ID; //cria id global
    pages = pages.split(',');

    pages.forEach(function (page, index) {

        var urlJSON = 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + page + '/public/values?alt=json';

        $.ajax({ //verifica se a url existe
            url: urlJSON,
            dataType: 'html',
            async: false,
            timeout: 5000,
            success: function (json) {
                data = JSON.parse(json).feed.entry //recebe a data como json

                page = "page" + page; //cria a pageN

                arrayfy(page, true); //gera array (table.pageN.rowM[cell1,cell2,cell3])

                rankCreate();
                playersArray();
            },
            error: function (xhr, status, error) {
                alert('Erro, sem conexão com a internet!');
            }
        });
    })
}


function rankCreate() { //create ranking element
    k = 4; //numero de itens do rank mostrados por vez

    ranking = [];

    j = 0;
    for (i in table.page1) { //cria array do ranking
        if (j > 1) {
            ranking.push({ name: table.page1[i][1], pontuacao: table.page1[i][2] });
        }
        j++;
    }
    

    for (i in ranking) { //só mostra na div (remover no projeto oficial)
        if(i==0){
            rankBlock = '<div class="col s12">'; //maior se for o primeiro
            btn = 'btn-large';
        }
        else {
            rankBlock = '<div class="col s10">'; //2nd,3rd,4th...
            btn = 'btn';
        }

        sideRank = rankBlock;

        rankBlock += '<div class="card"><div class="card-content white-text row"><span class="card-title col s9 m4 nome">' + (parseInt(i) + 1) + ". " + ranking[i].name + '</span><span class="card-action col s2 m5 offset-m1 right"><a class="rankElem large-only">Ver Dados</a><a class="btn-floating ' + btn + ' waves-effect waves-light hide-on-large-only"><i class="material-icons">add</i></a></span><span class="col s5 m2 pontuacao">' + ranking[i].pontuacao + ' pts' + '</span></div></div></div>'; //main rank block

        $("#rankContent").html(($"#rankContent").html() + rankBlock); //append main rank block

        if(i>k){$($("#rankContent>.col")[i]).addClass("hide");} //hide players that are not at the top "k+1"

        if(i<5) { //create side rank
            sideRank += '<div class="card"><div class="card-content white-text row"><span class="card-title col s8 nome">' + (parseInt(i) + 1) + ". " + ranking[i].name + '</span><span class="card-action col s3"><a class="btn-floating btn waves-effect waves-light"><i class="material-icons">add</i></a></span></div></div></div>';

            $("#sideRank>.row").append(sideRank);
        }
    }

    bindClick();
}

function showMoreRank() {
    k+=6; //number of players shown on click (= k-1)
    
    for (i in ranking) {
        if (i < k) {
            $($("#rankContent>.col")[i]).removeClass("hide"); //show player
        }
        if (k > ranking.length - 1) {
            $("#moreRank").addClass('hide'); //hide button if there are no more players
        }
    }
}


function playersArray() {
    players = [];

    j = 0;
    for (i in table.page1) {
        if (j > 1) {
            pageVar = table.page1[i][3];
            nameVar = table.page1[i][4];
            players.push({ page: pageVar, name: nameVar });
        }
        j++;
    }


}

function search(key) {

    pesquisa = lower(key); //catch and format name

    for (i in players) { //players[i].name and players[i].page
        if (/*pesquisa.match(lower(players[i].name))*/pesquisa == lower(players[i].name)) {

            $.ajax({
                url: 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + players[i].page + '/public/values?alt=json',
                dataType: 'html',
                success: function (json) {
                    data = JSON.parse(json).feed.entry //recebe a data como json

                    arrayfy(searching, false); //gera array (table.pageN.rowM[cell1,cell2,cell3])

                    //Prepare Modal
                    $("#modal1 .modal-content>h4").html("Dados de " + players[i].name); //MAIN TITLE

                    $("#playerStats").html('');
                    $("#sideGames").html('');

                    var searching = "page" + players[i].page; //referencia para o novo array (table.pageN)

                    createPageDados(searching);

                    function pageDadosModal(page) {
                        table[page].dados = {}; //player data broken down

                        j = 0;
                        for (i in table[page]) { //itera sobre a página, e i é row1, row2, row3...
                            if (j % 2 != 0 && j < Object.keys(table[page]).length - 2 && j > 0) { //fileira impar (jogo1, jogo2...)
                                table[page].dados[table[page][i]] = []; //cria jogo1, jogo2...
                                lastJogo = table[page][i];

                                jogoTitle = '<span class="jogo col m6 s12"><h5>' + lastJogo + '</h5>'; //GAME TITLE (JOGO 1...)
                            }
                            if (j % 2 == 0 && j < Object.keys(table[page]).length - 2 && j > 0) { //filaira par (timeA 10 x 10 timeB ponto1 ponto2)
                                table[page].dados[lastJogo].times = [table[page][i][0], table[page][i][1], table[page][i][3], table[page][i][4], table[page][i].pop()];
                                times = table[page].dados[lastJogo].times;

                                $("#playerStats").append(jogoTitle + times[0] + " " + times[1] + " x " + times[2] + " " + times[3] + "</span>"); //EACH GAME MAIN BLOCK

                                $("#sideGames").append("<div><span class='sideJogo'>" + lastJogo + "</span><span class='sideNum'>" + times[4] + "</span></div>"); //EACH GAME SIDE BLOCK
                            }
                            if (j == Object.keys(table[page]).length - 2) { //ultima fileira (pontuação final)
                                table[page].dados.pontuacao = table[page][i][0];
                                pontuacao = table[page].dados.pontuacao;

                                $(".sideTotal").remove(); //REFRESH SIDETOTAL (FOOTER)
                                $("#sidePont").append("<div class='sideTotal'><span>Final</span><span>" + pontuacao + "</span></div>"); //SIDETOTAL
                            }

                            j++;
                        }
                    }

                    $('#modal1').modal('open');
                },
                error: function (xhr, status, error) {
                    alert('Pesquisa Invalida');
                }
            });

            break;
        }
        else if (i==players.length-1) {
            alert("Nome não encontrado!")
        }
    }
}

function lower(string1) {
    return string1.toLowerCase().replace(/ã|Ã|á|Á|â|Â|à|À|ä|Ä/g, "a").replace(/é|É|ê|Ê|è|È|ë|Ë/g, "e").replace(/í|Í|î|Î|ì|Ì|ï|Ï/g, "i").replace(/õ|Õ|ó|Ó|ô|Ô|ò|Ò|ö|Ö/g, "o").replace(/ú|Ú|û|Û|ù|Ù|ü|Ü/g, "u").replace(/¹/g, "1").replace(/²/g, "2").replace(/³/g, "3").replace(/ç/g, "c").replace(/ª/g, "a").replace(/°|º/g, "o").replace(/ñ/g, "n").replace(/^-|-$|@+|#+|\$+|%+|&+|\*+|\++|´+|`+|¨+|\^+|!+|\?+|'+|"+|~+|£+|¢+|¬+|<+|>+|®+/g, "").replace(/0-9/g,"");
}

function arrayfy(sheetPage, nullify = false) { //create an array based on the spreadsheet page
    if (typeof table == "undefined") { table = {}; }

    table[sheetPage] = {};

    var lastRow = 0;

    for (var i = 0; i < data.length; i++) {
        var dataTemp = data[i];

        if (!table[sheetPage]["row" + dataTemp.gs$cell.row]) { table[sheetPage]["row" + dataTemp.gs$cell.row] = []; } //create table.rowN

        if (lastRow != dataTemp.gs$cell.row) { lastCol = 0; } //new row

        if (dataTemp.gs$cell.col > lastCol && nullify) { //add null para células vazias
            var holes = dataTemp.gs$cell.col - lastCol - 1; //number of emptys

            for (var j = 0; j < holes; j++) {
                table[sheetPage]["row" + dataTemp.gs$cell.row].push(null);
            }
        }

        table[sheetPage]["row" + dataTemp.gs$cell.row].push(dataTemp.gs$cell.$t); //add value

        lastCol = dataTemp.gs$cell.col;
        lastRow = dataTemp.gs$cell.row;
    }
}


function scrollFire(selector, foo, cont) {
    $(window).scroll(function () {
        //só funciona para elementos que sempre serão os primeiros na página
        var sT = $(selector).offset().top,
            sH = $(selector).outerHeight(),
            wH = $(window).height(),
            wS = $(window).scrollTop();

        if(cont>0) { //só roda uma vez
            if (wS > sT + sH) { //trigger quando o ranking não está acima da visão
                foo();
                cont--;
            }
        }
        else {
            if (wS < sT + sH) { //trigger quando o ranking volta a estar visível
                foo();
                cont++;
            }
        }
    });
}

scrollFire('#rankList',function(){$('#sideRank').toggleClass('hideSide');},cont=1)
