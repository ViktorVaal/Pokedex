let BASE_URL = "https://pokeapi.co/api/v2/";

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
    try {
        let response = await fetch(BASE_URL + path);
        if (!response.ok) {
            throw new Error("could not fetch resource");
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function renderPokeCard() {
    data = await getData("pokemon?limit=151&offset=0");
    let contentRef = document.getElementById("content");
    for (let index = 0; index < data.results.length; index++) {
        contentRef.innerHTML += pokeCardTemplate(index);
    }
    render();
}

async function renderPokemonId() {
    let pokemonIdRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < pokemonIdRef.length; i++) {
        data = await getData(`pokemon/${i + 1}/`);
        for (let index = 0; index < 1; index++) {
            pokemonIdRef[i].innerHTML += pokemonIdTemplate(data);
        }
    }
}

async function renderPokemonType() {
    let shortInfoRef = document.getElementsByClassName("short-info");
    for (let i = 0; i < shortInfoRef.length; i++) {
        data = await getData(`pokemon/${i + 1}/`);
        for (let index = 0; index < data.types.length; index++) {
            shortInfoRef[i].innerHTML += pokemonTypeTemplate(index);
        }
    }
}

async function renderPokemonSprite() {
    let spriteRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < spriteRef.length; i++) {
        data = await getData(`pokemon/${i + 1}/`);    
        for (let index = 0; index < 1; index++) {
            spriteRef[i].innerHTML += pokemonSpriteTemplate(data);
        }
    }
}

async function renderBackgroundColor() {
    let pokeCardRef = document.getElementsByClassName("poke-card");
    for (let i = 0; i < pokeCardRef.length; i++) {
        data = await getData(`pokemon/${i + 1}/`);   
        for (let index = 0; index < 1; index++) {
            pokeCardRef[i].classList.add(`bg-${data.types[0].type.name}`);
        }
    }
}

