import database from './films.js';

window.addEventListener('load', load)
const BTN_CATCH = document.querySelector('#searchBtn')
BTN_CATCH.addEventListener('click', goSearch)

function load() {
    let url = new URL(window.location.href)
    let result = url.searchParams.get('pelicula').valueOf()
    let consulta = database.find(item => result == item.id)

    let {
        release_date,
        vote_count,
        id,
        title,
        poster_path,
        vote_average,
        overview,
        backdrop_path
    } = consulta

    const STAR_FULL = 'fas fa-star'
    const STAR_EMPTY = 'far fa-star'
    const URL_BASE = 'http://image.tmdb.org/t/p/w185/'
    const IMG_PATH_BACKGROUND = 'http://image.tmdb.org/t/p/w1280/' 
    const maxVoteValue = 5
    const COUNT_STARS = vote_average / 2

    let insert = document.querySelector('#detailContainer')

    function starsCalc() {
        let htmlContain = ''
        for (let i = 0; i < maxVoteValue; i++) {
            i < COUNT_STARS ? htmlContain += `<i class="${STAR_FULL}"></i>` : htmlContain += `<i class="${STAR_EMPTY}"></i>`
        }
        return htmlContain
    }

    insert.innerHTML = `<div>
<div class="titleDetail" title="Valoración del público ${vote_average}
${vote_count} votos.">
<h1>${title}</h1>
<div class="voteContain"><div>${starsCalc()}</div>
<div><i class="fas fa-user"></i><small>${vote_count}</small></div>
</div>
</div>
<div class="picsContainer">
<img class="posterImg" src="${URL_BASE}${poster_path}"></img>
<img class="bckgrImg" src="${IMG_PATH_BACKGROUND + backdrop_path}">
<p>${overview}</p>
</div>
</div>
<div>
<a href="index.html" class="closeWindow"></a>   
</div>
`
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

function showContent(givenData) {
    const CONTAINER = document.querySelector('#detailContainer')
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