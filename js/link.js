import database from './films.js';

window.addEventListener('load', load)

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
        overview
    } = consulta

    const STAR_FULL = 'fas fa-star'
    const STAR_EMPTY = 'far fa-star'
    const URL_BASE = 'http://image.tmdb.org/t/p/w185/'
    const maxVoteValue = 5
    const COUNT_STARS = vote_average / 2

    let insert = document.querySelector('#detail-container')

    function starsCalc () {
        let htmlContain = ''
        for (let i = 0; i < maxVoteValue; i++) {
            i < COUNT_STARS ? htmlContain += `<i class="${STAR_FULL}"></i>` : htmlContain += `<i class="${STAR_EMPTY}"></i>`
        }
        return htmlContain
    }

insert.innerHTML = `<div>
<div class="titleDetail" title="Valoración del público ${vote_average}
${vote_count} votos.">
<h1>${title}</h1><div class="voteContain">${starsCalc()}</div>
<div><i class="fas fa-user"></i><small>${vote_count}</small></div></div>
<img src="${URL_BASE}${poster_path}"></img>
</div>
<div>
<p>${overview}</p>    
</div>
`
}