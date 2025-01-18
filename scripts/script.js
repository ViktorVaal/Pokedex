let allPokemon = {};
let filteredPokemon = [];
let amount = 35;
let offset = 0;
let data = {};
let overlayData = {};
let spezies = {};
let weakness = {};
let evoChain = {};

function init() {
    renderPokeCard();
}

function render() {
    renderPokemonType();
    renderPokemonId();
    renderPokemonSprite();
    renderBackgroundColor()
}

async function getData(path = "") {
    let loaderRef = document.getElementById("loader");
    loaderRef.style.display = "flex";
    try {
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error("could not fetch resource");
        }
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error(error);
    }finally {
        loaderRef.style.display = "none"
    }
}

async function renderPokeCard() {
    allPokemon = {};
    allPokemon = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offset}`);
    let contentRef = document.getElementById("content");
    for (let index = 0; index < amount; index++) {
        contentRef.innerHTML += pokeCardTemplate(index);
    }
    render();
}

async function renderPokemonId() {
    let pokemonIdRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < pokemonIdRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${i + offset + 1}/`);
        for (let index = 0; index < 1; index++) {
            pokemonIdRef[i + offset].innerHTML += pokemonIdTemplate(data);
        }
    }
}

async function renderPokemonType() {
    let shortInfoRef = document.getElementsByClassName("short-info");
    for (let i = 0; i < shortInfoRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${i + offset + 1}/`);
        for (let index = 0; index < data.types.length; index++) {
            shortInfoRef[i + offset].innerHTML += pokemonTypeTemplate(index);
        }
    }
}

async function renderPokemonSprite() {
    let spriteRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < spriteRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${i + offset + 1}/`);    
        for (let index = 0; index < 1; index++) {
            spriteRef[i + offset].innerHTML += pokemonSpriteTemplate(data);
        }
    }
}

async function renderBackgroundColor() {
    let pokeCardRef = document.getElementsByClassName("poke-card");
    for (let i = 0; i < pokeCardRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${i + offset + 1}/`);   
        for (let index = 0; index < 1; index++) {
            pokeCardRef[i + offset].classList.add(`bg-${data.types[0].type.name}`);
        }
    }
}


function loadMorePokemon() {
    offset = offset + amount;
    renderPokeCard() 
}

