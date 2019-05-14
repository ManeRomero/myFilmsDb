import database from './films.js';

const CONTAINER = document.querySelector('section')
const BTN_CATCH = document.querySelector('#searchBtn')
const URL = 'http://image.tmdb.org/t/p/w185/'
const STAR_FULL = 'fas fa-star'
const STAR_EMPTY = 'far fa-star'

window.addEventListener('load', () => {
    showContent(database)
})

BTN_CATCH.addEventListener('click', goSearch)

function showContent(givenData) {
    CONTAINER.innerHTML = ''
    for (let film of givenData) {
        let {
            release_date,
            id,
            title,
            poster_path,
            vote_average,
            overview
        } = film

        const COUNT_STARS = vote_average / 2
        let maxVoteValue = 5

        let card = document.createElement('div')
        card.innerHTML = `<small>${release_date}</small>
        <img src="${URL + poster_path}"</img>
        <div class="divBottom"><h1>${title}</h1>
        `
        card.id = `${'card_' + id}`
        card.setAttribute('title', `${title} \n${release_date}\n\nValoración del público: ${vote_average}\n\n(Click para ver Sinopsis)`)

        let rateContainer = document.createElement('div')
        let divBottom = document.createElement('div')
        let descriptionText = document.createElement('small')

        divBottom.className = 'divBottom'
        card.className = 'card'
        rateContainer.className = 'voteContain'
        descriptionText.className = 'description'
        
        descriptionText.innerText = overview
        
        for (let i = 0; i < maxVoteValue; i++) {
            let icon = document.createElement('i')
            i < COUNT_STARS ? icon.innerHTML=`<i class="${STAR_FULL}"></i>` : icon.innerHTML=`<i class="${STAR_EMPTY}"></i>`
            rateContainer.appendChild(icon)
        }
        
        divBottom.appendChild(rateContainer)
        card.appendChild(divBottom)
        card.appendChild(descriptionText)
        CONTAINER.appendChild(card)

    }
    const BTN_DESCRIPTION = document.querySelectorAll('#card')
    console.log(BTN_DESCRIPTION)
}

function goSearch() {
    let searchValue = document.querySelector('#searchInput').value
    console.log(searchValue)

    if (searchValue.length < 2) {
        document.querySelector('#searchInput').value = ''
        return console.log('Introduce mas caracteres para buscar.')
    }

    let newList = database.filter(item => item.title.includes(searchValue))
    showContent(newList)
}


function showDescription() {
    alert('FUNCIONA!!', event.currentTarget.id)
}