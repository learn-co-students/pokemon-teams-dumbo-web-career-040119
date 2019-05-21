document.addEventListener("DOMContentLoaded", () => {

  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`

// FETCHING TRAINERS - GET

  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => trainers.forEach(slapItOnTheMain))

// FETCHING POKEMONS - GET

  function getPokemons(trainer) {
    return trainer.pokemons.map(pokemon =>
      `<li data-pokemon-id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`).join("")
  }

  // UPDATING THE DOM

  function slapItOnTheMain(trainer){

    const {name, id, pokemons} = trainer

    const trainerDiv = document.createElement('div');
    const buttonAdd = document.createElement('button');

    document.querySelector('main').appendChild(trainerDiv);
    trainerDiv.className = ('card');
    trainerDiv.dataset.id = id;
    trainerDiv.innerHTML = `<p>${name}</p>`;

    buttonAdd.innerHTML += `Add Pokemon`
    buttonAdd.className = ('btn-add')
    buttonAdd.dataset.trainerId = id;
    trainerDiv.appendChild(buttonAdd);

    trainerDiv.innerHTML += `<br> <ul id="trainer-${id}">${getPokemons(trainer)}</ul>`

    let btn = trainerDiv.querySelector('.btn-add')
    btn.addEventListener('click', () => {
      addIt(event, trainer)
    });

    const buttonsRelease = trainerDiv.querySelectorAll('.release').forEach(b => b.addEventListener('click', () =>{
      releaseIt(event.target.dataset.pokemonId, event.target.parentNode)
    }))
  }

  // RELEASING POKEMONS - DELETE

  function releaseIt (pokeid, li) {

    return  fetch(`${POKEMONS_URL}/${pokeid}`, {
      method: "DELETE" })
    .then(response => response.json())
    .then(() => {
      li.remove();
    })
  }

  // ADDING POKEMONS - POST

  function addIt(event, trainer){
    return fetch(`${POKEMONS_URL}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'},
      body: JSON.stringify({'pokemon': {"trainer_id": trainer.id}})
    })
    .then(res => res.json())
    .then(pokemon => {
      const newLi = document.createElement('li')
      newLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
      const parentUl = document.getElementById(`trainer-${pokemon.trainer_id}`)
      parentUl.appendChild(newLi)
    })
  }

})
