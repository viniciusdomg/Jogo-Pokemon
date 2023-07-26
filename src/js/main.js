const cont = document.querySelector('.jogo');


function paginaJogar(){
    window.location.href='entrar.html';
}

function paginaPokemon(){
    window.location.href='pokemons.html';
}

function paginaCreditos(){
    window.location.href='creditos.html';
}

function voltar(){
    window.location.href='index.html';
}

function selecionarPokemon(){
    window.location.href='selecao.html';
}
//}

/*function mostrarMenu() {
    fetch('https://pokeapi.co/api/v2/pokemon/', {method: 'GET'})
        .then(resp => resp.json())
        .then(function(json){
            console.log(json);
    
            //esse "results" é onde está localizado os dados da API
            json.results.map(function(results){ 
                cont.innerHTML +=`
                <div class="card"> <img src=` +results.image+`> 
                <strong><font size="5">`+results.name+` </font></strong><br>
                `;
        })
    })
}
 mostrarMenu();*/