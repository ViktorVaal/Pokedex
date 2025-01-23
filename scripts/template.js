function pokeCardTemplate(index) {
    return `<div onclick="openOverlayPokemonCard(${index + offset})" class="poke-card">
            <div class="short-info">
                <h3 class="pokemon-name">${allPokemon.results[index].name[0].toUpperCase() + allPokemon.results[index].name.slice(1)}</h3>
            </div>
            <div class="pokemon-id"></div>
            
        </div>`
}

function pokemonTypeTemplate(index) {
    return `<span class="type bg-${data.types[index].type.name}-type">${data.types[index].type.name[0].toUpperCase() +
        data.types[index].type.name.slice(1)}</span>`
}

function overlayPokemonTypeTemplate(index) {
    return `<span class="type bg-${overlayData.types[index].type.name}-type">${overlayData.types[index].type.name[0].toUpperCase() +
        overlayData.types[index].type.name.slice(1)}</span>`
}

function pokemonIdTemplate() {
    if (data.id < 10) {
        return `<span class="id">#00${data.id}</span>`
    } else if (data.id >= 10 && data.id < 100) {
        return `<span class="id">#0${data.id}</span>`
    } else {
        return `<span class="id">#${data.id}</span>`
    }
}

function pokemonSpriteTemplate() {
    return `<img class="pokemon-sprite" src="${data.sprites.other["official-artwork"].front_default}" alt="">`
}

function evolutionChainTemplate(evoPokemon) {
    return `<img class="pokemon-sprite" src="${evoPokemon.sprites.other["official-artwork"].front_default}" alt="">`
}



