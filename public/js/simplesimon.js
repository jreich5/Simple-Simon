// $('document').ready(function() {
    "use strict";

    console.log("Working");

    /* 
        
        NEEDED=============================================================

        first create function that lights up a specific color

        function to generate outputs

        wire up button to trigger the next round


        FANCY==============================================================

        create start up animation and sound




    




     */
    
    // ========================================================DEFINITIONS========================================================

    // Panel Definitions
    var $red1 = $('#red1');
    var $blue2 = $('#blue2');
    var $yellow3 = $('#yellow3');
    var $green4 = $('#green3');


    // Light Definitions
    
    

    // Light Object 


    // Helper Functions



        // var lightList = [red1Light, blue2Light, green3Light, yellow3Light];

    function redLightup () {
        var red1Light = $red1.css("background-color", "#e00");
    }

    function blueLightup () {
        var blue2Light = $blue2.css("background-color", "#00e");
    }

    function yellowLightup () {
        var yellow3Light = $yellow3.css("background-color", "#ee0");
    }

    function greenLightup () {
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


    function armPanels () {

    }


    $red1.mousedown(redLightup);
    $red1.mouseup(redDarken);

    $blue2.mousedown(blueLightup);
    $blue2.mouseup(blueDarken);

    $yellow3.mousedown(yellowLightup);
    $yellow3.mouseup(yellowDarken);

    $green4.mousedown(greenLightup);
    $green4.mouseup(greenDarken);


        
     

    // ========================================================PROCEDURE==========================================================    

// });

