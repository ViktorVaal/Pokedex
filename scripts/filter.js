async function filterPokemon(event) {
    event.preventDefault();
    let loadMoreRef = document.getElementById("loadMoreBtn");
    loadMoreRef.classList.add("d-none");
    allPokemon = await getData("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0");
    allPokemon = allPokemon.results
    let inputRef = document.getElementById("filterInput").value.toLowerCase();
    filteredPokemon = allPokemon.filter((elem) => elem["name"].startsWith(inputRef));
    renderFilteredPokemon()
}

function renderFilteredPokemon() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";
    for (let index = 0; index < filteredPokemon.length; index++) {
        contentRef.innerHTML += filteredPokeCardTemplate(index);
    }
    renderFilteredPokemonInfo()
}

async function renderFilteredPokemonInfo() {
    let pokeCardRef = document.getElementsByClassName("poke-card");
    for (let i = 0; i < filteredPokemon.length; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);   
        renderFiltered(i)
    }
    toggleScroll()
}

function renderFiltered(i) {
    pokemonIdRef[i + offset].innerHTML += pokemonIdTemplate(data);
    spriteRef[i + offset].innerHTML += pokemonSpriteTemplate(data);
    pokeCardRef[i + offset].classList.add(`bg-${data.types[0].type.name}`);
    for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
        shortInfoRef[i + offset].innerHTML += pokemonTypeTemplate(typeIndex);
    }
}