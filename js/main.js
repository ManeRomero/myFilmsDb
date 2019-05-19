import database from './films.js';

const URL = 'http://image.tmdb.org/t/p/w185/'
const STAR_FULL = 'fas fa-star'
const STAR_EMPTY = 'far fa-star'

const BTN_SORT_RELEASE = document.querySelector('#sortRelease')
BTN_SORT_RELEASE.addEventListener('click', sortByRelease)

const BTN_SORT_POPULARITY = document.querySelector('#sortPopularity')
BTN_SORT_POPULARITY.addEventListener('click', sortByPopularity)

const BTN_SORT_TITLE = document.querySelector('#sortTitle', sortByTitle)
BTN_SORT_TITLE.addEventListener('click', sortByTitle)

window.addEventListener('load', () => {
    showContent(database)
    const BTN_CATCH = document.querySelector('#searchBtn')
    BTN_CATCH.addEventListener('click', goSearch)
})

function showContent(givenData) {
    const CONTAINER = document.querySelector('#indexContainer')
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
            `<a href="/detail.html?pelicula=${id}">
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
            i < COUNT_STARS ? icon.innerHTML = `<i class="${STAR_FULL}"></i>` : icon.innerHTML = `<i class="${STAR_EMPTY}"></i>`
            rateContainer.appendChild(icon)
        }

        card.appendChild(rateContainer)
        CONTAINER.appendChild(card)
    }
}

function goSearch() {
    let searchValue = document.querySelector('#searchInput').value.toLowerCase()

    if (searchValue.length < 2) {
        document.querySelector('#searchInput').value = ''
        return console.error('Introduce mas caracteres para buscar.')
    }

    let newList = database.filter(item => item.title.toLowerCase().includes(searchValue))
    showContent(newList)
}

function sortByRelease() {
    const checkClass = BTN_SORT_RELEASE.classList.value
    database.forEach(item => {
        let calculate = ''
        let date = item.release_date
        for (let i = 0; i < date.length; i++) {
            if (!date[i].includes('-')) {
                calculate += date[i]
            }
        }
        item.dateToCalc = calculate
    })

    let result = database.sort((a, b) => {
        if (checkClass === 'release1') {
            BTN_SORT_RELEASE.className = 'release2'
            return b.dateToCalc - a.dateToCalc
        } else if (checkClass === 'release2') {
            BTN_SORT_RELEASE.className = 'release1'
            return a.dateToCalc - b.dateToCalc
        }
    })

    showContent(result)
}

function sortByPopularity() {
    const checkClass = BTN_SORT_POPULARITY.classList.value
    let result = database.sort((a, b) => {
        if (checkClass == 'popular1') {
            BTN_SORT_POPULARITY.className = 'popular2'
            return b.vote_average - a.vote_average
        } else if (checkClass == 'popular2') {
            BTN_SORT_POPULARITY.className = 'popular1'
            return a.vote_average - b.vote_average
        }
    })
    showContent(result)
}

function sortByTitle() {
    const checkClass = BTN_SORT_TITLE.classList.value
    console.log(checkClass)

    const refer = ' -0-1-2-3-4-5-6-7-8-9-A-Á-À-B-C-D-E-É-È-F-G-H-I-Í-Ì-J-K-L-M-N-O-Ó-Ò-P-Q-R-S-T-U-Ú-Ù-V-W-X-Y-Z-:-!'
    const reflex = refer.split('-')

    database.forEach(item => { //-> RECORRE LOS TÍTULOS, ASIGNANDO UNA POSICIÓN EN arr CARACTERES
        let charSort = []
        let title = item.title
        for (let i = 0; i < title.length; i++) {
            const give = title[i].toUpperCase()
            let rank = reflex.indexOf(give)
            charSort.push(rank)
            item.titleRanker = charSort
        }
    })

    database.sort((a, b) => { //-> COMPARA LOS ARRAYS DE CLASIFICACIÓN ALFABÉTICA
        let item1 = a.titleRanker
        let item2 = b.titleRanker

        if (checkClass == 'title1') {
            BTN_SORT_TITLE.className = 'title2'
            if (item1 < item2) {
                return -1
            }
            if (item1 > item2) {
                return 1
            }
            return 0
        }
        
        if (checkClass == 'title2') {
            BTN_SORT_TITLE.className = 'title1'
            if (item1 < item2) {
                return 1
            }
            if (item1 > item2) {
                return -1
            }
            return 0
        }
    })

    showContent(database)
}