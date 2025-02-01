let bodyRef = document.getElementById("body");
let allPokemon = {};
let filteredPokemon = [];
let amount = 35;
let offset = 0;
let data = {};
let overlayData = {};
let spezies = {};
let weakness = {};
let evoChain = {};
let pokemonIdRef = document.getElementsByClassName("pokemon-id");
let shortInfoRef = document.getElementsByClassName("short-info");
let spriteRef = document.getElementsByClassName("pokemon-id");
let pokeCardRef = document.getElementsByClassName("poke-card");
function init() {
    renderPokeCard();
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

/**
 * Asynchronously fetches Pokémon data and renders Pokémon cards on the webpage.
 * 
 * This function retrieves a list of Pokémon from the PokéAPI based on the specified
 * limit and offset. It then updates the inner HTML of the content element with
 * Pokémon card templates and logs the fetched Pokémon data to the console.
 * 
 * @async
 * @function renderPokeCard
 * @returns {Promise<void>} A promise that resolves when the Pokémon data has been fetched and rendered.
 */
async function renderPokeCard() {
    allPokemon = {};
    allPokemon = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=${offset}`);
    let contentRef = document.getElementById("content");
    for (let index = 0; index < amount; index++) {
        contentRef.innerHTML += pokeCardTemplate(index);
    }
    toggleScroll();
    renderPokeminInfos();
}

/**
 * Asynchronously fetches Pokémon data and renders Pokémon IDs on the webpage.
 * 
 * This function retrieves the ID of each Pokémon from the PokéAPI and updates
 * the inner HTML of the corresponding .pokemon-id elements with a template
 * including the ID.
 * 
 * @async
 * @function renderPokemonId
 * @returns {Promise<void>} A promise that resolves when the IDs have been rendered.
 */
async function renderPokeminInfos() {
    for (let i = 0; i < allPokemon.results.length; i++) {
        data = await getData(`https://pokeapi.co/api/v2/pokemon/${i + offset + 1}/`);
            render(i);
    }
    toggleScroll()
}

/**
 * Renders a Pokémon card with ID, sprite, and types on the webpage.
 * 
 * This function takes an index as an argument and uses it to determine which
 * .pokemon-id, .pokemon-sprite, and .short-info elements to update with the
 * corresponding data. It also adds a class to the .poke-card element to
 * style it based on the first type of the Pokémon.
 * 
 * @param {number} i The index of the Pokémon to render.
 */
function render(i) {
    pokemonIdRef[i + offset].innerHTML += pokemonIdTemplate(data);
    spriteRef[i + offset].innerHTML += pokemonSpriteTemplate(data);
    pokeCardRef[i + offset].classList.add(`bg-${data.types[0].type.name}`);
    for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
        shortInfoRef[i + offset].innerHTML += pokemonTypeTemplate(typeIndex);
    }
}

/**
 * Loads the next set of Pokémon cards on the webpage.
 * 
 * This function increments the offset by the amount of Pokémon per page and
 * calls renderPokeCard() to fetch and render the next set of Pokémon cards.
 * It also disables the "Load more" button while the data is being fetched to
 * prevent multiple requests from being sent.
 * 
 * @async
 * @function loadMorePokemon
 * @returns {Promise<void>} A promise that resolves when the next set of Pokémon cards has been rendered.
 */
async function loadMorePokemon() {
    offset = offset + amount;
    let loadBtn = document.getElementById("loadMoreBtn");
    loadBtn.disabled = true;
    await renderPokeCard(); 
    loadBtn.disabled = false;
}

/**
 * Toggles the overflow-hidden class of the body element to prevent or allow
 * scrolling while the overlay is open.
 * 
 * @function toggleScroll
 */
function toggleScroll() {
    bodyRef.classList.toggle("overflow-hidden");
}

