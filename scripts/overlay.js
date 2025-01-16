let statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

async function openOverlayPokemonCard(index) {
    overlayData = await getData(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`);
    let overlay = document.getElementById("overlayContainer");
    overlay.classList.remove("d-none")
    renderOverlayPokemonCard(index);
}

function renderOverlayPokemonCard(index) {
    let audio = new Audio(overlayData.cries.latest);
    audio.play();
    document.getElementById("overlayPokemonCard").classList.add(`bg-${overlayData.types[0].type.name}`);
    let overlayShortInfoRef = document.getElementById("overlayShortInfo");
    overlayShortInfoRef.innerHTML = overlayPokemonCardTemplate(overlayData);
    renderOverleyType();
    renderOverlayId();
    renderPokemonInfosAbout(index);
    renderBaseStats()
    renderEvoChain(index);
}

function renderOverleyType() {
    let overlayTypeRef = document.getElementById("type");
    for (let i = 0; i < overlayData.types.length; i++) {
        overlayTypeRef.innerHTML += overlayPokemonTypeTemplate(i);
    }

}

function renderOverlayId() {
    let overlayIdRef = document.getElementById("overlayId");
    overlayIdRef.innerHTML = overlayPokemonIdTemplate();
}

function closeOverlay() {
    document.getElementById("overlayPokemonCard").classList.remove(`bg-${overlayData.types[0].type.name}`);
    document.getElementById("overlayContainer").classList.add("d-none")
    moveInfoNavbar(0);
}

function renderPokemonInfosAbout(index) {
    let abouInfoRef = document.getElementById("aboutInfo");
    abouInfoRef.innerHTML = aboutInfoTemplate();
    renderPokemonAbilities();
    renderPokemonEggGroup(index);
}

function renderPokemonAbilities() {
    let pokemonAbilitiesRef = document.getElementById("pokemonAbilities");
    for (let i = 0; i < overlayData.abilities.length; i++) {
        pokemonAbilitiesRef.innerHTML += `- ${overlayData.abilities[i].ability.name[0].toUpperCase() + overlayData.abilities[i].ability.name.slice(1)}<br><br>`
    }
}

async function renderPokemonEggGroup(index) {
    let eggGroupRef = document.getElementById("eggGroup");
    spezies = await getData(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}/`)
    eggGroupRef.innerHTML = `: ${spezies.egg_groups[0].name[0].toUpperCase() + spezies.egg_groups[0].name.slice(1)}`
}

function moveInfoNavbar(index) {
    let elements = document.querySelectorAll('.info');
    elements.forEach(element => {
        element.classList.remove('active');
      }); 
    elements[index].classList.add("active");
    schowInfoContainer(index);
} 

function schowInfoContainer(index) {
    let elements = document.querySelectorAll('.info-container');
    elements.forEach(element => {
        element.classList.add('d-none');
      }); 
    elements[index].classList.remove("d-none");
}

function renderBaseStats() {
    let baseStatsTableRef = document.getElementById("baseStatsTable");
    baseStatsTableRef.innerHTML = "";
    let progressBar;
    for (let index = 0; index < overlayData.stats.length; index++) {
        baseStatsTableRef.innerHTML += baseStatTemplate(index);
        progressBar = document.getElementById(`progressBar${index}`);
        if (overlayData.stats[index].base_stat < 50) {
            progressBar.classList.add("bg-fire");
        }else {
            progressBar.classList.add("bg-grass");
        }
    }
}

async function renderEvoChain(index) {
    spezies = await getData(`https://pokeapi.co/api/v2/pokemon-species/${index + 1}/`);
    evoChain = await getData(spezies.evolution_chain.url);
    let evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.species.name}/`);
    let evolutionInfoRef = document.getElementById("evolutionInfo");
    evolutionInfoRef.innerHTML = "";
    evolutionInfoRef.innerHTML += evolutionChainTemplate(evoPokemon);
    if (evoChain.chain.evolves_to.length == 1) {
        evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].species.name}/`);
        evolutionInfoRef.innerHTML += evolutionChainTemplate(evoPokemon);
        if (evoChain.chain.evolves_to[0].evolves_to.length == 1) {
            evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}/`);
            evolutionInfoRef.innerHTML += evolutionChainTemplate(evoPokemon);
        }
    }
}

