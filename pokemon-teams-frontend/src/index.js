const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');
const newPokemon = document.querySelector('#pokemon-form');
const labelForm = document.querySelector('#trainer-name');
//let currentTrainer = null;
let currentPokemon = null; //presents id for clarity


document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded');
    loadAllTrainers();
    //newPokemon.addEventListener('submit',addPokemon);
    //form wasn't needed. db handles any post requests and returns random pokemon
})

function addPokemon(trainer){
    //e.preventDefault();
    // let nickname = document.querySelector('#nickname').value;
    // let species = document.querySelector('#species').value;
    const currentTrainer = trainer;
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
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    loadAllTrainers();
    // console.log(currentTrainer);
    // console.log(currentTrainer.id);
}

function release(){
    fetch(`http://localhost:3000//pokemons/${currentPokemon}`,{
        method: "DELETE"
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    //loadAllTrainers();
   
}

function loadAllTrainers(){

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(data => {
        createElements(data);
        // data.forEach(trainer => {
        //     let div = document.createElement('div');
        //     div.className = 'card';
        //     div.setAttribute('data-id', trainer.id);
        //     let p = document.createElement('p');
        //     p.innerText = trainer.name;
        //     let button = document.createElement('button');
        //     button.setAttribute("data-trainer-id",trainer.id)
        //     button.innerText = 'Add Pokemon';
        //     button.addEventListener('click',function(e){
        //         // console.log('clicked')
        //         // console.log(e);
        //         //check current trainer pokemon length
        
        //         // console.log(trainer.id);
        //         // console.log(trainer.pokemons);
        //         // console.log(trainer.pokemons.length);
        //         //labelForm.innerText = trainer.name;
                
        //         //stored in global scope
        //         currentTrainer = trainer;
        //         //console.log(trainer);
        //         //call post method
        //         addPokemon();
        //         //reloads page to see update
        //         document.location.reload(true)
        
        //     });
        //     let ul = document.createElement('ul');
        //     trainer.pokemons.forEach(pokemon => {
        //         let li = document.createElement('li');
        //         li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        //         let pokemonButton = document.createElement('button');
        //         pokemonButton.innerText = "Release";
        //         pokemonButton.className = "release";
        //         pokemonButton.setAttribute('data-pokemon-id',pokemon.id);
        //         pokemonButton.addEventListener('click',function(){
        //             //stored in global scope
        //             currentPokemon = pokemon.id
        //             //call delete method
        //             release();
        //             //reload page
        //             document.location.reload(true)
        //         })
        //         li.appendChild(pokemonButton);
        //         ul.appendChild(li);
        //     })
        //     div.appendChild(p);
        //     div.appendChild(button);
        //     div.appendChild(ul);
        //     main.appendChild(div);
        //     //console.log(trainer.pokemons);
        // })
    })
}

function createElements(data){
    data.forEach(trainer => {
        let div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('data-id', trainer.id);
        let p = document.createElement('p');
        p.innerText = trainer.name;
        let button = document.createElement('button');
        button.setAttribute("data-trainer-id",trainer.id)
        button.innerText = 'Add Pokemon';
        button.addEventListener('click',function(e){
            // console.log('clicked')
            // console.log(e);
            //check current trainer pokemon length
    
            // console.log(trainer.id);
            // console.log(trainer.pokemons);
            // console.log(trainer.pokemons.length);
            //labelForm.innerText = trainer.name;
            
            //stored in global scope
            //currentTrainer = trainer;
            //console.log(trainer);
            //call post method
            addPokemon(trainer);
            //reloads page to see update
            //document.location.reload(true)
    
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
                release();
                
                //reload page
                document.location.reload(true)
            })
            li.appendChild(pokemonButton);
            ul.appendChild(li);
        })
        div.appendChild(p);
        div.appendChild(button);
        div.appendChild(ul);
        main.appendChild(div);
        //console.log(trainer.pokemons);
    })
}