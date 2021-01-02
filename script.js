// connect to the HTML elements
var stopwatchTxt = document.getElementById("stopwatch");
var stopwatchButton = document.getElementById("stopwatch-button");
var countdownTxt = document.getElementById("countdown");
var countdownButton = document.getElementById("countdown-button");
var minSelect = document.getElementById("minutes");
var secSelect = document.getElementById("seconds");

// initialize values
var startedWatch = false;
var currentWatch = 0;
var startedTimer = false;
var mins = 0;
var secs = 0;

// listen for button clicks
stopwatchButton.addEventListener("click", stopwatch);
countdownButton.addEventListener("click", countdown);

// callback functions for button clicks
function stopwatch() {    
    // stopwatch hasn't been started yet
    if (startedWatch == false) {
        startedWatch = true;
        stopwatchTxt.innerHTML = "0000";
        stopwatchButton.innerHTML = "STOP";
    }
    // stopwatch has already been started -- reset all values
    else {
        startedWatch = false;
        currentWatch = 0;
        stopwatchTxt.innerHTML = "This is where my stopwatch will go."
        stopwatchButton.innerHTML = "START";
    }
}

function countdown() {
    // timer hasn't been started yet
    if (startedTimer == false) {
        startedTimer = true;
        // store the currently selected min and sec values
        mins = minSelect.value;
        secs = secSelect.value;

        console.log("mins: " + mins + "\n" + "secs: " + secs);

        countdownButton.innerHTML = "STOP";
    }
    // timer has already been started -- reset values
    else {
        startedTimer = false;
        countdownButton.innerHTML = "START";
    }
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
    if (startedTimer) {
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
            var minWithZeroes = "0" + mins;
            var secWithZeroes = "0" + secs;
            countdownTxt.innerHTML = minWithZeroes.substr(minWithZeroes.length - 2)
                                        + ":" + secWithZeroes.substr(secWithZeroes.length - 2);
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
        var minWithZeroes = "0" + this.value;
        var secWithZeroes = "00" + secSelect.value; // need two because initially empty
        countdownTxt.innerHTML = minWithZeroes.substr(minWithZeroes.length - 2)
                                + ":" + secWithZeroes.substr(secWithZeroes.length - 2);

        console.log("minutes: " + minWithZeroes);
        console.log("seconds: " + secWithZeroes);
    }
    // set up calback function for when a second value is set
    secSelect.onchange = function() {
        var secWithZeroes = "0" + this.value;
        var minWithZeroes = "00" + minSelect.value; // need two because initially empty
        countdownTxt.innerHTML = minWithZeroes.substr(minWithZeroes.length - 2)
                                + ":" + secWithZeroes.substr(secWithZeroes.length - 2);

        console.log("minutes: " + minWithZeroes);
        console.log("seconds: " + secWithZeroes);
    }
}