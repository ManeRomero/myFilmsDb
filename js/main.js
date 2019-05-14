import database from './films.js';

window.addEventListener('load', () => {
    const URL = 'http://image.tmdb.org/t/p/w185/'
    let container = document.querySelector('section')

    for (let film of database) {
        let {release_date, title, poster_path, vote_average} = film

        let countStars = vote_average / 2
        let maxVoteValue = 5

        let card = document.createElement('div')
        let date = document.createElement('small')
        let pic = document.createElement('img')
        let titleCard = document.createElement('h1')
        let rateContainer = document.createElement('div')
        let divBottom = document.createElement('div')

        divBottom.className = 'divBottom'
        card.className = 'card'
        rateContainer.className = 'voteContain'


        date.innerText = release_date
        titleCard.innerText = title
        pic.setAttribute('src', URL + poster_path)
        rateContainer.setAttribute('title', `Valoración del público: ${vote_average}`)


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

    divBottom.appendChild(titleCard)
    divBottom.appendChild(rateContainer)

    card.appendChild(date)
    card.appendChild(pic)
    card.appendChild(divBottom)    
    container.appendChild(card)
    }
})