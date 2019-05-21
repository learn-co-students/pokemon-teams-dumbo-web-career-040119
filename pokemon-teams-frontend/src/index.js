const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector('main');


function getTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(addTrainerToDom))
}


function addTrainerToDom(trainer) {
  const {id, name, pokemons} = trainer
  const card = document.createElement('div');
  card.className = 'card';

  const p = document.createElement('p');
  p.innerText = name;
  card.appendChild(p);

  const btnAdd = document.createElement('button');
  btnAdd.innerText = 'Add Pokemon';
  btnAdd.dataset.trainerId = id;
  card.appendChild(btnAdd);

  btnAdd.addEventListener('click', (event) => {addTrainerPokemon(event, card)});

  listPokemon(trainer, card);
  main.append(card);
}


function listPokemon(trainer, card) {
  const pokemons = trainer.pokemons
  pokemons.forEach((pokemon) => {addPokemonToList(pokemon, card)});
};


function addPokemonToList(pokemon, card) {
  const li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;

  const btnRelease = document.createElement('button');
  btnRelease.className = 'release';
  btnRelease.innerText = 'Release';
  btnRelease.dataset.pokemonId = pokemon.id;

  btnRelease.addEventListener('click', releasePokemon);

  li.appendChild(btnRelease);

  card.appendChild(li);
};


function addTrainerPokemon(event, card) {
  trainerId = event.target.dataset.trainerId
  pokemonCount = card.querySelectorAll('li').length

  if (pokemonCount < 6) {
    fetch(`${POKEMONS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({'pokemon': {'trainer_id': trainerId}})
    })
    .then(res => res.json())
    .then(pokemon => addPokemonToList(pokemon, card))
  }
  else {
    alert("Party is Full!")
  }
}


function releasePokemon(event) {
  const id = event.target.dataset.pokemonId;
  const li = event.target.parentElement;

  fetch(POKEMONS_URL + `/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(doc => li.remove())
};


document.addEventListener('DOMContentLoaded', () => {
  getTrainers()
})
