/**
 * Filters the list of Pokémon based on user input and renders the filtered Pokémon cards.
 * 
 * This asynchronous function is triggered by a form submission event. It prevents the default form submission behavior,
 * hides the "Load more" button, fetches a complete list of Pokémon from the PokéAPI, and filters the list based on the
 * user's input. The filtered Pokémon list is then rendered on the webpage.
 * 
 * @async
 * @function filterPokemon
 * @param {Event} event - The form submission event.
 */

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

/**
 * Renders the filtered Pokémon cards on the webpage.
 * 
 * This function clears the content element and generates a new set of Pokémon cards based on the filtered list of Pokémon.
 * It then calls renderFilteredPokemonInfo() to fetch and render the Pokémon data for the newly rendered cards.
 */
function renderFilteredPokemon() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";
    for (let index = 0; index < filteredPokemon.length; index++) {
        contentRef.innerHTML += filteredPokeCardTemplate(index);
    }
    renderFilteredPokemonInfo()
}

/**
 * Fetches and renders the Pokémon data for the filtered Pokémon cards.
 * 
 * This asynchronous function loops through the filtered list of Pokémon and fetches the data for each Pokémon from the
 * PokéAPI. The fetched data is then rendered on the webpage using the renderFiltered() function. Finally, it calls
 * toggleScroll() to toggle the visibility of the "Load more" button.
 * 
 * @async
 * @function renderFilteredPokemonInfo
 */
async function renderFilteredPokemonInfo() {
    let pokeCardRef = document.getElementsByClassName("poke-card");
    for (let i = 0; i < filteredPokemon.length; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${filteredPokemon[i].name}/`);   
        renderFiltered(i)
    }
    toggleScroll()
}

/**
 * Renders a filtered Pokémon card with ID, sprite, and types on the webpage.
 * 
 * This function takes an index as an argument and uses it to determine which
 * .pokemon-id, .pokemon-sprite, and .short-info elements to update with the
 * corresponding data. It also adds a class to the .poke-card element to
 * style it based on the first type of the Pokémon.
 * 
 * @param {number} i The index of the Pokémon to render.
 */

function renderFiltered(i) {
    pokemonIdRef[i + offset].innerHTML += pokemonIdTemplate(data);
    spriteRef[i + offset].innerHTML += pokemonSpriteTemplate(data);
    pokeCardRef[i + offset].classList.add(`bg-${data.types[0].type.name}`);
    for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
        shortInfoRef[i + offset].innerHTML += pokemonTypeTemplate(typeIndex);
    }
}