//API
var LIST_API = "https://pokeapi.co/api/v2/pokemon?limit=151";

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
let pokemonList1 = document.getElementById("pokemonList1");

// Radio buttons and forms
var pvpRadio = document.getElementById('pvp');
var pvcRadio = document.getElementById('pvc');
var playerVsCpuForm = document.getElementById('playerVsCpuForm');
var playerVsPlayerForm = document.getElementById('playerVsPlayerForm');
var playerName = document.getElementById('playerName');
var player1Name = document.getElementById('player1Name');
var player2Name = document.getElementById('player2Name');
var playerSel1 = document.getElementById('playerSel1');
var playerSel2 = document.getElementById('playerSel2');

// Pages
var page1 = document.getElementById('page1');
var page2 = document.getElementById('page2');
var page3 = document.getElementById('page3');
var page4 = document.getElementById('page4');
var page5 = document.getElementById('page5');
var page6 = document.getElementById('page6');

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
var pokemonListArr = [];
var state = 0;

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
playerSel1.addEventListener('keyup', onKeyUp);
playerSel2.addEventListener('keyup', onKeyUp);
document.addEventListener("click", hideDropDown);
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

// Function to navigate to the next page
function navigateNext(event) {
    if(state === 0){
        if (pvcRadio.checked) {
            page2.classList.add('hidden');
            page3.classList.remove('hidden');
            page4.classList.add('hidden');
            if(playerName.value != "") {
                mode = {
                    option : 2,
                    player1Name: playerName.value,
                    player2Name: null
                }
                page3.classList.add('hidden');
                page5.classList.remove('hidden');
                searchApi();
                state = 4; /* Page 4 Done ! */
            }
        } else if (pvpRadio.checked) {
            page2.classList.add('hidden');
            page3.classList.add('hidden');
            page4.classList.remove('hidden');
            if(player1Name.value != "" && player2Name.value != "") {
                mode = {
                    option : 1,
                    player1Name: player1Name.value,
                    player2Name: player2Name.value,
                }
                page4.classList.add('hidden');
                page5.classList.remove('hidden');
                searchApi();
                state = 4; /* Page 4 Done ! */
            }
        } else {
            console.log('No radio button selected');
        }
    }
    console.log(state);
    
    if(state === 5) {
        page5.classList.add('hidden');
        page6.classList.remove('hidden');
    }
}

function searchApi() {
    
    var locQueryUrl = LIST_API;

    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (locRes) {
        if (!locRes.results.length) {
          console.log('No results found!');
        } else {
            pokemonListArr = locRes.results;
            renderOptions(pokemonListArr, 1);
        }
      })
      .catch(function (error) {
        console.error(error);
    });
}

function renderOptions(arr, option) {
    let newHtml = ``;

    arr.forEach((pokemon) => {
        newHtml += `<div
        onclick="selectOption${option}('${pokemon.name}')"
        class="px-5 py-3 border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-slate-100 transition-colors"
        >
        ${pokemon.name}
        </div>`;
    });
    pokemonList1.innerHTML = newHtml;
    pokemonList2.innerHTML = newHtml;
}

function onKeyUp(e) {
    var idSelect = event.target.id.substring(e.target.id.length - 1);
    console.log(idSelect);
    console.log(typeof idSelect);
    let keyword = e.target.value;
    idSelect === "1" ? pokemonList1.classList.remove("hidden"): pokemonList2.classList.remove("hidden");
    let filteredPokemons = pokemonListArr.filter((c) =>
      c.name.toLowerCase().includes(keyword.toLowerCase())
    );
    renderOptions(filteredPokemons, idSelect);
}

function selectOption1(selectedOption) {
    hideDropDown();
    playerSel1.value = selectedOption;
    state = 5; /* Page 5 Done ! */
}

function selectOption2(selectedOption) {
    hideDropDown();
    playerSel2.value = selectedOption;
    state = 6; /* Page 6 Done ! */
}

function hideDropDown() {
    pokemonList1.classList.add("hidden");
    pokemonList2.classList.add("hidden");
}