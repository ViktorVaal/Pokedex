let statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
let audio;

async function openOverlayPokemonCard(index) {
    let overlay = document.getElementById("overlayContainer");
    overlay.classList.remove("d-none");
    let bodyRef = document.getElementById("body");
    bodyRef.classList.add("overflow-hidden");
    try {
        overlayData = await getData(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`);
        renderOverlayPokemonCard(index);
    } catch (error) {
        console.error(error);   
    }
}

function renderOverlayInfo(index) {
    renderOverleyType();
    renderOverlayId();
    renderPokemonInfosAbout(index);
    renderBaseStats()
    renderEvoChain(index);
    renderMoves();
}

function renderOverlayPokemonCard(index) {
    audio = new Audio(overlayData.cries.latest);
    document.getElementById("overlayPokemonCard").classList.add(`bg-${overlayData.types[0].type.name}`);
    let overlayShortInfoRef = document.getElementById("overlayShortInfo");
    overlayShortInfoRef.innerHTML = overlayPokemonCardTemplate(index);
    renderOverlayInfo(index)
}

function playAudio() {
    audio.play();
}

function renderOverleyType() {
    let overlayTypeRef = document.getElementById("type");
    for (let i = 0; i < overlayData.types.length; i++) {
        overlayTypeRef.innerHTML += overlayPokemonTypeTemplate(i);
    }

}

function renderOverlayId() {
    let overlayIdRef = document.getElementById("overlayId");
    let id = overlayData.id.toString();
    id = id.padStart(3,"0");
    overlayIdRef.innerHTML = overlayPokemonIdTemplate(id);
}

function closeOverlay() {
    let overlay = document.getElementById("overlayContainer");
    if (event.target == overlay) {
        document.getElementById("overlayPokemonCard").classList.remove(`bg-${overlayData.types[0].type.name}`);
        overlay.classList.add("d-none");
        let bodyRef = document.getElementById("body");
        bodyRef.classList.remove("overflow-hidden");
        moveInfoNavbar(0);
    }
   
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
    let firstEvolutionRef = document.getElementById("firstEvolution");
    let evoChainRef = document.querySelectorAll(".evoChain");
    evoChainRef.forEach(div => {
        div.innerHTML = "";
      });
    firstEvolutionRef.innerHTML += evolutionChainTemplate(evoPokemon);
    if (evoChain.chain.evolves_to.length > 0) {
        rendersecondEvolution() 
    }
}

async function rendersecondEvolution() {
    let secondEvolutionRef = document.getElementById("secondEvolution");
    if (evoChain.chain.evolves_to.length == 1) {
        evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].species.name}/`);
        secondEvolutionRef.innerHTML += evolutionChainTemplate(evoPokemon);
     }else {
        for (let index = 0; index < evoChain.chain.evolves_to.length; index++) {
            evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[index].species.name}/`);
            secondEvolutionRef.innerHTML += evolutionChainTemplate(evoPokemon); 
        }
     }
    renderThirdEvolution();
}

async function renderThirdEvolution() {
    let thirdEvolutionRef = document.getElementById("thirdEvolution");
    if (evoChain.chain.evolves_to[0].evolves_to.length == 1) {
        evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}/`);
        thirdEvolutionRef.innerHTML += evolutionChainTemplate(evoPokemon);
    }else {
        for (let index = 0; index < evoChain.chain.evolves_to[0].evolves_to.length; index++) {
            evoPokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${evoChain.chain.evolves_to[0].evolves_to[index].species.name}/`);
        thirdEvolutionRef.innerHTML += evolutionChainTemplate(evoPokemon);   
        }
    }
}

function renderMoves() {
    let movesRef = document.getElementById("movesInfo");
    for (let i = 0; i < overlayData.moves.length; i++) {
        movesRef.innerHTML += `<span>- ${overlayData.moves[i].move.name[0].toUpperCase() + overlayData.moves[i].move.name.slice(1)}</span>`
    }
}

function nextPokemon(index) {
    index++;
    if (index == 1025) {
        index = 0;
    }
    document.getElementById("overlayPokemonCard").classList.remove(`bg-${overlayData.types[0].type.name}`);
    document.getElementById("overlayContainer").classList.add("d-none")
    moveInfoNavbar(0);
    openOverlayPokemonCard(index);
}

function prevPokemon(index) {
    index--;
    if (index < 0) {
        index = 1024;
    }
    document.getElementById("overlayPokemonCard").classList.remove(`bg-${overlayData.types[0].type.name}`);
    document.getElementById("overlayContainer").classList.add("d-none")
    moveInfoNavbar(0);
    openOverlayPokemonCard(index);
}