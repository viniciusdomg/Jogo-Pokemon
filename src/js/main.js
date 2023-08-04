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

function luta(){
    window.location.href='luta.html';
}

// Validacao do formulario de "entrar".

document.getElementById("formEntrar").addEventListener("submit", function(event) {
    const nome = document.getElementById("nome").value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const dificuldade = document.querySelector('input[name="dificuldade"]:checked');

    if (!nome || !genero || !dificuldade) {
        alert("Preencha todos os campos obrigatórios!");
        event.preventDefault();
    } else {
        selecionarPokemon();
        event.preventDefault();
    }
});