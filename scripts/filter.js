function renderFilteredPokemonCards() {
    renderFilteredPokemon();
    renderFilteredPokemonId();
    renderFilteredPokemonType();
    renderFilteredPokemonSprite();
}

async function filterPokemon() {
    let loadMoreRef = document.getElementById("loadMoreBtn");
    loadMoreRef.classList.add("d-none");
    allPokemon = await getData("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
    allPokemon = allPokemon.results
    let inputRef = document.getElementById("filterInput").value;
    if (inputRef.length < 3) {
        alert("Bitte geben Sie mindestens 3 Buchstaben ein!")
    }else {
        filteredPokemon = allPokemon.filter((elem) => elem["name"].startsWith(inputRef));
        console.log(filteredPokemon);
        renderFilteredPokemonCards()
    }
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
    for (let i = 0; i < 11 - offset; i++) {
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
