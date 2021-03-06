window.addEventListener('load', load)

const URL = 'http://image.tmdb.org/t/p/w185/'
const STAR_FULL = 'fas fa-star'
const STAR_EMPTY = 'far fa-star'

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '?api_key=8a91f689a2a058d84eef64d25fa79756';

const API_POPULAR_URL = 'movie/popular'
// const API_GENRE = 'genre/movie/list'

let longitud
let latitud

let peliculas = []
// let generos = []

const BTN_SORT_TITLE = document.querySelector('#sortTitle')
BTN_SORT_TITLE.addEventListener('click', sortByTitle)

const BTN_SORT_POPULARITY = document.querySelector('#sortPopularity')
BTN_SORT_POPULARITY.addEventListener('click', sortByPopularity)

const BTN_SORT_RELEASE = document.querySelector('#sortRelease')
BTN_SORT_RELEASE.addEventListener('click', sortByRelease)

const BTN_FAVS = document.querySelector('#sortFavs')
BTN_FAVS.addEventListener('click', myFavs)

const INPUT_SEARCH = document.querySelector('#searchInput')
INPUT_SEARCH.addEventListener('input', goSearch)

const BTN_GEO = document.querySelector('.btnGeo')
/* BTN_GEO.addEventListener('click', mapGeolocation) */


async function load() {

    let generate = await axios.get(API_URL + API_POPULAR_URL + API_KEY)
    let result = generate.data.results
    peliculas = result

    if ('geolocation' in navigator) {
        await navigator.geolocation.getCurrentPosition((respuesta) => {
            console.log('RESPUESTA', respuesta)
            longitud = respuesta.coords.longitude
            latitud = respuesta.coords.latitude
        })
    } else {
        console.log('NO HAY GEOLOCALIZACIÓN')
    }

    showContent(result)
}

function showContent(dataReceipt) {

    const CONTAINER = document.querySelector('#indexContainer')
    CONTAINER.innerHTML = ''

    for (let film of dataReceipt) {
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
            `<i class="${checkFav()}"></i>
            <a href="/detail.html?pelicula=${id}">
            <img src="${URL + poster_path}"</img>
            <div class="divBottom"><h1>${title}</h1></div>
            <i class="fas fa-user"></i><small>${vote_count}</small><a/>
            `

        let rateContainer = document.createElement('div')
        let descriptionText = document.createElement('small')
        card.className = 'card'
        rateContainer.className = 'voteContain'
        descriptionText.innerText = overview

        for (let i = 0; i < maxVoteValue; i++) {
            let icon = document.createElement('i')
            i < COUNT_STARS ? icon.innerHTML = `<i class="${STAR_FULL}"></i>` : icon.innerHTML = `<i class="${STAR_EMPTY}"></i>`
            rateContainer.appendChild(icon)
        }

        function checkFav() {
            let arr_favs = localStorage.getItem(`favoritos_${id}`)
            arr_favs = JSON.parse(arr_favs)
            // console.log(arr_favs, ' · ', id)
            return arr_favs == id ? 'fas fa-heart' : ''
        }

        card.appendChild(rateContainer)
        CONTAINER.appendChild(card)
    }
}

function goSearch() {
    let searchValue = document.querySelector('#searchInput').value.toLowerCase()
    let result = peliculas.filter(item => item.title.toLowerCase().includes(searchValue))
    showContent(result)
}

function sortByRelease() {
    const checkClass = BTN_SORT_RELEASE.classList.value
    peliculas.forEach(item => {
        let calculate = ''
        let date = item.release_date
        for (let i = 0; i < date.length; i++) {
            if (!date[i].includes('-')) {
                calculate += date[i]
            }
        }
        item.dateToCalc = calculate
    })

    let result = peliculas.sort((a, b) => {
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
    let result = peliculas.sort((a, b) => {
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

    const refer = ' -0-1-2-3-4-5-6-7-8-9-A-Á-À-B-C-D-E-É-È-F-G-H-I-Í-Ì-J-K-L-M-N-O-Ó-Ò-P-Q-R-S-T-U-Ú-Ù-V-W-X-Y-Z-:-!'
    const reflex = refer.split('-')

    peliculas.forEach(item => { //-> RECORRE LOS TÍTULOS, ASIGNANDO UNA POSICIÓN EN arr CARACTERES
        let charSort = []
        let title = item.title
        for (let i = 0; i < title.length; i++) {
            const give = title[i].toUpperCase()
            let rank = reflex.indexOf(give)
            charSort.push(rank)
            item.titleRanker = charSort
        }
    })

    peliculas.sort((a, b) => { //-> COMPARA LOS ARRAYS DE CLASIFICACIÓN ALFABÉTICA
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

    showContent(peliculas)
}

function myFavs() {
    let result = peliculas.filter((item) => {
        let check = localStorage.getItem(`favoritos_${item.id}`)
        check = JSON.parse(check)
        if (check == item.id) {
            return item
        }
    })
    showContent(result)
}

/* async function mapGeolocation() {
    console.log('LONG', longitud, 'LAT', latitud)
    let divMap = document.querySelector('#googleMap')
    let insertMap = new google.maps.Map(map, {
        center: {latitud, longitud},
        zoom: 8
    })

    const API_MAP_URL = 'https://maps.googleapis.com/maps/api/js?key='
    const API_MAP_KEY = 
    const API_MAP_SUFIX = ''

    let generate = await axios.get(API_URL + API_POPULAR_URL + API_KEY)
    <script src="YOUR_API_KEY"
    async defer></script>
} */