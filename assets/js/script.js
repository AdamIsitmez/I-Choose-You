// DOM Elements
var buttonsContainer = document.getElementById('buttonsContainer');
var inst = document.getElementById('instructions');
var instPrevBtn = document.getElementById('instPrevBtn');
var instNextBtn = document.getElementById('instNextBtn');
var startGameBtn = document.getElementById('startGameBtn');
var backBtn = document.getElementById('backBtn');
var nextBtn = document.getElementById('nextBtn');
var playBtn1 = document.getElementById('playBtn1');
var muteBtn1 = document.getElementById('muteBtn1');
var playBtn2 = document.getElementById('playBtn2');
var muteBtn2 = document.getElementById('muteBtn2');
var table = document.getElementById('table');

// Radio buttons and forms
var pvpRadio = document.getElementById('pvp');
var pvcRadio = document.getElementById('pvc');
var playerVsCpuForm = document.getElementById('playerVsCpuForm');
var playerVsPlayerForm = document.getElementById('playerVsPlayerForm');
var playerName = document.getElementById('playerName');
var player1Name = document.getElementById('player1Name');
var player2Name = document.getElementById('player2Name');

// Pages
var page1 = document.getElementById('page1');
var page2 = document.getElementById('page2');
var page3 = document.getElementById('page3');
var page4 = document.getElementById('page4');

var page9 = document.getElementById('page9');

var audioElement = document.querySelector('audio');

// Game Instructions
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

// Event Listeners
playBtn1.addEventListener('click', toggleAudio);
muteBtn1.addEventListener('click', toggleMute);
playBtn2.addEventListener('click', toggleAudio);
muteBtn2.addEventListener('click', toggleMute);
instPrevBtn.addEventListener('click', showPreviousInstruction);
instNextBtn.addEventListener('click', showNextInstruction);
startGameBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', navigateBack);
nextBtn.addEventListener('click', navigateNext);


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
    audioElement.paused ? playAudio() : pauseAudio();
}

// Function to toggle mute
function toggleMute() {
    audioElement.muted = !audioElement.muted;
}

// Function to update the displayed instruction
function updateInstructions() {
    inst.textContent = instArray[currentIndex];
}

// Function to show the previous instruction
function showPreviousInstruction() {
    currentIndex > 0 && currentIndex--;
    updateInstructions();
}

// Function to show the next instruction
function showNextInstruction() {
    currentIndex < instArray.length - 1 && currentIndex++;
    updateInstructions();
}

// Function to start the game
function startGame() {
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    buttonsContainer.classList.remove('hidden');
}

// Function to navigate back between pages
function navigateBack() {
    if (!page2.classList.contains('hidden')) {
        resetForm(playerVsPlayerForm);
        page2.classList.add('hidden');
        page1.classList.remove('hidden');
        buttonsContainer.classList.add('hidden');
    } else if (!page3.classList.contains('hidden')) {
        resetForm(playerVsCpuForm);
        page3.classList.add('hidden');
        page2.classList.remove('hidden');
        buttonsContainer.classList.remove('hidden');
    } else if (!page4.classList.contains('hidden')) {
        resetForm(playerVsPlayerForm);
        page4.classList.add('hidden');
        page2.classList.remove('hidden');
        buttonsContainer.classList.remove('hidden');
    }
}

// Function to reset form inputs
function resetForm(form) {
    form.reset();
}

// Function to save player names based on the current page
function savePlayerNames() {
    if (!page3.classList.contains('hidden')) {
        playerName.value;
    } else if (!page4.classList.contains('hidden')) {
        player1Name.value;
        player2Name.value;
    }
}


// Function to navigate to the next page
function navigateNext() {
    savePlayerNames();
    if (pvcRadio.checked) {
        page2.classList.add('hidden');
        page3.classList.remove('hidden');
        page4.classList.add('hidden');
    } else if (pvpRadio.checked) {
        page2.classList.add('hidden');
        page3.classList.add('hidden');
        page4.classList.add('hidden');
    } else {
        console.log('No radio button selected');
    }
    console.log("here");
    //finalResults();
    displayTopResults();
}

/* function to save data into the final page */
function finalResults() {
    var results = [
        { name: "John Doe", results: "85" },
        { name: "Jane Smith", results: "92" },
        { name: "Bob Johnson", results: "78" },
        { name: "Alice Williams", results: "95" },
        { name: "Charlie Brown", results: "88" }
    ]
    localStorage.setItem('results', JSON.stringify(results));
}


function displayTopResults() {
    table.innerHTML = '';
    page4.classList.add('hidden');
    page9.classList.remove('hidden');
    var results1 = JSON.parse(localStorage.getItem('results'));


    results1.sort(function (a, b) {
        return b.results - a.results;
    });

    for (var i = 0; i < 5; i++) {
        var trEl = document.createElement("tr");
        var tdEl1 = document.createElement("td");
        tdEl1.textContent = (i+1) + "." + results1[i].name;
        var tdEl2 = document.createElement("td");
        tdEl2.textContent = results1[i].results;
        trEl.append(tdEl1, tdEl2)
        table.append(trEl);
    }
    
}
var restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);

// Function to reset the game state
function restartGame() {
    // Reset any game-related variables or states here
    currentIndex = 0;
    updateInstructions();
    
   
    page1.classList.remove('hidden');
    page2.classList.add('hidden');
    page3.classList.add('hidden');
    page4.classList.add('hidden');
    page9.classList.add('hidden');

   
    buttonsContainer.classList.add('hidden');
    
    
    resetForm(playerVsPlayerForm);
    resetForm(playerVsCpuForm);

   
    table.innerHTML = '';
}
