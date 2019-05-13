import database from './films.js';

window.addEventListener('load', () => {
    const URL = 'http://image.tmdb.org/t/p/w185/'
let container = document.querySelector('section')

for (let film of database) {
    let card = document.createElement('div')
    let date = document.createElement('small')
    let pic = document.createElement('img')
    let title = document.createElement('h1')
    let rateContainer = document.createElement('div')
    let countStars = film.vote_average / 2
    let maxVoteValue = 5
    let divBottom = document.createElement('div')
    divBottom.className = 'divBottom'
    card.className = 'card'
    rateContainer.className = 'voteContain'
    date.innerText = film.release_date
    title.innerText = film.title
    pic.setAttribute('src', URL + film.poster_path)
    rateContainer.setAttribute('title', `Valoración del público: ${film.vote_average}`)


    for (let i = 0; i < maxVoteValue; i++) {
        if (i < countStars) {
            let icon = document.createElement('i')
            icon.className = 'fas fa-star'
            rateContainer.appendChild(icon)
        } else {
            let icon = document.createElement('i')
            icon.className = 'far fa-star'
            rateContainer.appendChild(icon)
        }
    }

    divBottom.appendChild(title)
    divBottom.appendChild(rateContainer)

    card.appendChild(date)
    card.appendChild(pic)
    card.appendChild(divBottom)    
    container.appendChild(card)
}
})