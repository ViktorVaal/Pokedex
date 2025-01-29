function renderFilteredPokemonCards() {
    renderFilteredPokemon();
    renderFilteredPokemonId();
    renderFilteredPokemonType();
    renderFilteredPokemonSprite();
}

async function filterPokemon(event) {
    event.preventDefault();
    let loadMoreRef = document.getElementById("loadMoreBtn");
    loadMoreRef.classList.add("d-none");
    allPokemon = await getData("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
    allPokemon = allPokemon.results
    let inputRef = document.getElementById("filterInput").value.toLowerCase();
    filteredPokemon = allPokemon.filter((elem) => elem["name"].startsWith(inputRef));
    renderFilteredPokemonCards()
}

function renderFilteredPokemon() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";
    for (let index = 0; index < filteredPokemon.length; index++) {
        contentRef.innerHTML += filteredPokeCardTemplate(index);
    }
    renderFilteredBackgroundColor();
}

async function renderFilteredBackgroundColor() {
    let pokeCardRef = document.getElementsByClassName("poke-card");
    for (let i = 0; i < pokeCardRef.length; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);   
        for (let index = 0; index < 1; index++) {
            pokeCardRef[i + offset].classList.add(`bg-${data.types[0].type.name}`);
        }
    }
}

async function renderFilteredPokemonId() {
    let pokemonIdRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < pokemonIdRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);
        for (let index = 0; index < 1; index++) {
            pokemonIdRef[i].innerHTML += pokemonIdTemplate(data);
        }
    }
}

async function renderFilteredPokemonType() {
    let shortInfoRef = document.getElementsByClassName("short-info");
    for (let i = 0; i < shortInfoRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);
        for (let index = 0; index < data.types.length; index++) {
            shortInfoRef[i].innerHTML += pokemonTypeTemplate(index);
        }
    }
}

async function renderFilteredPokemonSprite() {
    let spriteRef = document.getElementsByClassName("pokemon-id");
    for (let i = 0; i < spriteRef.length - offset; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);    
        for (let index = 0; index < 1; index++) {
            spriteRef[i].innerHTML += pokemonSpriteTemplate(data);
        }
    }
}
