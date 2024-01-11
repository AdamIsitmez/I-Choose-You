var backBtn = document.getElementById('backBtn');
var nextBtn = document.getElementById('nextBtn');
var muteBtn = document.getElementById('muteBtn');
var pvpRadio = document.getElementById('pvp');
var pvcRadio = document.getElementById('pvc');

// Adding click event listener for Back button
backBtn.addEventListener('click', function () {
    console.log('Back button clicked');
});

// Adding click event listener for Next button
nextBtn.addEventListener('click', function () {
    if (pvpRadio.checked) {
        // Call function 4 or perform other actions for Player vs Player
        console.log('Next button clicked for Player vs Player');
    } else if (pvcRadio.checked) {
        // Call function 3 or perform other actions for Player vs CPU
        console.log('Next button clicked for Player vs CPU');
    } else {
        // Handle other cases if needed
        console.log('No radio button selected');
    }
});

// Adding click event listener for Mute button
muteBtn.addEventListener('click', function () {
    console.log('Mute button clicked');
});

// var nameDisplayEl = document.getElementById()

function getPokemon(name) {
    const imageUrl = "https://pokeapi.co/api/v2/pokemon/" + name;
    // Use the Fetch API to fetch the image
    return fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


getPokemon("charizard")
    .then(p1Pokemon => {
        // Assign the Pokemon data to the variable
        // console.log("p1:", p1Pokemon.sprites.other.showdown.back_default);
        handleP1Selection(p1Pokemon);
    })
    .catch(error => {
        console.error("Error fetching Pokemon:", error);
    });

getPokemon("alakazam")
    .then(p2Pokemon => {
        handleP2Selection(p2Pokemon);
    })
    .catch(error => {
        console.error("Error fetching Pokemon:", error);
    });

function handleP1Selection(pokemon) {
    var p1PokemonEl = document.getElementById("p1-pokemon");
    console.log(p1PokemonEl)
    p1PokemonEl.src = pokemon.sprites.other.showdown.back_default;
}

function handleP2Selection(pokemon) {
    var p2PokemonEl = document.getElementById("p2-pokemon");
    console.log(p2PokemonEl)
    p2PokemonEl.src = pokemon.sprites.other.showdown.front_default;
}