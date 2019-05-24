window.addEventListener('load', load)

const URL_BASE = 'http://image.tmdb.org/t/p/w185/'

let pelicula = []
let arr_favs = []
let arrStars = ''
let position = 0
let checkFav

async function load() {
    const API_URL = 'https://api.themoviedb.org/3/';
    const API_PREFIX = 'movie/'
    const API_KEY = '?api_key=8a91f689a2a058d84eef64d25fa79756';
    const API_POST = '&language=es-ES'

    let url = new URL(window.location.href)
    let filmID = url.searchParams.get('pelicula').valueOf()

    arr_favs.push(localStorage.getItem('favoritos'))

    let generate = await axios.get(API_URL + API_PREFIX + filmID + API_KEY + API_POST)
    pelicula = generate.data
    showContent(pelicula)
}

function showContent(item) {
    let {
        release_date,
        vote_count,
        id,
        title,
        poster_path,
        vote_average,
        overview,
        backdrop_path
    } = item

    const STAR_FULL = 'fas fa-star'
    const STAR_EMPTY = 'far fa-star'
    const STAR_HALF = 'fas fa-star-half'
    const maxVoteValue = 5
    const COUNT_STARS = vote_average / 2

    const URL_BASE = 'http://image.tmdb.org/t/p/w185/'
    const IMG_PATH_BACKGROUND = 'http://image.tmdb.org/t/p/w1280/'

    let insert = document.querySelector('#detailContainer')
    insert.innerHTML =
        `<div> 
            <a href="index.html" class="closeWindow">X</a>    
            <div class="titleDetail">
            <h1>${title}</h1>
            <div class="voteContain"><div title="Nota media: ${vote_average}">${starsCalc()}</div>
            <div><i class="fas fa-user"></i><small>${vote_count}</small></div>
            <i id="favClick" class="${readFav()}"></i>
            </div>
            </div>
            </div>
            <div class="picsContainer">
            <img class="posterImg" src="${URL_BASE}${poster_path}"></img>
            <img class="bckgrImg" src="${IMG_PATH_BACKGROUND + backdrop_path}">
            <p>${overview}</p>
            </div>`

    readFav()
    let FAV_CLICK = document.querySelector('#favClick')
    FAV_CLICK.addEventListener('click', createFav)

    function createFav() {
        let arr_favs = JSON.parse(localStorage.getItem(`favoritos`))

        if (!arr_favs) {
            FAV_CLICK.className = 'fas fa-heart'

            let newArr = []
            newArr.push(id)
            localStorage.setItem('favoritos', JSON.stringify(newArr))

        } else {

            let proof = arr_favs.find(item => item === id)

            if (proof === undefined) {
                FAV_CLICK.className = 'fas fa-heart'

                arr_favs.push(id)
                console.log(arr_favs, 'ANTES')
                localStorage.setItem('favoritos', JSON.stringify(arr_favs))
                arr_favs.push(id)
                console.log(arr_favs, 'DESPUÉS')
            } else if (typeof proof === 'number') {
                for (let i = 0; i < arr_favs.length; i++) {
                    if (arr_favs[i] === id) {
                        arr_favs.splice(i, 1)
                    }
                }

                localStorage.setItem('favoritos', JSON.stringify(arr_favs))
            }

            FAV_CLICK.className = 'far fa-heart'
        }
    }

    function readFav() {
        let arr_favs = localStorage.getItem(`favoritos`)
        if (!arr_favs) {
            arr_favs = JSON.parse(arr_favs)
            let response = arr_favs === id ? 'fas fa-heart' : 'far fa-heart'
            return response
        } else {
            return 'far fa-heart'
        }
    }

    function starsCalc() {
        let htmlContain = ''
        for (let i = 0; i < maxVoteValue; i++) {
            i < COUNT_STARS ? htmlContain += `<i class="${STAR_FULL}"></i>` : htmlContain += `<i class="${STAR_EMPTY}"></i>`
        }
        return htmlContain
    }
}