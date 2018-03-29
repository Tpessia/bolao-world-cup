$(function() {
    OnlineGet('1', '1I5avuVF1MCJyDQAEk9lrflQsuA4q6wWoMiVqO6pKiT0');
    
    $("#name").trigger("focus");

    $('#name').off().keypress(function (e) {
        if (e.which == 13) {
            $('#formLogin').submit();
            return false;
        }
    });

    $("#formLogin").off().on("submit", function (e) {
        e.preventDefault();
        Cadastrar();
    });

    var url = new URL(window.location);
    var login = url.searchParams.get("login");

    if (login) {
        $("#name").val(login);
        $('#formLogin').submit();
    }

    function Cadastrar() {
        user = { name: "", code: "", page: "", pontuacao: [], colocacao: [], date: [] };

        //validação

        // user.name = $("#name").val().trim();
        user.code = $("#name").val().trim();

        var playerCount = 1;
        for (i in players) { //players[i].name and players[i].page
            // if (user.name == players[i].name) { //verifica se usuário é válido
            if (user.code == players[i].code) { //verifica se usuário é válido
                user.name = players[i].name;
                user.code = players[i].code;
                user.page = players[i].page;

                $("a.login").css({ "opacity": "0.5", "cursor": "default", "pointer-events": "none" }); //prevent new logins while ajax is running
                break;
            }
            if (playerCount == players.length) { //se nenhum for válido, cancela o cadastro
                $("#name").addClass("invalid");
                return; //cancela cadastro
            }
            playerCount++;
        }

        localStorage.setItem('user', JSON.stringify(user));

        window.location.replace('./');
    }

    function OnlineGet(pages, ID) { //request spreadsheet page data
        id = ID; //cria id global
        pages = pages.split(',');

        pages.forEach(function (page, index) {

            var urlJSON = 'https://spreadsheets.google.com/feeds/cells/' + id + '/' + page + '/public/values?alt=json';

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
                    PlayersArray();
                },
                error: function (xhr, status, error) {
                    if (status != "abort") {
                        OnlineGet(pages.join(","), id);
                    }
                }
            });
        })
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
});