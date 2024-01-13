var buttonsContainer = document.getElementById('buttonsContainer');
var inst = document.getElementById('instructions');
var instPrevBtn = document.getElementById('instPrevBtn');
var instNextBtn = document.getElementById('instNextBtn');
var startGameBtn = document.getElementById('startGameBtn');
var backBtn = document.getElementById('backBtn');
var nextBtn = document.getElementById('nextBtn');
var playBtn = document.getElementById('playBtn');
var muteBtn = document.getElementById('muteBtn');

var pvpRadio = document.getElementById('pvp');
var pvcRadio = document.getElementById('pvc');
var playerVsCpuForm = document.getElementById('playerVsCpuForm');
var playerVsPlayerForm = document.getElementById('playerVsPlayerForm');
var playerName = document.getElementById('playerName');
var player1Name = document.getElementById('player1Name');
var player2Name = document.getElementById('player2Name');

var page1 = document.getElementById('page1');
var page2 = document.getElementById('page2');
var page3 = document.getElementById('page3');
var page4 = document.getElementById('page4');

var audioElement = document.querySelector('audio');

// Function to play audio
function playAudio() {
    audioElement.play();
}

// Function to pause audio
function pauseAudio() {
    audioElement.pause();
}

// Function to toggle audio playback
function toggleAudio() {
    if (audioElement.paused) {
        playAudio();
    }
}

// Function to toggle mute
function toggleMute() {
    audioElement.muted = !audioElement.muted;
}

// Adding click event listener for playBtn
playBtn.addEventListener('click', function () {
    toggleAudio();
});

// Adding click event listener for muteBtn
muteBtn.addEventListener('click', function () {
    toggleMute();
});

var instArray = [
    "Become the ultimate Pokémon Trainer by defeating opponents in 5 rounds of intense Pokémon battles.",
    "Choose your Pokémon wisely, leverage their unique powers, and emerge victorious!",
    "1. Choose your trainer name to embark on your journey as a Pokémon Trainer.",
    "Optionally, decide whether you want to challenge other trainers or face off against the computer.",
    "2. Engage in 5 rounds of battles, accumulating points for each victorious round.",
    "3. Each round, select a Pokémon.",
    "4. Each Pokémon card has a designated power level.",
    "The Trainer whose Pokémon has the higher power level wins the round.",
    "In case of a tie, the battle is declared a draw, and no points are awarded.",
    "5. Track your progress on the leaderboard and compete with other trainers to claim the top spot.",
    "Press the green play button to play the music and enhance your gaming experience!"
];

// Index to keep track of the current instruction
var currentIndex = 0;

// Function to update the displayed instruction
function updateInstructions() {
    inst.textContent = instArray[currentIndex];
}

// Adding click event listener for instPrevBtn
instPrevBtn.addEventListener('click', function () {
    showPreviousInstruction();
});

// Adding click event listener for instNextBtn
instNextBtn.addEventListener('click', function () {
    showNextInstruction();
});

// Function to show the previous instruction
function showPreviousInstruction() {
    if (currentIndex > 0) {
        currentIndex--;
        updateInstructions();
    }
}

// Function to show the next instruction
function showNextInstruction() {
    if (currentIndex < instArray.length - 1) {
        currentIndex++;
        updateInstructions();
    }
}

startGameBtn.addEventListener('click', function () {
    // Hide Page 1 and show Page 2 when Start Game button is clicked
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    buttonsContainer.classList.remove('hidden'); // Show the button container

});

// Adding click event listener for Back button
backBtn.addEventListener('click', function () {
    if (!page1.classList.contains('hidden')) {
        console.log('Back button on Page 1 clicked');
    } else if (!page2.classList.contains('hidden')) {
        // Back button on Page 2, navigate to Page 1
        page2.classList.add('hidden');
        page1.classList.remove('hidden');
        // Clear the input value when navigating back to Page 1
        playerVsPlayerForm.reset();
        buttonsContainer.classList.add('hidden');
    } else if (!page3.classList.contains('hidden')) {
        // Back button on Page 3, navigate to Page 2
        page3.classList.add('hidden');
        page2.classList.remove('hidden');
        playerVsCpuForm.reset();
        buttonsContainer.classList.remove('hidden');
    } else if (!page4.classList.contains('hidden')) {
        // Back button on Page 4, navigate to Page 2
        page4.classList.add('hidden');
        page2.classList.remove('hidden');
        // Clear the input value when navigating back to Page 2
        playerVsPlayerForm.reset();
        buttonsContainer.classList.remove('hidden');
    }
});

var playerName;
var player1Name;
var player2Name;

function savePlayerNames() {
    if (!page3.classList.contains('hidden')) {
        // If on Page 3 (Player vs CPU), save player name
        playerName.value;
    } else if (!page4.classList.contains('hidden')) {
        // If on Page 4 (Player vs Player), save both player names
        player1Name.value;
        player2Name.value;
    }
}

// Adding click event listener for Next button
nextBtn.addEventListener('click', function () {
    savePlayerNames(); // Save player names before navigating to the next page

    if (pvcRadio.checked) {
        // Show page 3 for Player vs CPU
        page2.classList.add('hidden'); // Hide Page 2
        page3.classList.remove('hidden');
        page4.classList.add('hidden');
    } else if (pvpRadio.checked) {
        // Show page 4 for Player vs Player
        page2.classList.add('hidden'); // Hide Page 2
        page3.classList.add('hidden'); // Hide Page 3
        page4.classList.remove('hidden');
    } else {
        console.log('No radio button selected');
    }
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