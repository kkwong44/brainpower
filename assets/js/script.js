// Set maximum, minimum number of digits and default values for the game
const maxDigit = 8;
const minDigit = 4;
const maxLevel = 2;
const gameInterval = 4;
const initialMemoryTime = 2000;
const gameTimeInMinute = 10;
let numDigits = minDigit;
let memoryTime = initialMemoryTime;
let score = 0;
let minuteTimer = 0;
let secondTimer = 0;

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // Create boxes to hold numbers for computer generated and player's answer
    createNumberSquares("memory-box", maxDigit);
    createNumberSquares("answer-box", maxDigit);

    // Reset game to initial state
    resetGame(maxDigit);

    // Button event
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let btnType = this.getAttribute("data-type");
            switch(btnType) {
                case "new-game":
                    runNewGame(minDigit);
                    break;
                case "submit":
                    displayResult(numDigits);
                    break;
                case "next":
                    nextLevel(numDigits);
                    break;
                default:
                    alert(`Undefine - ${btnType}`);
            }
        })
    }

    // Key event on answer squares - move to next input field then to submit button
    document.getElementById("answer-box").addEventListener("keyup", function(event) {
        for (let i = 0; i < maxDigit - 1; i++) {
            if (document.getElementsByClassName("answer-square")[i].value.length == 1) {
                document.getElementsByClassName("answer-square")[i+1].focus();
            }
        }
        // Last answer square move to submit button
        if (document.getElementsByClassName("answer-square")[numDigits-1].value.length == 1) {
            document.getElementById("submit").focus();
            document.getElementById("submit").style.outline = "1px solid black";
        }
    })

})

/** 
 * Create squares to hold numbers
 * Use for random generated numbers and player's answer
 */
function createNumberSquares(type, maxDigit) {
    let squares = "";
    // check ID
    if (type == "memory-box" || type == "answer-box") {
        for (let i = 1; i <= maxDigit; i++) {
            // Create html string for each memory square
            if (type == "memory-box") {
                let square = `
                    <div class="memory-square"}>
                        <span>${i}</span>
                    </div>
                `;
                // Update html string for additional square
                squares += square;
            } else {
                // Create html string for each answer square
                if (type == "answer-box") {
                    let square = `
                        <input type="text" class="answer-square" maxlength="1">
                    `;
                    // Update html string for additional square
                    squares += square;
                }
            }
            // Add complete html string to ID section
            let memoryBox = document.getElementById(type);
            memoryBox.innerHTML = squares;
        }
    } else {
        alert(`Unable to Create Number Squares for Undefined ID "${type}"`);
    }
}

/**
 * Enable and Disable button by ID name
 */
function btnDisabled(id,disabled) {
    if (disabled == true) {
        document.getElementById(id).style.background = "#b9b9b9";
        document.getElementById(id).style.boxShadow = "none";
    } else {
        document.getElementById(id).style.background = "green";
        document.getElementById(id).style.boxShadow = "";
    }
    document.getElementById(id).disabled = disabled;
}

/**
 * When mouse moveover the button
 * Set button color as background color
 */
function btnOverIn(id) {
    btn = document.getElementById(id);
    btn.style.background = "#b9b9b9";
}

/**
 * When mouse moveout the button
 * Set button color to green
 */
function btnOverOut(id) {
    btn = document.getElementById(id);
    btn.style.background = "green";
    btn.style.outline = "none";
}

/**
 * Generate random numbers between 0 and 9
 */
function randomGenerator(currentNumDigits) {
    let num = [];
    for (let i = 0; i < currentNumDigits; i++) {
        let num1 = Math.floor(Math.random() * 10);
        num[i] = num1;
    }
    return num;
}

/**
 * Display random numbers in the memory box
 */
function displayNumbers(currentNumDigits) {
    randomGenerator(currentNumDigits);
    for (let i = 0; i < maxDigit; i++) {
        if (i < currentNumDigits) {
            // Reset style and display Numbers in Memory Squares
            let num1 = Math.floor(Math.random() * 10);
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = num1;
            document.getElementsByClassName("memory-square")[i].style.background = "white";
            document.getElementsByClassName("answer-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].value = "";
            document.getElementsByClassName("answer-square")[i].disabled = true;
        } else {
            // Blank and disable unused squares
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
            document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].disabled = true;
        }
    }
}

/**
 * Reset game to initial state
 */
function resetGame(maxDigit) {
    // Reset to constant default vaules
    numDigits = minDigit;
    memoryTime = initialMemoryTime;
    document.getElementById("timer").innerHTML = "Timer: 00:00s";
    // Empty and gray out all squares
    for (let i = 0; i < maxDigit; i++) {
        document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
        document.getElementsByClassName("answer-square")[i].value = "";
        document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
        document.getElementsByClassName("answer-square")[i].style.background = "#b9b9b9";
    }
    // Initialise buttons status
    btnDisabled("new-game", false);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    // Reset Results
    updateScore(-1);
    updateSuccessRate(-1);
}

/**
 * Start a new game with minmum number of digits
 */
function runNewGame(currentNumDigits) {
    resetGame(maxDigit);
    displayNumbers(currentNumDigits);
    document.getElementById("levels").innerHTML = "1 of " + maxLevel;
    btnDisabled("new-game", true);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    // Hide numbers after 3 seconds
    const  time = setTimeout(hideNumbers, memoryTime, currentNumDigits);
    // Start timer
    clock = displayTimer();
}

/**
 * Hide random generated numbers, enable answer squares and submit button
 */
function hideNumbers(currentNumDigits) {
    for (let i = 0; i < currentNumDigits; i++) {
        document.getElementsByClassName("memory-square")[i].children[0].style.color = "#b9b9b9";
        document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
        document.getElementsByClassName("answer-square")[i].style.background = "white";
        document.getElementsByClassName("answer-square")[i].disabled = false;
    }
    btnDisabled("submit", false);
    document.getElementsByClassName("answer-square")[0].focus(); 
}

/**
 * Check player's answer against the random generated number
 */
function checkAnswer(currentNumDigits) {
    let result = 0;
    for (let i = 0; i < currentNumDigits; i++) {
        // Read and display the hidden numbers from the game area and check each digit
        question = parseInt(document.getElementsByClassName("memory-square")[i].textContent);
        answer = parseInt(document.getElementsByClassName("answer-square")[i].value);
        document.getElementsByClassName("memory-square")[i].children[0].style.color = "black";
        // Add 1 to result counter if the digit is wrong
        if (question == answer) {
            result = result + 0;
            // Unhide square to default background color
            document.getElementsByClassName("memory-square")[i].style.background = "white";
        } else {
            result = result + 1;
            // Show the incorrect squares in red
            document.getElementsByClassName("memory-square")[i].style.background = "red";
            document.getElementsByClassName("answer-square")[i].style.background = "red";
        }
    }
    // Display result on screen
    if (result == 0) {
        document.getElementById("result").innerHTML = "CORRECT";
        updateScore(1);
    } else {
        document.getElementById("result").innerHTML = "INCORRECT";
    }
    updateSuccessRate(score);
}

/**
 * Display results when player hit the submit button
 */
function displayResult(currentNumDigits) {
    checkAnswer(currentNumDigits);
    let level = checkCurrentLevel();
    if (level < maxLevel) {
        // Set buttons style and focus on next button
        btnDisabled("submit", true);
        document.getElementById("submit").style.outline = "none";
        btnDisabled("next", false);
        document.getElementById("next").style.outline = "1px solid black";
        document.getElementById("next").focus();
        // Increase dificulty by an extra digit for every game interval and allow an extra half second to memorise
        let difficulty = level % gameInterval;
        if  (difficulty === 0) {
            numDigits = numDigits + 1;
            memoryTime = memoryTime + 500;
        }
    } else {
        // Set buttons style and focus on new game button
        btnDisabled("submit", true);
        document.getElementById("submit").style.outline = "none";
        btnDisabled("new-game", false);
        document.getElementById("new-game").style.outline = "1px solid black";
        document.getElementById("new-game").focus();
        // Stop timer
        clearInterval(clock);
        alert("Game Over");
    }
}

/** 
 * Find current game level from game area
 */
function checkCurrentLevel() {
    let levels = document.getElementById("levels").textContent;
    let stringRight =  (maxLevel.toString).length + 4;
    currentLevel = parseInt(levels.substring(0, stringRight));
    return currentLevel;
}

/**
 * Run next level
 */
 function nextLevel(currentNumDigits) {

    let level = checkCurrentLevel() +1;
    if (level <= maxLevel) {
        document.getElementById("levels").innerHTML = level + " of " + maxLevel;
        displayNumbers(currentNumDigits);
        
        document.getElementById("next").style.outline = "none";
        btnDisabled("new-game", true);
        btnDisabled("submit", true);
        btnDisabled("next", true);
        
        // Hide numbers after 3 seconds
        const  time = setTimeout(hideNumbers, memoryTime, currentNumDigits);
    } else {
        alert("Game Over");
    }
}

/** 
 * Update scores
 */
function updateScore(result) {
    if (result == -1) {
        score = 0;
    } else {
        score = score + result;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

/** 
 * Update success rate
 */
 function updateSuccessRate(currentScore) {
    if (currentScore == -1) {
        document.getElementById("success-rate").innerHTML = "Success Rate: 0.0%";
    } else {
        let rate = (currentScore / parseInt(checkCurrentLevel()) * 100).toFixed(1);
        document.getElementById("success-rate").innerHTML = "Success Rate: " + rate + "%";
    }
}

/**
 * Run timer for the game
 */
function displayTimer() {
    let duration = 0;
    let clock = setInterval(function(){
        // Calculate minutes and seconds
        duration++;
        let min = Math.floor((duration / 60));
        let sec = Math.floor((duration % 60));
        // Convert time to string and to format 00:00s
        miniuteTimer = min.toString();
        secondTimer = sec.toString();
        if (minuteTimer.toString().length == 1) {
            minuteTimer = "0" + minuteTimer;
        }
        if (secondTimer.toString().length == 1) {
            secondTimer = "0" + secondTimer;
        }
        document.getElementById("timer").innerHTML = "Timer: " + minuteTimer + ":" + secondTimer + "s";
        // Game timeout set by global variable
        if (minuteTimer  == gameTimeInMinute){
            clearInterval(clock);
            alert("Timeout - Game OVER");
        }
    }, 1000);
    return clock;
}
