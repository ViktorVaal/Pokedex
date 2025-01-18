function filteredPokeCardTemplate(index) {
    return `<div onclick="openOverlayPokemonCard(${filteredPokemon[index].url.split('/').filter(Boolean).pop() - 1})" class="poke-card">
            <div class="short-info">
                <h3 class="pokemon-name">${filteredPokemon[index].name[0].toUpperCase() + filteredPokemon[index].name.slice(1)}</h3>
            </div>
            <div class="pokemon-id"></div>
            
        </div>`
}