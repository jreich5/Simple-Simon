$('document').ready(function() {
    
    "use strict";


    // ========================================================DEFINITIONS======================================================== \\


    // ================================ Global Variables ================================ 


    // Panel Definitions
    var $red1 = $('#red1');
    var $blue2 = $('#blue2');
    var $yellow3 = $('#yellow3');
    var $green4 = $('#green4');

    // Sound definitions
    var soundRed = new Audio("sounds/red.mp3");
    soundRed.preload = 'auto';
    soundRed.load();

    var soundBlue = new Audio('sounds/blue.mp3');
    soundBlue.preload = 'auto';
    soundBlue.load();

    var soundYellow = new Audio('sounds/yellow.mp3');
    soundYellow.preload = 'auto';
    soundYellow.load();

    var soundGreen = new Audio('sounds/green.mp3');
    soundGreen.preload = 'auto';
    soundGreen.load();

    var soundStart = new Audio('sounds/start.mp3');
    soundStart.preload = 'auto';
    soundStart.load();

    var soundPassRound = new Audio('sounds/passRound.mp3');
    soundPassRound.preload = 'auto';
    soundPassRound.load();

    var soundGameOver = new Audio('sounds/gameOver.mp3');
    soundGameOver.preload = 'auto';
    soundGameOver.load();

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
    var $roundNumber = 0;


    // ================================ Functions ================================ 


    // Resets global variables
    function variableReset () {
        blinkCounter = [];
        totalArray = [];
        $roundNumber = 0;
    }

    // Round display
    function roundDisplayer (input) {
        $('#roundDisplay').html("Round " + input); 
    }


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

    // function redLightLightOrDim(lightOff) {
    //     if (lightOff) {
    //         var red1Dark = $red1.css("background-color", "#800");
    //     } else {
    //         var red1Light = $red1.css("background-color", "#e00");
    //     }
    // }

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
        playRed(1);
        redLight();
        setTimeout(redDarken, 100);
    }
    function blueBlink () {
        playBlue(1);
        blueLight();
        setTimeout(blueDarken, 100);
    }
    function yellowBlink () {
        playYellow(1);
        yellowLight();
        setTimeout(yellowDarken, 100);
    }
    function greenBlink () {
        playGreen(1);
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

    // Arm mouse clicks
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
    // Remove event listeners
    function disarmPanels () {
        $red1.off();
        $blue2.off();
        $yellow3.off();
        $green4.off();
    }

    // Key down events
    function activateKeys () { 
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                greenClick();
                playGreen(1);
                break;

                case 38: // up
                redClick();
                playRed(1);
                break;

                case 39: // right
                blueClick();
                playBlue(1);
                break;

                case 40: // down
                yellowClick();
                playYellow(1);
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

    // Arms next round button
    function cowardsWay () {
        $('#round').click(function(){
            fireNextRound();
        });
    }


    // ===== Animations ===== \\

    function startAnimation () {
       $('.panel').addClass('spin'); 
       setTimeout(function() {
           $('.panel').removeClass('spin');
        }, 2000);
    }

    function failAnimation () {
        $('.simonGame').animate({
            opacity: '0',
            top: '100px',
            left: '100px'
        }, 3000).animate({
            opacity: '.9',
            top: '0',
            left: '0'
        }, 100);
    }

    function completedRoundAnimation () {
        for (var i = 1; i <= 11; i++) {
            if (i % 2 != 0) {
                setTimeout(function() {
                    turnOffAll();
                }, 50 * i); 
            } else {
                setTimeout(function() {
                    turnOnAll();
                }, 50 * i); 
            }
        }

        if ($roundNumber > 1) {
            $('.panel').animate({
                'border-radius': '100px',
            }, 400).animate({
                'border-radius': '0px',
            }, 400);
        }
    }


    // ===== Audio Functions ===== \\

    function roundMusic () {
        $('#music').attr('src', 'sounds/roundMusic.mp3');
    }

    function menuMusic () {
        $('#music').attr('src', 'sounds/menu.mp3');
    }

    function playRed(volume) {
        console.log("Playing");
      var click = soundRed.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playBlue(volume) {
        console.log("Playing");
      var click = soundBlue.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playYellow(volume) {
        console.log("Playing");
      var click = soundYellow.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playGreen(volume) {
        console.log("Playing");
      var click = soundGreen.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playStart(volume) {
        console.log("Playing");
      var click = soundStart.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playPassRound(volume) {
        console.log("Playing");
      var click = soundPassRound.cloneNode();
      click.volume = volume;
      click.play();
    }

    function playGameOver(volume) {
        console.log("Playing");
      var click = soundGameOver.cloneNode();
      click.volume = volume;
      click.play();
    }


    // ===== Game Logic Functions ===== \\

    // Game start 
    function startUp () {
        playStart(1);
        roundMusic();
        turnOffAll();
        blinkCounter = [];
        totalArray = [];
        deactivateKeys();
        startAnimation();
        disarmPanels();
        $roundNumber = 0;
        roundDisplayer($roundNumber);
        $('#roundDisplay').show();
        setTimeout(function() {
            deactivateKeys();
            disarmPanels();
            variableReset();
            activateKeys();
            armPanels();
            fireNextRound();
            controlLights();
            cowardsWay();
        }, 2000);

    }

    // Random generator function
    function randomIndex () {
        var blinksIndex;
        blinksIndex = Math.floor((Math.random() * 4));
        return blinksIndex;
    }

    // Engages round
    function fireNextRound () {
        playPassRound(1);
        $roundNumber++;
        roundDisplayer($roundNumber);
        blinkCounter = totalArray.slice();
        blinkAdder();
        totalArray = blinkCounter.slice();
        completedRoundAnimation();
        setTimeout(function() {
            fireBlinks(0);
        }, 2000);
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
        playGameOver(1);
        menuMusic();
        failAnimation();
        deactivateKeys();
        $roundNumber = 0;
        $('#roundDisplay').hide();
        hitValue = null;
        blinkCounter = [];
        totalArray = [];
        turnOffAll();
        disarmPanels();
        controlLights();
        armEnterKey();
        cowardsWay();
        return;
    }

    // Procedural code on page load

    function onLoad () {
        // Start button event
        $('#corePanelOuterBlack').click(function(){
            // alert("Round 1");
            startUp();
        });
        $('#corePanelOuterBlack').click(function(){
            $(this).css("border-style", "groove");
        });
        $('#corePanelOuterBlack').mouseup(function(){
            $(this).css("border-style", "solid");
        });

        cowardsWay();

        // Allows for startup
        armEnterKey();

        // Enables the user to play with lights between rounds
        controlLights();

        $('#round').click(function(){
            console.log('Clicked');
        });

        menuMusic();
    }


    // ========================================================PROCEDURE========================================================


    onLoad();
    
    
});
