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
var pokemonList1 = document.getElementById("pokemonList1");
var pokemonNameLeftH1 = document.getElementById("pokemonNameLeftH1");
var pokemonDescriptionLeftP = document.getElementById("pokemonDescriptionLeftP");
var pokemonLeftImg = document.getElementById("pokemonLeftImg");
var pokemonStatsLeftDiv = document.getElementById("pokemonStatsLeftDiv");
var pokemonNameRightH1 = document.getElementById("pokemonNameRightH1");
var pokemonDescriptionRightP = document.getElementById("pokemonDescriptionRightP");
var pokemonRightImg = document.getElementById("pokemonRightImg");
var pokemonStatsRightDiv = document.getElementById("pokemonStatsRightDiv");
var battleTitleEl = document.getElementById("battle-title");
var p1ScoreEl = document.querySelectorAll(".p1-battle-details * .point");
var p2ScoreEl = document.querySelectorAll(".p2-battle-details * .point");
var p1NameEl = document.getElementById("p1-name");
var p2NameEl = document.getElementById("p2-name");

// Radio buttons and forms
var pvpRadio = document.getElementById('pvp');
var pvcRadio = document.getElementById('pvc');
var playerVsCpuForm = document.getElementById('playerVsCpuForm');
var playerVsPlayerForm = document.getElementById('playerVsPlayerForm');
var playerName = document.getElementById('playerName');
var player1Name = document.getElementById('player1Name');
var player2Name = document.getElementById('player2Name');
var player1NameData = document.getElementById('player1NameData');
var player2NameData = document.getElementById('player2NameData');
var playerSel1 = document.getElementById('playerSel1');
var playerSel2 = document.getElementById('playerSel2');
var titlePlayer1 = document.getElementById('titlePlayer1');
var titlePlayer2 = document.getElementById('titlePlayer2');


// Pages
var player1NameData = document.getElementById('player1NameData');
var player2NameData = document.getElementById('player2NameData');
var playerSel1 = document.getElementById('playerSel1');
var playerSel2 = document.getElementById('playerSel2');
var titlePlayer1 = document.getElementById('titlePlayer1');
var titlePlayer2 = document.getElementById('titlePlayer2');


// Pages
var page1 = document.getElementById('page1');
var page2 = document.getElementById('page2');
var page3 = document.getElementById('page3');
var page4 = document.getElementById('page4');
var page5 = document.getElementById('page5');
var page6 = document.getElementById('page6');
var page7 = document.getElementById('page7');
var page8 = document.getElementById('page8');
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
var pokemonListArr = [];
var state = 0;

//initialise players scores and number of battles
var battleCount = 0;
var p1Score = 0;
var p2Score = 0;

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

//Function for getting a random element from an array
function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}

// Function to navigate to the next page
function navigateNext() {
    if (state === 0) {
        if (pvcRadio.checked) {
            page2.classList.add('hidden');
            page3.classList.remove('hidden');
            page4.classList.add('hidden');
            playerName.focus();
            if (playerName.value != "") {
                player1NameData.textContent = "PLAYER 1 : " + playerName.value;
                player2NameData.textContent = "COMPUTER";
                page3.classList.add('hidden');
                page5.classList.remove('hidden');
                searchApi();
                state = 4; /* Page 4 Done ! */
            }
        } else if (pvpRadio.checked) {
            page2.classList.add('hidden');
            page3.classList.add('hidden');
            page4.classList.remove('hidden');
            player1Name.focus();
            if (player1Name.value != "" && player2Name.value != "") {
                player1NameData.textContent = "PLAYER 1 : " + player1Name.value;
                player2NameData.textContent = "PLAYER 2 : " + player2Name.value;
                page4.classList.add('hidden');
                page5.classList.remove('hidden');
                searchApi();
                state = 4; /* Page 4 Done ! */
            }
        } else {
            console.log('No radio button selected');
        }
    }

    if (state === 5) {
        page5.classList.add('hidden');
        pvcRadio.checked ? page7.classList.remove('hidden') : page6.classList.remove('hidden');
        var pokemonRandom = getRandom(pokemonListArr);
        searchDetailApi(playerSel1.dataset.value, 1);
        searchDetailApi(pokemonRandom.url, 2);
        titlePlayer1.textContent = playerName.value;
        titlePlayer2.textContent = "COMPUTER";
        state = 7;
        return
    }

    if (state === 6) { /* page6*/
        page6.classList.add('hidden');
        page7.classList.remove('hidden'); /* Display page 7*/
        searchDetailApi(playerSel1.dataset.value, 1);
        searchDetailApi(playerSel2.dataset.value, 2);
        titlePlayer1.textContent = player1Name.value;
        titlePlayer2.textContent = player2Name.value;
        state = 7;
        return
    }

    if (state === 7) {
        //hide buttons
        nextBtn.style.visibility = "hidden";
        backBtn.classList.add("hidden");
        //display battle page
        page7.classList.add('hidden');
        page8.classList.remove('hidden');
        //battle function: changes next button to continue button once battle is done
        handleBattlePage(pokemonNameLeftH1.textContent, pokemonNameRightH1.textContent);
        state = 8;
        return;
    }

    if (state === 8) {
        //display pokemon selection page again
        page8.classList.add('hidden');
        page5.classList.remove('hidden');

        //revert buttons to back/next
        backBtn.classList.remove("hidden");
        nextBtn.textContent = "next";
        nextBtn.classList.add("ml-8");
        return;
    }

    if (state === 9) {
        nextBtn.textContent = "Restart";
        page8.classList.add("hidden");
        page9.classList.remove("hidden");

        function updateScoresTable() {

            var tableBody = document.getElementById('scoreTableBody');

            tableBody.innerHTML = '';


            var p1Score = localStorage.getItem("p1Score") || 0;
            var p2Score = localStorage.getItem("p2Score") || 0;

            var player1Row = document.createElement('tr');
            player1Row.innerHTML = `
        <td class="border border-gray-400 px-4 py-2">1</td>
        <td class="border border-gray-400 px-4 py-2">${titlePlayer1.textContent}</td>
        <td class="border border-gray-400 px-4 py-2">${p1Score}</td>
    `;
            tableBody.appendChild(player1Row);

            var player2Row = document.createElement('tr');
            player2Row.innerHTML = `
        <td class="border border-gray-400 px-4 py-2">2</td>
        <td class="border border-gray-400 px-4 py-2">${titlePlayer2.textContent}</td>
        <td class="border border-gray-400 px-4 py-2">${p2Score}</td>
    `;
            tableBody.appendChild(player2Row);


            var rows = Array.from(tableBody.children);
            rows.sort((a, b) => {
                var scoreA = parseInt(a.children[2].textContent);
                var scoreB = parseInt(b.children[2].textContent);
                return scoreB - scoreA;
            });

            rows.forEach((row, index) => {

                row.children[0].textContent = (index + 1).toString();
                tableBody.appendChild(row);
            });
        }

        updateScoresTable();


        state = 10;
        return;
    }

    if (state === 10) {
        //restart game
        location.reload();
    }
}

function normalize(data, type) {

    var list = [];
    for (var i = 0; i < data.stats.length; i++) {
        if (type === 1) {
            list.push(data.stats[i].base_stat)
        } else {
            list.push(data.stats[i].stat.name)
        }
    }

    return list.sort((a, b) => a - b);
}

function searchDetailApi(DETAIL_API, side) {
    var locQueryUrl = DETAIL_API;
    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (locRes) {
            var base_stat = normalize(locRes, 1);
            var stat = normalize(locRes, 2);

            if (side === 1) {
                pokemonNameLeftH1.textContent = locRes.name;
                pokemonLeftImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + locRes.id + ".png";
                renderChart(base_stat, stat, "#pokemonStatsLeftDiv");
            } else {
                pokemonNameRightH1.textContent = locRes.name;
                pokemonRightImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + locRes.id + ".png";
                renderChart(base_stat, stat, "#pokemonStatsRightDiv");
            }
        })
        .catch(function (error) {
            console.error(error);
        });
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
    var newHtml = ``;

    for (var i = 0; i < arr.length; i++) {
        newHtml += `<div
        onclick="selectOption${option}(event, '${arr[i].name}')"
        class="px-5 py-3 border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-slate-100 transition-colors"
        data-value="${arr[i].url}"
        >
        ${arr[i].name}
        </div>`;
    }
    pokemonList1.innerHTML = newHtml;
    pokemonList2.innerHTML = newHtml;
}

function onKeyUp(e) {
    var idSelect = e.target.id.substring(e.target.id.length - 1);
    var keyword = e.target.value;
    idSelect === "1" ? pokemonList1.classList.remove("hidden") : pokemonList2.classList.remove("hidden");
    var filteredPokemons = pokemonListArr.filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
    );
    renderOptions(filteredPokemons, idSelect);
}

function selectOption1(event, name) {
    hideDropDown();
    playerSel1.setAttribute("data-value", event.target.dataset.value);
    playerSel1.value = name;
    state = 5; /* Page 5 Done ! */
}

function selectOption2(event, name) {
    hideDropDown();
    playerSel2.setAttribute("data-value", event.target.dataset.value);
    playerSel2.value = name;
    state = 6; /* Page 6 Done ! */
}

function hideDropDown() {
    pokemonList1.classList.add("hidden");
    pokemonList2.classList.add("hidden");
}

function renderChart(param1, param2, param3) {
    var options = {
        series: [{
            data: param1
        }],
        chart: {
            type: 'bar',
            height: 250
        },
        annotations: {
            xaxis: [{
                x: 500,
                borderColor: '#00E396',
                label: {
                    borderColor: '#00E396',
                    style: {
                        color: '#fff',
                        background: '#00E396',
                    },
                    text: 'X annotation',
                }
            }],
            yaxis: [{
                y: 'July',
                y2: 'September',
                label: {
                    text: 'Y annotation'
                }
            }]
        },
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: param2,
        },
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        yaxis: {
            reversed: false,
            axisTicks: {
                show: true
            }
        }
    };

    var chart = new ApexCharts(document.querySelector(param3), options);
    chart.render();
}

async function getPokemon(name) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;

    try {
        var response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        var data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function handleBattlePage(p1Pokemon, p2Pokemon) {
    try {
        var p1PokemonData = await getPokemon(p1Pokemon);
        var p2PokemonData = await getPokemon(p2Pokemon);
        battleTitleEl.style.color = "black";

        countdown();

        p1Selection(p1PokemonData);
        p2Selection(p2PokemonData);
        setTimeout(() => { handleBattleResult(p1PokemonData, p2PokemonData); }, 7000);
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
};

function p1Selection(pokemon) {
    var p1PokemonEl = document.getElementById("p1-pokemon");
    var p1PokemonNameEl = document.getElementById("p1-pokemon-name");
    p1PokemonEl.src = pokemon.sprites.other.showdown.back_default;
    p1PokemonNameEl.textContent = pokemon.name;
    p1NameEl.textContent = titlePlayer1.textContent;
}

function p2Selection(pokemon) {
    var p2PokemonEl = document.getElementById("p2-pokemon");
    var p2PokemonNameEl = document.getElementById("p2-pokemon-name");
    p2PokemonEl.src = pokemon.sprites.other.showdown.front_default;
    p2PokemonNameEl.textContent = pokemon.name;
    p2NameEl.textContent = titlePlayer2.textContent;
}

function handleBattleResult(p1Pokemon, p2Pokemon) {

    var p1Attack = p1Pokemon.stats[1].base_stat;
    var p2Attack = p2Pokemon.stats[1].base_stat;

    battleTitleEl.style.color = "rgb(198, 49, 49)";

    if (p1Attack == p2Attack) {
        battleTitleEl.textContent = "Draw!"
    } else if (p1Attack > p2Attack) {
        battleTitleEl.textContent = "P1 Wins!"
        p1Score++;
        localStorage.setItem("p1Score", p1Score);
    } else {
        battleTitleEl.textContent = "P2 Wins!"
        p2Score++;
        localStorage.setItem("p2Score", p2Score);
    }

    for (var i = 0; i < p1Score; i++) {
        p1ScoreEl[i].classList.add("score");
    }

    for (var i = 0; i < p2Score; i++) {
        p2ScoreEl[i].classList.add("score");
    }
    nextBtn.textContent = "next round";
    nextBtn.style.visibility = "visible";
    nextBtn.classList.remove("ml-8");
    battleCount++;
    if (battleCount === 5) {
        nextBtn.textContent = "continue";
        state = 9;
    }
}


function countdown() {
    var count = 3;

    battleTitleEl.textContent = "Ready!"

    var countdown = setInterval(() => {
        if (count == 0) {
            battleTitleEl.textContent = "Fight!";
            clearInterval(countdown);
        }
        else {
            battleTitleEl.textContent = count;
            count--;
        }

    }, 1000);
}


