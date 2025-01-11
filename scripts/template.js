function pokeCardTemplate(index) {
    return `<div class="poke-card">
            <div class="short-info">
                <h3>${data.results[index].name[0].toUpperCase() + data.results[index].name.slice(1)}</h3>
            </div>
            <div class="pokemon-id"></div>
            
        </div>`
}

function pokemonTypeTemplate(index) {
    return `<span class="type bg-${data.types[index].type.name}-type">${data.types[index].type.name[0].toUpperCase() + 
                                 data.types[index].type.name.slice(1)}</span>` 
}

function pokemonIdTemplate(data) {
    if (data.id < 10) {
         return `<span class="id">#00${data.id}</span>`
    }else if (data.id >=10 && data.id < 100) {
        return `<span class="id">#00#0${data.id}</span>`
    }else {
        return `<span class="id">#00#${data.id}</span>`
    }
}

function pokemonSpriteTemplate(data) {
    return `<img class="pokemon-sprite" src="${data.sprites.other["official-artwork"].front_default}" alt="">`
}