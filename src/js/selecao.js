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

const pokemons = [3,6,9,12,15,18,20,24,25,26,31,34,38,42,45,51,55,57,59,62,65,68,71,73,80,85,89,91,94,95,97,99
    ,101,103,105,106,107,115,117,121,123,125,126,127,128,130,131
    ,134,135,136,139,141,142,143,149]

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i < pokemons.length; i++) {
        let id = pokemons[i-1];
        await getPokemons(id)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const data = await response.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add('pokemon')
    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3,'0')
    const status = poke.stats

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

    card.addEventListener('click', () => openModal({ name, id, types: pokeTypes, status}));


    pokeContainer.appendChild(card)
}

fetchPokemons()