const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');
const newPokemon = document.querySelector('#pokemon-form');
const labelForm = document.querySelector('#trainer-name');
let currentPokemon = null; //presents id for clarity
let currentTrainer = null;
let trainerElement = null;

document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded');
    loadAllTrainers();
    //newPokemon.addEventListener('submit',addPokemon);
    //form wasn't needed. db handles any post requests and returns random pokemon
})

function addPokemon(){
 
    fetch(`http://localhost:3000/pokemons/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            trainer_id: currentTrainer.id
            // pokemons: {
            //     nickname: nickname,
            //     species: species,
            //     trainer_id: currentTrainer.id
            // }
          })
    })
     .then(resp => resp.json())
     .then(data => addPokemonToList(data));
}

function release(){
    fetch(`http://localhost:3000//pokemons/${currentPokemon}`,{
        method: "DELETE"
    })
    pokemonElement.remove();
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    //loadAllTrainers();
}

function loadAllTrainers(){
    main.innerHTML = "";
    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(trainer => {
            createElements(trainer);
        })   
    })
}

function createElements(trainer){
    
        let div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('data-id', trainer.id);
        let p = document.createElement('p');
        p.innerText = trainer.name;
        let button = document.createElement('button');
        button.setAttribute("data-trainer-id",trainer.id)
        button.innerText = 'Add Pokemon';
        button.addEventListener('click',function(e){
            
            currentTrainer = trainer;
            trainerElement = ul
            if(trainerElement.childNodes.length < 6){
                addPokemon();
            }
            else{
                // alert.preventDefault();
                alert('TOOOOOO MUCHH POKE')
            }
            //console.log(trainerElement.childNodes.length);
    
        });
        let ul = document.createElement('ul');
        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement('li');
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            let pokemonButton = document.createElement('button');
            pokemonButton.innerText = "Release";
            pokemonButton.className = "release";
            pokemonButton.setAttribute('data-pokemon-id',pokemon.id);
            pokemonButton.addEventListener('click',function(){
                //stored in global scope
                currentPokemon = pokemon.id
                //call delete method
                pokemonElement = li;
                release();

            })
            li.appendChild(pokemonButton);
            ul.appendChild(li);
        })
        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
        //console.log(trainer.pokemons);
}

function addPokemonToList(pokemon){
    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = "Release";
    pokemonButton.className = "release";
    pokemonButton.setAttribute('data-pokemon-id',pokemon.id);
    pokemonButton.addEventListener('click',function(){
                //stored in global scope
                
        currentPokemon = pokemon.id
                //call delete method
        trainerElement = li;
        console.log(trainerElement);
        release();
        })
    li.appendChild(pokemonButton);
    trainerElement.appendChild(li);
}