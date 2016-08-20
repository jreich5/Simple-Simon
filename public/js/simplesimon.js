// $('document').ready(function() {
    
    "use strict";


    // ========================================================DEFINITIONS======================================================== \\


    // ================================ Global Variables ================================ 


    // Panel Definitions
    var $red1 = $('#red1');
    var $blue2 = $('#blue2');
    var $yellow3 = $('#yellow3');
    var $green4 = $('#green4');

    // User input value
    var hitValue = null; // The value of most recent user input
    var totalArray = []; // Stores a complete version of each round array for the duration of the round
    var blinkCounter = []; // Stores the complete round sequence that shrinks with each correct user input until it is empty at the end of a round

    // Light board object 
    var board = {
        "red" : 0,
        "blue" : 1,
        "yellow" : 2,
        "green" : 3
    }

    // Array of light blinks
    var blinks = [redBlink, blueBlink, yellowBlink, greenBlink];



    // ================================ Functions ================================ 


    // ===== Lighting Functions ===== \\

    function redLight () {
        var red1Light = $red1.css("background-color", "#e00");
    }
    function blueLight () {
        var blue2Light = $blue2.css("background-color", "#00e");
    }
    function yellowLight () {
        var yellow3Light = $yellow3.css("background-color", "#ee0");
    }
    function greenLight () {
        var green4Light = $green4.css("background-color", "#0e0");
    }

    function redDarken () {
        var red1Dark = $red1.css("background-color", "#800");
    }
    function blueDarken () {
        var blue2Dark = $blue2.css("background-color", "#008");
    }
    function yellowDarken () {
        var yellow3Dark = $yellow3.css("background-color", "#880");
    }
    function greenDarken () {
        var green4Dark = $green4.css("background-color", "#080");
    }

    function redBlink () {
        redLight();
        setTimeout(redDarken, 100);
    }
    function blueBlink () {
        blueLight();
        setTimeout(blueDarken, 100);
    }
    function yellowBlink () {
        yellowLight();
        setTimeout(yellowDarken, 100);
    }
    function greenBlink () {
        greenLight();
        setTimeout(greenDarken, 100);
    }

    function turnOffAll () {
        redDarken();
        blueDarken();
        yellowDarken();
        greenDarken();
    }
    function turnOnAll () {
        redLight();
        blueLight();
        yellowLight();
        greenLight();
    }

    // ===== Click Functions ===== \\

    function redClick () {
        redLight();
        hitValue = board.red;
        if (board.red == blinkCounter[0]) {
            blinkCounter.shift();
            if (blinkCounter.length == 0) {
                fireNextRound();
            }
        } else {
            failure();
        }
    }
    function blueClick () {
        blueLight();
        hitValue = board.blue;
        if (board.blue == blinkCounter[0]) {
            blinkCounter.shift();
            if (blinkCounter.length == 0) {
                fireNextRound();
            }
        } else {
            failure();
        }
    }
    function yellowClick () {
        yellowLight();
        hitValue = board.yellow;
        if (board.yellow == blinkCounter[0]) {
            blinkCounter.shift();
            if (blinkCounter.length == 0) {
                fireNextRound();
            }
        } else {
            failure();
        }
    }
    function greenClick () {
        greenLight();
        hitValue = board.green;
        if (board.green == blinkCounter[0]) {
            blinkCounter.shift();
            if (blinkCounter.length == 0) {
                fireNextRound();
            }
        } else {
            failure();
        }
    }

    // Start button event
    $('#corePanelOuterBlack').click(function(){
        // alert("Round 1");
        startUp();
    });
    $('#corePanelOuterBlack').mousedown(function(){
        $(this).css("border-style", "inset");
    });
    $('#corePanelOuterBlack').mouseup(function(){
        $(this).css("border-style", "ouset");
    });

    // ===== Event Listener Functions ===== \\

    function armPanels () {
        $red1.mousedown(redClick);
        $red1.mouseup(redDarken);

        $blue2.mousedown(blueClick);
        $blue2.mouseup(blueDarken);

        $yellow3.mousedown(yellowClick);
        $yellow3.mouseup(yellowDarken);

        $green4.mousedown(greenClick);
        $green4.mouseup(greenDarken);
    }
    function disarmPanels () {
        $red1.off();
        $blue2.off();
        $yellow3.off();
        $green4.off();
    }

    // ===== Animations ===== \\








    // ===== Game Logic Functions ===== \\

    // Game start 
    function startUp () {
        blinkCounter = [];
        totalArray = [];
        disarmPanels();
        armPanels();
        // Start up animation
        fireNextRound();
    }

    // Random generator function
    function randomIndex () {
        var blinksIndex;
        blinksIndex = Math.floor((Math.random() * 4));
        return blinksIndex;
    }

    // Engages round
    function fireNextRound () {
        blinkCounter = totalArray.slice();
        blinkAdder();
        totalArray = blinkCounter.slice();
        fireBlinks(0);
    }

    // Adds new blink for each round
    function blinkAdder () {
        var random = randomIndex();
        blinkCounter.push(random);
    }

    // Fires blinks for each round
    function fireBlinks(index) {
        if (blinkCounter.length > index) {
            setTimeout(function() {
                var color = null;
                color = blinkCounter[index];
                blinks[color]();
                index++;
                fireBlinks(index);
            }, 1000);
        }
    }

    // Lose procedure
    function failure () {
        alert("You lose.");
        hitValue = null;
        blinkCounter = [];
        totalArray = [];
        turnOffAll();
        disarmPanels();
        return;
        // Failure animation
    }



    // ========================================================PROCEDURE========================================================

// });

