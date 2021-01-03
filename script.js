// connect to the HTML elements
var stopwatchTxt = document.getElementById("stopwatch");
var stopwatchButton = document.getElementById("stopwatch-button");
var countdownTxt = document.getElementById("countdown");
var countdownButton = document.getElementById("countdown-button");
var countdownPauseButton = document.getElementById("countdown-pause");
var minSelect = document.getElementById("minutes");
var secSelect = document.getElementById("seconds");

// initialize values
var startedWatch = false;
var currentWatch = 0;
var startedTimer = false;
var pausedTimer = false;
var mins = 0;
var secs = 0;

// EVENT LISTENERS //
stopwatchButton.addEventListener("click", stopwatch);
countdownButton.addEventListener("click", countdown);
countdownPauseButton.addEventListener("click", countdownPause);

// CALLBACK FUNCTIONS //
function stopwatch() {    
    // stopwatch hasn't been started yet
    if (!startedWatch) {
        stopwatchTxt.innerHTML = "0000";
        stopwatchButton.innerHTML = "STOP";
    }
    // stopwatch has already been started -- reset all values
    else {
        currentWatch = 0;
        stopwatchTxt.innerHTML = "This is where my stopwatch will go."
        stopwatchButton.innerHTML = "START";
    }
    startedWatch = !startedWatch;
}

function countdown() {
    // timer hasn't been started yet
    if (!startedTimer) {
        // globally store the currently selected min and sec values
        mins = minSelect.value;
        secs = secSelect.value;

        console.log("mins: " + mins + "\n" + "secs: " + secs);

        countdownButton.innerHTML = "RESET";
    }
    // timer has already been started -- reset values
    else {
        countdownButton.innerHTML = "START";
        mins = minSelect.value;
        secs = secSelect.value;

        // update displayed text
        countdownTxt.innerHTML = padCountdownTimer("0" + mins, "0" + secs);
    }
    startedTimer = !startedTimer;
}

function countdownPause() {
    // only do something if the timer has started
    if (startedTimer) {
        if (!pausedTimer) {
            countdownPauseButton.innerHTML = "RESUME";
        }
        else {
            countdownPauseButton.innerHTML = "PAUSE";
        }
        pausedTimer = !pausedTimer;
    }
}

// HELPER FUNCTIONS //
function padCountdownTimer(m, s) {
    return m.substr(m.length - 2) + ":" + s.substr(s.length - 2);
}

// function called every x milliseconds
setInterval( function() {
    // update stopwatch
    if (startedWatch) {
        currentWatch++;
        // assuming keeping time a max of 4 digits -- pad with zeroes
        var withZeroes = "000" + currentWatch;
        stopwatchTxt.innerHTML = withZeroes.substr(withZeroes.length - 4);
    }
    // update countdown timer
    if (startedTimer && !pausedTimer) {
        // check if we're done
        if (secs == 0 && mins == 0) {
            startedTimer = false;
            // countdownTxt.innerHTML = countdownTxt.innerHTML + " **DONE!!**";
            countdownButton.innerHTML = "START";
        }
        else {
            if (secs == 0 && mins > 0) {
                mins--;
                secs = 59;
            }
            else if (secs > 0) {
                secs--;
            }
    
            // update displayed text
            countdownTxt.innerHTML = padCountdownTimer("0" + mins, "0" + secs);
        }
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

    // set up calback function for when a minute value is set
    minSelect.onchange = function() {
        // need two zeroes for seconds because initially empty
        countdownTxt.innerHTML = padCountdownTimer("0" + this.value, "00" + secSelect.value);
    }
    // set up calback function for when a second value is set
    secSelect.onchange = function() {
        // need two zeroes for minutes because initially empty
        countdownTxt.innerHTML = padCountdownTimer("00" + minSelect.value, "0" + this.value);
    }
}