const pokeContainer = document.querySelector("#pokeContainer")
const pokemonCount = 151
const colors = {
    fire: '#FF6347',
    grass: '#228B22',
    electric: '#FFFF00',
    water: '#00BFFF',
    ground: '#F4A460',
    rock: '#8B4513',
    fairy: '#DDA0DD',
    poison: '#9932CC',
    bug: '#9ACD32',
    dragon: '#97b3e6',
    psychic: '#FF69B4',
    flying: '#FFF0F5',
    fighting: '#A52A2A',
    normal: '#FFE4C4'
}

let selectedPokemon = [];
const maxSelected = 6; // Número máximo de Pokémon selecionados
const selecionarButton = document.querySelector("#selecionarButton");
const selectedCountDiv = document.querySelector("#selectedCount");

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const data = await response.json()
    createPokemonCard(data)
}

const selectPokemon = (id) => {
    const allPokemonCards = document.querySelectorAll('.pokemon');
    allPokemonCards.forEach(card => {
        card.classList.remove('selected');
    });

    const selectedPokemonCard = document.querySelector(`#pokemon-${id}`);
    selectedPokemonCard.classList.add('selected');

    // Aqui você pode fazer o que quiser com o Pokémon selecionado,
    // como mostrar detalhes ou executar outras ações.
};


const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add('pokemon')
    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3,'0')
    const status = poke.stats
    const ataques = poke.moves

    const pokeTypes = poke.types.map(type => type.type.name)
    let pokemonInnerHTML = '';
    if(pokeTypes.length === 2){
        const type1 = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
        const type2 = pokeTypes.find(type => type !== type1);
        const color = colors[type1]
        card.style.backgroundColor = color
        pokemonInnerHTML = `
            <div class="imgContainer">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
            <div class="types">
                <small class="type">Tipo 1: <span>${type1}</span></small><br>
                <small class="type">Tipo 2: <span>${type2}</span></small>
            </div>
        </div>
        `;
    }else{
        const type1 = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
        const color = colors[type1]

        card.style.backgroundColor = color

        pokemonInnerHTML = `
            <div class="imgContainer">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Tipo: <span>${type1}</span></small>
            </div>
        `;
    }
    card.innerHTML = pokemonInnerHTML

    card.addEventListener('click', () => {
        if (selectedPokemon.includes(id)) {
            selectedPokemon = selectedPokemon.filter(pokemonId => pokemonId !== id);
            card.classList.remove('selected');
        } else if (selectedPokemon.length < maxSelected) {
            selectedPokemon.push(id);
            card.classList.add('selected');
        }
        
        // showSelectedPokemon();
    });

    pokeContainer.appendChild(card);
}

const showSelectedPokemon = () => {
    selectedCountDiv.textContent = `Pokémon selecionados: ${selectedPokemon.length}/${maxSelected}`;
};

selecionarButton.addEventListener('click', () => {
    if (selectedPokemon.length > 0) {
        const selectedPokemonIds = selectedPokemon.join(',');
        window.location.href = `luta.html?pokemonIds=${selectedPokemonIds}`;
    } else {
        alert("Selecione pelo menos um Pokémon antes de prosseguir.");
    }
});

fetchPokemons()

window.selectedPokemon = selectedPokemon;