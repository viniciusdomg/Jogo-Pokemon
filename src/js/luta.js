
const progress = 50;
const progresspc = 50;

const progressFill = document.getElementById("vidaFill");
progressFill.style.width = `${progress}%`;

const progresspcFill = document.getElementById("vidaPcFill");
progresspcFill.style.width = `${progresspc}%`;

const urlParams = new URLSearchParams(window.location.search);
const pokemonIds = urlParams.get("pokemonIds");

console.log(pokemonIds);

