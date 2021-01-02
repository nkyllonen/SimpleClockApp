// connect to the HTML elements
var stopwatchTxt = document.getElementById("stopwatch");
var stopwatchButton = document.getElementById("stopwatch-button");
var countdown = document.getElementById("countdown");
var minSelect = document.getElementById("minutes");
var secSelect = document.getElementById("seconds");

// initialize values
var started = false;
var currentWatch = 0;

// listen for button clicks
stopwatchButton.addEventListener("click", stopwatch);

// callback functions for button clicks
function stopwatch() {    
    // stopwatch hasn't been started yet
    if (startDate == false) {
        started = true;
        stopwatchTxt.innerHTML = "0000";
        stopwatchButton.innerHTML = "STOP";
    }
    // stopwatch has already been started -- reset all values
    else {
        started = false;
        currentWatch = 0;
        stopwatchTxt.innerHTML = "This is where my stopwatch will go."
        stopwatchButton.innerHTML = "START";
    }
}

// function called every x milliseconds
setInterval( function() {
    if (started == true) {
        currentWatch++;
        // assuming keeping time a max of 4 digits -- pad with zeroes
        var withZeroes = "000" + currentWatch;
        stopwatchTxt.innerHTML = withZeroes.substr(withZeroes.length - 4);
    }
}, 1000)

window.onload = function() {
    // fill minutes cascading menu
    for (i = 0; i <= 99; i++) {
        minSelect.options[minSelect.options.length] = new Option(i, i);
    }
    // fill seconds cascading menu
    for (i = 0; i <= 59; i++) {
        secSelect.options[secSelect.options.length] = new Option(i, i);
    }

    // set up calback functions for when a minute value is set
    minSelect.onchange = function() {
        
    }
}