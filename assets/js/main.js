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


function newData(pages, ID) {
    id = ID;
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

                // for (i in table[page]) { //só mostra na div (remover no projeto oficial)
                //     $("#div").html($("#div").html() + table[page][i]);
                //     $("#div").html($("#div").html() + "<br>");
                // }

                rankingGet();
                playersGet();
            },
            error: function (xhr, status, error) {
                alert('Erro, sem conexão com a internet!');
            }
        });
    })
}


function rankingGet() {
    k = 4; //numero de itens do rank mostrados por vez

    ranking = [];

    j = 0;
    for (i in table.page1) { //cria array do ranking
        if (j > 1) {
            ranking.push({ name: table.page1[i][1], pontuacao: table.page1[i][2] });
        }
        j++;
    }

    $("#rank").html('<h2>RANKING</h2><a id="moreRank" class="rankBtn waves-effect waves-light btn col s5"><i class="material-icons right">playlist_add</i>Ver Mais</a><a id="refresh" class="rankBtn waves-effect waves-light btn col s4"><i class="material-icons">autorenew</i><span class="hide-on-small-only">Atualizar</span></a>');
    $("#sideRank>.row").html('<h2>Top 5</h2>');
    

    for (i in ranking) { //só mostra na div (remover no projeto oficial)
        if(i==0){
            element = '<div class="col s12">';
            btn = 'btn-large';
        }
        else {
            element = '<div class="col s10">';
            btn = 'btn';
        }

        element2 = element;

        element += '<div class="card"><div class="card-content white-text row"><span class="card-title col s9 m4 nome">' + (parseInt(i) + 1) + ". " + ranking[i].name + '</span><span class="card-action col s2 m5 offset-m1 right"><a class="rankElem large-only">Ver Dados</a><a class="btn-floating ' + btn + ' waves-effect waves-light hide-on-large-only"><i class="material-icons">add</i></a></span><span class="col s5 m2 pontuacao">' + ranking[i].pontuacao + ' pts' + '</span></div></div></div>';

        $("#moreRank").before(element);

        if(i>k){$($("#rank>.col")[i]).addClass("hide");}

        if(i<5) {
            element2 += '<div class="card"><div class="card-content white-text row"><span class="card-title col s8 nome">' + (parseInt(i) + 1) + ". " + ranking[i].name + '</span><span class="card-action col s3"><a class="btn-floating btn waves-effect waves-light"><i class="material-icons">add</i></a></span></div></div></div>';

            $("#sideRank>.row").append(element2);
        }
    }

    bindClick();
}

function showMoreRank() {
    k+=5;
    
    for (i in ranking) {
        if (i < k) {
            $($("#rank>.col")[i]).removeClass("hide");
        }
        if (k > ranking.length - 1) {
            $("#moreRank").addClass('hide');
        }
    }
}


function playersGet() {
    players = [];

    j = 0;
    for (i in table.page1) {
        if (j > 1) {
            pageVar = table.page1[i][3];
            nameVar = table.page1[i][4]; //nomes são salvados minificados
            players.push({ page: pageVar, name: nameVar });
        }
        j++;
    }


}

function search(key) {

    pesquisa = lower(key);

    for (i in players) {
        if (/*pesquisa.match(lower(players[i].name))*/pesquisa == lower(players[i].name)) {

            $.ajax({ //verifica se a url existe
                url: 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + players[i].page + '/public/values?alt=json',
                dataType: 'html',
                success: function (json) {
                    data = JSON.parse(json).feed.entry //recebe a data como json

                    pageSearch = "search"; //cria a pageN

                    arrayfy(pageSearch, false); //gera array (table.pageN.rowM[cell1,cell2,cell3])

                    $("#modal1 .modal-content>h4").html("Dados de " + players[i].name);

                    $("#playerStats").html('');
                    $("#sideGames").html('');

                    table[pageSearch].dados = {};

                    j=0;
                    for (i in table[pageSearch]) { //só mostra na div (remover no projeto oficial)
                        if(j%2!=0 && j<Object.keys(table[pageSearch]).length-2 && j>0){
                            table[pageSearch].dados[table[pageSearch][i]] = []; //cria jogo1 jogo2
                            lastJogo = table[pageSearch][i];

                            jogoTitle = '<span class="jogo col m6 s12"><h5>' + lastJogo + '</h5>';
                        }
                        if(j%2==0 && j<Object.keys(table[pageSearch]).length-2 && j>0) {
                            table[pageSearch].dados[lastJogo].times = [table[pageSearch][i][0],table[pageSearch][i][1],table[pageSearch][i][3],table[pageSearch][i][4],table[pageSearch][i].pop()];
                            times = table[pageSearch].dados[lastJogo].times;

                            $("#playerStats").append(jogoTitle + times[0] + " " + times[1] + " x " + times[2] + " " + times[3] + "</span>");

                            $("#sideGames").append("<div><span class='sideJogo'>" + lastJogo + "</span><span class='sideNum'>" + times[4] + "</span></div>");
                        }
                        if (j == Object.keys(table[pageSearch]).length - 2){
                            table[pageSearch].dados.pontuacao = table[pageSearch][i][0];
                            pontuacao = table[pageSearch].dados.pontuacao;

                            $(".sideTotal").remove();
                            $("#sidePont").append("<div class='sideTotal'><span>Final</span><span>" + pontuacao + "</span></div>");
                        }

                        //acessar: table.search.dados['Jogo 1'].times [0:timeA,1:pontA,2:pontB,3:timeB,4:pontPlayerJogo]; table.search.dados.pontuacao;

                        j++;
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

function arrayfy(sheetPage, nullify = false) {
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

scrollFire('#rank',function(){$('#sideRank').toggleClass('hideSide');},cont=1)