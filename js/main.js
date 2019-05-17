import database from './films.js';

const CONTAINER = document.querySelector('#index-container')
const URL = 'http://image.tmdb.org/t/p/w185/'
const STAR_FULL = 'fas fa-star'
const STAR_EMPTY = 'far fa-star'
const BTN_CATCH = document.querySelector('#searchBtn')
BTN_CATCH.addEventListener('click', goSearch)

window.addEventListener('load', () => {
    showContent(database)
})

function showContent(givenData) {
    CONTAINER.innerHTML = ''
    for (let film of givenData) {
        let {
            release_date,
            vote_count,
            id,
            title,
            poster_path,
            vote_average,
            overview
        } = film

        const COUNT_STARS = vote_average / 2
        let maxVoteValue = 5
        let card = document.createElement('div')
        card.setAttribute('title', `${title} \n${release_date}\n\nValoración del público: ${vote_average}\nNúmero de Votos: ${vote_count}\n\n(Click para ver Sinopsis)`)
        card.setAttribute('data', `${id}`)

        card.innerHTML = 
        `<a href="/detail.html?pelicula=${id}" target="_blank">
        <img src="${URL + poster_path}"</img>
        <div class="divBottom"><h1>${title}</h1></div>
        <i class="fas fa-user"></i><small>${vote_count}</small><a/>`

        let rateContainer = document.createElement('div')
        let descriptionText = document.createElement('small')

        card.className = 'card'
        rateContainer.className = 'voteContain'
        descriptionText.className = 'description'        
        descriptionText.innerText = overview
        
        for (let i = 0; i < maxVoteValue; i++) {
            let icon = document.createElement('i')
            i < COUNT_STARS ? icon.innerHTML=`<i class="${STAR_FULL}"></i>` : icon.innerHTML=`<i class="${STAR_EMPTY}"></i>`
            rateContainer.appendChild(icon)
        }
        
        card.appendChild(rateContainer)
        CONTAINER.appendChild(card)        
    }
}

function goSearch() {
    let searchValue = document.querySelector('#searchInput').value
    console.log(searchValue)

    if (searchValue.length < 2) {
        document.querySelector('#searchInput').value = ''
        return console.log('Introduce mas caracteres para buscar.')
    }

    let newList = database.filter(item => item.title.toLowerCase().includes(searchValue))
    showContent(newList)
}