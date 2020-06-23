
var currentHours = 0;
var currentMins = 0;
var currentSeconds = 0;

var totalSeconds=0;

var resetSeconds=0;

var timerRunning = false;

var alarmSound = new Audio("alarm-analog.mp3");

// Functionality for buttons



$('#start').click(function(){
    timerRunning = true;
    takeUserTime();
    updateTotalSeconds();  
    runTimer();
    var timeInterval = setInterval(runTimer,1000);
    function runTimer(){
        if (totalSeconds <1){
            timerRunning = false;
            alarmSound.play();
        }
        if (!timerRunning){
            clearInterval(timeInterval);
            convertTotalSeconds();
            updatetimer();
        }
        else {
            convertTotalSeconds();
            updatetimer();
            updateTotalSeconds();
            totalSeconds--;
        }
}  
});

$('#stop').click(function(){
    timerRunning = false;
    alarmSound.pause();
}); 

$('#reset').click(function(){
    totalSeconds=resetSeconds;
    convertTotalSeconds();
    updatetimer();
    $('#stop').click();
})

$('#work').click(function(){
    resetSeconds = 1500;
    $('#reset').click();
})

$('#shortBreak').click(function(){
    resetSeconds = 300;
    $('#reset').click();
})

$('#longBreak').click(function(){
    resetSeconds = 1800;
    $('#reset').click();
})


// Ensures user input for hours,minutes,and seconds are all valid inputs
// Could potentially combine a few functions in the future
function takeUserTime(){
    currentHours = checkNan('#hours');
    currentMins = checkNan('#minutes');
    currentSeconds = checkNan('#seconds');
}

// Ensures that the user input for time is a valid number
function checkIfNumber(key){
    var reference = (key.which)? key.which: key.keyCode;
    if (reference >31 &&(reference<48 || reference>57)){
        key.preventDefault();
    }
};

// Converts curentSeconds into a value that is used by the timer
// Probably can be cut out in the future
function updateTotalSeconds(){
    var total =0;
    total = (currentHours * 3600) + (currentMins * 60) + currentSeconds;
    totalSeconds = total;
}

// Converts the value 'currentSeconds' to hours,minutes,and seconds
function convertTotalSeconds(){
    if (totalSeconds > -1){
    currentHours = Math.floor(totalSeconds/3600);
    currentMins = Math.floor((totalSeconds%3600)/60);
    currentSeconds = totalSeconds%60;
    }
}

// Updates the timer display with current timer values
function updatetimer(){
    $('#hours').val(currentHours);
    $('#minutes').val(currentMins);
    $('#seconds').val(currentSeconds);
}

// Checks to see if the input value in corresponding html element is Nan
function checkNan(selector){
    var value = 0;
    value = parseInt($(selector).val());
    if (isNaN(value)){
        return 0;
    }
    else {
        return value;
    }
}