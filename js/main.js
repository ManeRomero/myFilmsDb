import database from './films.js';

const URL = 'http://image.tmdb.org/t/p/w185/'
let container = document.querySelector('section')

for (let film of database) {
    let card = document.createElement('div')
    let date = document.createElement('small')
    let pic = document.createElement('img')
    let title = document.createElement('h1')
    let rating = document.createElement('small')

    card.className = 'card'
    date.innerText = film.release_date
    title.innerText = film.title
    rating.innerText = film.vote_average
    pic.setAttribute('src', URL + film.poster_path)


    card.appendChild(date)
    card.appendChild(pic)
    card.appendChild(title)
    card.appendChild(rating)
    
    container.appendChild(card)
}







console.log('AL PARECER, ESTA MOVIDA ENTRA! \n', database)