window.addEventListener('load', load)

const URL_BASE = 'http://image.tmdb.org/t/p/w185/'
const STAR_FULL = 'fas fa-star'
const STAR_EMPTY = 'far fa-star'

const API_URL = 'https://api.themoviedb.org/3/';
const API_PREFIX = 'movie/'
const API_KEY = '?api_key=8a91f689a2a058d84eef64d25fa79756';
const API_POST = '&language=en-US'
let pelicula = []

function load() {
    let url = new URL(window.location.href)
    let filmID = url.searchParams.get('pelicula').valueOf()

    axios.get(API_URL + API_PREFIX + filmID + API_KEY + API_POST).then((res) => {
        pelicula = res.data
        showContent(pelicula)
    })
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

/* 
function print(filmsToPrint) {
    let consulta = filmsToPrint.find(item => result == item.id)

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


} */