// $('document').ready(function() {
    "use strict";

    console.log("Working");

    /* 
        
        NEEDED=============================================================

        first create function that lights up a specific color

        function to generate outputs

        wire up button to trigger the next round


        FANCY==============================================================

        create start up and failiure and success animation and sound



     */
    
    // ========================================================DEFINITIONS========================================================

    // Panel Definitions
    var $red1 = $('#red1');
    var $blue2 = $('#blue2');
    var $yellow3 = $('#yellow3');
    var $green4 = $('#green4');

    // User input value

    var hitValue = null;

    var correctHit = null;

    var nextRound = [];

    // Light Definitions
    
    

    // Light Object 

    var board = {
        "red" : 0,
        "blue" : 1,
        "yellow" : 2,
        "green" : 3
    }


    // Register what was hit



    // Helper Functions



        // var lightList = [red1Light, blue2Light, green3Light, yellow3Light];

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



    function redClick () {
        redLight();
        console.log(board.red);
        hitValue = board.red;
        continueOrLose();
    }

    function blueClick () {
        blueLight();
        hitValue = board.blue;
        continueOrLose();
    }
    function yellowClick () {
        yellowLight();
        hitValue = board.yellow;
        continueOrLose();
    }
    function greenClick () {
        greenLight();
        hitValue = board.green;
        continueOrLose();
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


    // Function on browser load to arm divs to make clickable

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


    // Functions to create light blink for each panel

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


    // Array of light blinks

    var blinks = [redBlink, blueBlink, yellowBlink, greenBlink];


    // Blinks index variable

    var blinksIndex;


    // Random generator

    function randomIndex () {
        blinksIndex = Math.floor((Math.random() * 4));
        return blinksIndex;
    }


    // Generates random array

    var blinkCounter = [];

    function blinkAdder () {
        var random = randomIndex();
        // console.log(random);
        // console.log(blinks[random]);
        blinkCounter.push(random);

        // console.log(blinkCounter);
    }



    // Fills array with random outputs using an if statement to control setTimeout for every array ouput

    function fireBlinks(index) {
        if (blinkCounter.length > index) {
            setTimeout(function() {
                // Grap first array index of blinkCounter ===== this would be blinkCounter[index] and then use that number 
                var i = blinkCounter[index];
                blinks[i]();
                index++;
                fireBlinks(index);
            }, 1000);
        }
    }

    // Adds new function to blinkCounter

    function blinkAppender () {
        blinkCounter = nextRound;
        blinkAdder();
        fireBlinks(0);
    }

    


    // Arming next round button

    $('button').click(blinkAppender);

        

    // Start animation
    

    // Lose animation


    // Check for correct input



    // Sets correct hit and populates a new array with the value of the current round
    function toTheOne () {
        correctHit = blinkCounter.shift();
        nextRound.push(correctHit);
    }



    // Controls the condition of correct or incorrect user input
    function continueOrLose () {
            toTheOne();
        if (hitValue == correctHit) {
            console.log("Correct hit after toTheOne()" + correctHit);
        } else {
            failure();

            // failure animation
        }
    }

    // Handles failure 

    function failure () {
        alert("You lose.");
        hitValue = null;
        blinkCounter = [];
        nextRound = [];
        turnOffAll();
    }

    // Runs game

    function runRound () {
        if (blinkCounter.length = 0) {
            blinkAppender();
        }
    }
        
    function firstRound () {
        blinkCounter = [];
        blinkAdder();
        fireBlinks(0);
    }



    /*

    Basically, I'm struggling because I'm not sure what the hell I'm doing! >:(

    I need to check if what the user hits is the correct thing to hit in the sequence. 

    1) Load page
    2) Start game with click event
    3) Starting animation
    4) First computer blink set
    5) Fire off first computer blink
    6) Buttons armed
    7) User attempts correct input
        if (success) {
            A. disarm the buttons
            B. add to the sequece;
            C. fire off sequence;
        } else {
            A. disarm buttons
            B. all variables reset;
            C. failure animation
        };




    // 

        // While loop to take away from correctHit
        // if user hits correct button in first blink counter index, shift array again


        // I need to have some way of registering user input

    }    
     

    // Start game function 
    */



    $('#corePanelOuterBlack').click(function(){
        alert("Round 1");
        firstRound();
    });

    $('#corePanelOuterBlack').mousedown(function(){
        $(this).css("border-style", "inset");
    });

    $('#corePanelOuterBlack').mouseup(function(){
        $(this).css("border-style", "ouset");
    });



    // ========================================================PROCEDURE==========================================================    
    armPanels();


    if (blinkCounter == []) {
        runRound();
    }
    
    


    

// });

