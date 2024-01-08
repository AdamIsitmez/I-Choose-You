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
