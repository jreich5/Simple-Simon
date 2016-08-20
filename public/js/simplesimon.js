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

    // Round count
    var $roundNumber = "";

    // Round display
    function roundDisplayer (input) {
        $('#roundDisplay').html("Round " + input); 
    }


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


    function activateKeys () { 
        
        // Key down events
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                greenClick();
                break;

                case 38: // up
                redClick();
                break;

                case 39: // right
                blueClick();
                break;

                case 40: // down
                yellowClick();
                break;

                case 13: // enter
                startUp();
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }

    // Deactivates all key events in the document
    function deactivateKeys () {
        $(document).off();

    }

    function controlLights () {

        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                greenLight();
                break;

                case 38: // up
                redLight();
                break;

                case 39: // right
                blueLight();
                break;

                case 40: // down
                yellowLight();
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        // Key up events
        $(document).keyup(function(e) {
            switch(e.which) {
                case 37: // left
                greenDarken();
                break;

                case 38: // up
                redDarken();
                break;

                case 39: // right
                blueDarken();
                break;

                case 40: // down
                yellowDarken();
                break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }

    // Arms enter key to begin game
    function armEnterKey () {
        $(document).keypress(function(e) {
            if(e.which == 13) {
                startUp();
            }
        });
    }

    // ===== Animations ===== \\








    // ===== Game Logic Functions ===== \\

    // Game start 
    function startUp () {
        blinkCounter = [];
        totalArray = [];
        deactivateKeys();
        armPanels();
        activateKeys();
        // Start up animation
        $roundNumber = 0;
        roundDisplayer($roundNumber);
        fireNextRound();
        controlLights();
        disarmPanels();
    }

    // Random generator function
    function randomIndex () {
        var blinksIndex;
        blinksIndex = Math.floor((Math.random() * 4));
        return blinksIndex;
    }

    // Engages round
    function fireNextRound () {
        $roundNumber++;
        roundDisplayer($roundNumber);
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
        console.log(index);
        if (blinkCounter.length > index) {
            setTimeout(function() {
                var color = null;
                color = blinkCounter[index];
                blinks[color]();
                index++;
                fireBlinks(index);
            }, 500);
        } else {
            return;
        }
    }

    // Lose procedure
    function failure () {
        deactivateKeys();
        $roundNumber = "";
        $('#roundDisplay').html("");
        hitValue = null;
        blinkCounter = [];
        totalArray = [];
        turnOffAll();
        disarmPanels();
        controlLights();
        armEnterKey();
        alert("You lose.");
        return;
        // Failure animation
    }



    // ========================================================PROCEDURE========================================================


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

    // Arms next round button
    $('#round').click(function(){
        fireNextRound();
    });


    armEnterKey();
    controlLights();




    
// });
