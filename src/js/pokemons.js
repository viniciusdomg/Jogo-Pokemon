const pokeContainer = document.querySelector("#pokeContainer")
const pokemonCount = 151
const colors = {
    fire: '#FF0000',
    grass: '#228B22',
    electric: '#FFFF00',
    water: '#00BFFF',
    ground: '#F4A460',
    rock: '#8B4513',
    fairy: '#DDA0DD',
    poison: '#A020F0',
    bug: '#9ACD32',
    dragon: '#97b3e6',
    psychic: '#FF00FF',
    flying: '#FFF0F5',
    fighting: '#8B0000',
    normal: '#FFE4C4'
}

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

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add('pokemon')
    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3,'0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    card.innerHTML = pokemonInnerHTML

    card.addEventListener('click', () => openModal({ name, id, type }));

    pokeContainer.appendChild(card)
}

const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

const openModal = (pokemonInfo) => {
    const modalPokemonInfo = document.getElementById('modal-pokemon-info');
    modalPokemonInfo.innerHTML = `
        <h2>${pokemonInfo.name}</h2>
        <p>Number: #${pokemonInfo.id}</p>
        <p>Type: ${pokemonInfo.type}</p>
        <!-- Aqui você pode adicionar mais informações do Pokémon conforme desejado -->
    `;
    document.getElementById('modal').style.display = 'block';
};


fetchPokemons()