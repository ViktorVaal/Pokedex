function overlayPokemonCardTemplate(index) {
    return ` <div id="changePokemon">
                    <img onclick="prevPokemon(${index})" src="./assets/img/arrow_back.png" alt="">
                    <h3>${overlayData.forms[0].name[0].toUpperCase() + overlayData.forms[0].name.slice(1)}</h3>
                    <img onclick="nextPokemon(${index})" src="./assets/img/arrow_forward.png" alt="">
                </div>
                
                <div id="typeAndId">
                    <div id="type">
                    </div>
                    <div id="overlayId">
                    </div>
                </div>
                <div id="overlaySprite">
                    <img id="audio" onclick="playAudio()" src="./assets/img/play_circle.png" alt="">
                    <img src="${overlayData.sprites.other["official-artwork"].front_default}" alt="">
                </div>`
}

function overlayPokemonIdTemplate(id) {
        return `<span class="id">#${id}</span>`
}

function aboutInfoTemplate() {
    return `<table>
                    <tr class="about-table-row">
                        <td class="td-left">Height</td>
                        <td>: ${overlayData.height / 10} m</td>
                    </tr>
                    <tr>
                        <td class="td-left">Weight</td>
                        <td>: ${overlayData.weight / 10} kg</td>
                    </tr>
                    <tr>
                        <td class="td-left">Egg Group</td>
                        <td id="eggGroup">: </td>
                    </tr>
                    <tr>
                        <td class="td-left">Base experience</td>
                        <td>: ${overlayData.base_experience}</td>
                    </tr>
                </table>
                <h3>Abilities:</h3>
                <span id="pokemonAbilities"></span>`
}

function baseStatTemplate(index) {
    return `<tr>
                <td class="base_stat-td-left">${statNames[index]}</td>
                <td class="base_stat-td-middle">${overlayData.stats[index].base_stat}</td>
                <td class="base_stat-td-right">
                    <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div id="progressBar${index}" class="progress-bar" style="width: ${overlayData.stats[index].base_stat}%"></div>
                    </div>
                </td>
            </tr>`
}