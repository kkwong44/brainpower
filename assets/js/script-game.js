// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve constant values which declared from the index script for the game
    // Set default values if session storage constants do not exist
    const maxDigit = sessionStorage.getItem("maxDigit") ? sessionStorage.getItem("maxDigit") : 8; // Maximum number of digits to remember
    const minDigit = sessionStorage.getItem("minDigit") ? sessionStorage.getItem("minDigit") : 4; // Minimum number of digits to remember
    const maxLevel = sessionStorage.getItem("maxLevel") ? sessionStorage.getItem("maxLevel") : 20; // Maximum number of levels
    const gameInterval = sessionStorage.getItem("gameInterval") ? sessionStorage.getItem("gameInterval") : 4; // Increase difficulties for every interval on levels
    const initialMemoryTime = sessionStorage.getItem("initialMemoryTime") ? sessionStorage.getItem("initialMemoryTime") : 1500; // Initial memory time in milliseconds
    const gameTimeInMinute = sessionStorage.getItem("gameTimeInMinute") ? sessionStorage.getItem("gameTimeInMinute") : 10; // Maximum game time in minutes

    // Variables for the entire game
    let numDigits = minDigit; // Initially start number of digits as minimum of digits
    let memoryTime = initialMemoryTime; // Start memory time from initial value

    // Storing values from the game to the session storage
    sessionStorage.setItem("numDigits", numDigits); // Number of digits
    sessionStorage.setItem("memoryTime", memoryTime); // Memory time for current level
    sessionStorage.setItem("score", 0); // Reset game score to zero
    sessionStorage.setItem("minuteTimer", 0); // Reset timer minute to zero
    sessionStorage.setItem("secondTimer", 0); // Reset timer second to zero

    // Check and update initial best values stored locally
    checkBestValues();

    // Create boxes to hold numbers from random number generator and input from player's answer
    createNumberSquares("memory-box", maxDigit);
    createNumberSquares("answer-box", maxDigit);

    // Button event listener for on mouse over and mouse out
    btnMouseStyle();

    // Button event listener for button on focus
    btnFocusStatus();

    // Reset game to initial state
    resetGame(maxDigit, minDigit, maxLevel, initialMemoryTime);
    let clockId = "";

    // Button click event
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let btnType = this.getAttribute("data-type");
            switch (btnType) {
                case "new-game":
                    // Start timer
                    clockId = displayTimer(maxLevel, gameTimeInMinute);
                    // Use constants declared from the main function
                    runNewGame(minDigit, maxDigit, maxLevel, initialMemoryTime);
                    break;
                case "submit":
                    numDigits = sessionStorage.getItem("numDigits");
                    // Use constants declared from the main function and updated session storage value
                    displayResult(numDigits, maxLevel, gameInterval, gameTimeInMinute, clockId);
                    break;
                case "next":
                    numDigits = sessionStorage.getItem("numDigits");
                    // Use constants declared from the main function and updated session storage value
                    nextLevel(numDigits, maxDigit, maxLevel);
                    break;
                case "instruction":
                    // Use constants declared from the main function
                    popupModal("INSTRUCTION", "", maxLevel, gameTimeInMinute);
                    break;
            }
        });
    }

});

/**
 * Check best values from local storage and use to display on the screen
 */
function checkBestValues() {
    const bestScore = localStorage.getItem('bestScore');
    const bestScoreTime = localStorage.getItem('bestScoreTime');
    if (bestScore) {
        if (bestScoreTime) {
            const bestMin = bestScoreTime.substring(0, 2);
            const bestSec = bestScoreTime.substring(3);
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + bestMin + "m " + bestSec + "s)";
        } else {
            localStorage.setItem("bestScoreTime", "59:59");
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + " --:--";
        }
    } else {
        localStorage.setItem("bestScore", 0);
        if (bestScoreTime) {
            const bestMin = bestScoreTime.substring(0, 2);
            const bestSec = bestScoreTime.substring(3);
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + bestMin + "m " + bestSec + "s)";
        } else {
            localStorage.setItem("bestScoreTime", "59:59");
            document.getElementById("best-score").innerHTML = "Best Score: --:--";
        }
    }
}

/**
 * Button event listener for on mouse over and mouse out.
 * Buttons NEW GAME, SUBMIT and NEXT
 */
function btnMouseStyle() {
    // Button event listener for on mouse over and mouse out
    document.getElementById("submit").addEventListener("mouseover", btnOverIn);
    document.getElementById("submit").addEventListener("mouseout", btnOverOut);
    document.getElementById("next").addEventListener("mouseover", btnOverIn);
    document.getElementById("next").addEventListener("mouseout", btnOverOut);
    document.getElementById("new-game").addEventListener("mouseover", btnOverIn);
    document.getElementById("new-game").addEventListener("mouseout", btnOverOut);
}

/**
 * When mouse moveover the button
 * Set button color as background color
 */
function btnOverIn() {
    let btn = this.id;
    btn = document.getElementById(btn);
    btn.style.background = "#009000";
    btn.style.boxShadow = "4px 4px #1a1a1a";
}

/**
 * When mouse moveout the button
 * Set button color to green
 */
function btnOverOut() {
    let btn = this.id;
    btn = document.getElementById(btn);
    btn.style.background = "green";
    btn.style.outline = "none";
    if (document.activeElement == btn) {
        btn.style.boxShadow = "4px 4px #4a4a4a";
    } else {
        btn.style.boxShadow = "none";
    }
}

/**
 * Button event listener to check button focus status
 */
function btnFocusStatus() {
    // Button event listener for button on focus
    document.getElementById("submit").addEventListener("focus", btnFocus);
    document.getElementById("submit").addEventListener("focusout", btnFocusOut);
    document.getElementById("next").addEventListener("focus", btnFocus);
    document.getElementById("next").addEventListener("focusout", btnFocusOut);
    document.getElementById("new-game").addEventListener("focus", btnFocus);
    document.getElementById("new-game").addEventListener("focusout", btnFocusOut);
}

/**
 * Set button style while button is on focus
 */
function btnFocus() {
    let btn = this.id;
    btn = document.getElementById(btn);
    btn.style.boxShadow = "4px 4px #4a4a4a";
}

/**
 * Reset button style when button has lost focus
 */
function btnFocusOut() {
    let btn = this.id;
    btn = document.getElementById(btn);
    btn.style.boxShadow = "none";
}

/**
 * Enable and Disable button by ID name
 * @param {*} id (Button Id)
 * @param {*} disabled (True or False)
 */
function btnDisabled(id, disabled) {
    if (disabled == true) {
        document.getElementById(id).style.background = "#a9a9a9";
        document.getElementById(id).style.color = "#d9d9d9";
        document.getElementById(id).style.boxShadow = "none";
    } else {
        document.getElementById(id).style.background = "green";
        document.getElementById(id).style.color = "#fff";
        document.getElementById(id).style.boxShadow = "";
    }
    document.getElementById(id).disabled = disabled;
}

/** 
 * Create squares to hold numbers
 * Use for random generated numbers and player's answer
 * @param {*} type (memory-box or answer-box)
 * @param {*} maxDigit (maximum number of squares)
 */
function createNumberSquares(type, maxDigit) {
    let squares = "";
    // check type from ID
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
                        <input type="text" class="answer-square" aria-label="Answer Square Digit ${i}" id="inputAutoTab${i}" oninput="autoTab()" maxlength="1">
                    `;
                    // Update html string for additional square
                    squares += square;
                }
            }
            // Add complete html string to ID section
            let memoryBox = document.getElementById(type);
            memoryBox.innerHTML = squares;
        }
    }
}

/**
 * This function is call from oninput event in html statement
 * After a value is entered, autoTab to the next answer squares except the last square.
 * Submit button will autofocus when a valid value entered into the last square.
 * It will validate the input value and only accept 0-9 before autotab to the next field.
 */
function autoTab() {
    // Set input value as non-numeric
    let numeric = false;
    // Extract the id number from the current square id name
    let idNumber = document.activeElement.id.substring(12);
    // Read input value from the current square
    let inputValue = document.getElementById("inputAutoTab" + idNumber).value;
    // Validate the input value
    if (inputValue.length == 1) {
        // Check value only has 1 character and between 0-9
        if (inputValue >= 0 && inputValue <= 9 && inputValue != " ") {
            displayMsg("Answer", "");
            numeric = true;
        } else {
            displayMsg("0-9 ONLY", "");
            document.getElementById("inputAutoTab" + idNumber).value = "";
            numeric = false;
        }
    }
    let numDigits = sessionStorage.getItem("numDigits");
    // Autotab to the next square if the value only between 0-9 and the current square is not the last one
    if (idNumber < numDigits && numeric == true) {
        document.getElementsByClassName("answer-square")[idNumber].focus();
    }
    // Auto focus on the submit button when the last square value is between 0-9
    if (idNumber == numDigits && numeric == true) {
        document.getElementById("submit").focus();
    }
}

/**
 * Generate random numbers between 0 and 9
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @returns a random number between 0-9
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
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @param {*} maxDigit (Maximum number of digits set by the game)
 */
function displayNumbers(currentNumDigits, maxDigit) {
    randomGenerator(currentNumDigits);
    for (let i = 0; i < maxDigit; i++) {
        if (i < currentNumDigits) {
            // Reset style and display Numbers in Memory Squares
            let num1 = Math.floor(Math.random() * 10);
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = num1;
            document.getElementsByClassName("memory-square")[i].style.background = "white";
            document.getElementsByClassName("answer-square")[i].style.background = "#6a6a6a";
            document.getElementsByClassName("answer-square")[i].value = "";
            document.getElementsByClassName("answer-square")[i].disabled = true;
        } else {
            // Blank and disable unused squares
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
            document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].style.background = "#6a6a6a";
            document.getElementsByClassName("answer-square")[i].disabled = true;
        }
    }
}

/**
 * Reset game to initial state
 * @param {*} maxDigit (Maximum number of squares)
 * @param {*} minDigit (Minimum number of squares)
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} initialMemoryTime (Initial time to memorise the number)
 */
function resetGame(maxDigit, minDigit, maxLevel, initialMemoryTime) {
    // Reset to constant default values
    sessionStorage.setItem("numDigits", minDigit);
    sessionStorage.setItem("memoryTime", initialMemoryTime);
    document.getElementById("timer").innerHTML = "Timer: 00:00";
    // Reduce the font size and display default message
    document.getElementById("result").style.fontSize = "75%";
    document.getElementById("result").style.marginTop = "10px";
    displayMsg("default", "");
    // Empty and grey out all squares
    for (let i = 0; i < maxDigit; i++) {
        document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
        document.getElementsByClassName("answer-square")[i].value = "";
        document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
        document.getElementsByClassName("answer-square")[i].style.background = "#6a6a6a";
        document.getElementsByClassName("answer-square")[i].disabled = true;
    }
    // Initialise buttons status
    btnDisabled("new-game", false);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    document.getElementById("new-game").focus();
    // Reset Results
    updateScore(-1);
    updateSuccessRate(-1, maxLevel);
}

/**
 * Start a new game with minimum number of digits
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @param {*} maxDigit (Maximum number of squares)
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} initialMemoryTime (Initial time to memorise the number)
 */
function runNewGame(currentNumDigits, maxDigit, maxLevel, initialMemoryTime) {
    resetGame(maxDigit, currentNumDigits, maxLevel, initialMemoryTime);
    displayMsg("Hide", "");
    displayNumbers(currentNumDigits, maxDigit);
    document.getElementById("levels").innerHTML = "Level: 1 of " + maxLevel;
    btnDisabled("new-game", true);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    // Hide numbers after memoryTime has elapsed
    let memoryTime = sessionStorage.getItem("memoryTime");
    setTimeout(hideNumbers, memoryTime, currentNumDigits);
}

/**
 * Hide random generated numbers, enable answer squares and submit button
 * @param {*} currentNumDigits (Number of digits for current game level)
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
    displayMsg("Answer", "");
}

/**
 * Check player's answer against the random generated number
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @param {*} maxLevel (Maximum number of levels)
 */
function checkAnswer(currentNumDigits, maxLevel) {
    let result = 0;
    for (let i = 0; i < currentNumDigits; i++) {
        // Read and display the hidden numbers from the game area and check each digit
        let question = parseInt(document.getElementsByClassName("memory-square")[i].textContent);
        let answer = parseInt(document.getElementsByClassName("answer-square")[i].value);
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
        document.getElementsByClassName("answer-square")[i].disabled = true;
    }
    // Display result on screen
    if (result == 0) {
        displayMsg("Correct", maxLevel);
        updateScore(1);
    } else {
        displayMsg("Incorrect", maxLevel);
    }
    let score = sessionStorage.getItem("score");
    updateSuccessRate(score, maxLevel);
}

/**
 * Display results when player hit the submit button
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} initialMemoryTime (Initial time to memorise the number)
 * @param {*} gameTimeInMinute (Maximum game time in minutes)
 * @param {*} clockId (Identification number from the timer)
 */
function displayResult(currentNumDigits, maxLevel, gameInterval, gameTimeInMinute, clockId) {
    checkAnswer(currentNumDigits, maxLevel);
    let level = checkCurrentLevel(maxLevel);
    if (level < maxLevel) {
        // Set buttons style and focus on next button
        btnDisabled("submit", true);
        document.getElementById("submit").style.outline = "none";
        btnDisabled("next", false);
        document.getElementById("next").focus();
        // Increase difficulty by an extra digit for every game interval and allow an extra half second to memorise the number
        let difficulty = level % gameInterval;
        if (difficulty === 0) {
            // Get current values from session storage and update with new values
            let numDigits = parseInt(sessionStorage.getItem("numDigits"));
            let memoryTime = parseInt(sessionStorage.getItem("memoryTime"));
            numDigits = numDigits + 1;
            memoryTime = memoryTime + 500;
            sessionStorage.setItem("numDigits", numDigits);
            sessionStorage.setItem("memoryTime", memoryTime);
        }
    } else {
        // Set buttons style and focus on new game button
        btnDisabled("submit", true);
        document.getElementById("submit").style.outline = "none";
        btnDisabled("new-game", false);
        document.getElementById("new-game").focus();
        // Stop timer
        clearInterval(clockId);
        let best = updateBestScore();
        popupModal("GAME OVER", best, maxLevel, gameTimeInMinute);
    }
}

/** 
 * Find current game level from game area
 * @param {*} maxLevel (Maximum number of levels)
 * @returns Current Lever Number
 */
function checkCurrentLevel(maxLevel) {
    let levels = document.getElementById("levels").textContent;
    let unwantedChar = (maxLevel.toString()).length + 11;
    let length = levels.length - unwantedChar;
    let currentLevel = parseInt(levels.slice(6, 7 + length));
    return currentLevel;
}

/**
 * Run next level
 * @param {*} currentNumDigits (Number of digits for current game level)
 * @param {*} maxDigit (Maximum number of squares)
 * @param {*} maxLevel (Maximum number of levels)
 */
function nextLevel(currentNumDigits, maxDigit, maxLevel) {

    displayMsg("Next", "");
    // Increment level up by 1
    let level = checkCurrentLevel(maxLevel) + 1;
    if (level <= maxLevel) {
        document.getElementById("levels").innerHTML = "Level: " + level + " of " + maxLevel;
        displayNumbers(currentNumDigits, maxDigit);
        // Disable all buttons
        document.getElementById("next").style.outline = "none";
        btnDisabled("new-game", true);
        btnDisabled("submit", true);
        btnDisabled("next", true);
        // Hide numbers after memoryTime has elapsed
        let memoryTime = sessionStorage.getItem("memoryTime");
        setTimeout(hideNumbers, memoryTime, currentNumDigits);
    }
}

/** 
 * Update scores
 * @param {*} result (1 or -1)
 */
function updateScore(result) {
    // Get and update current score from session storage
    let score = parseInt(sessionStorage.getItem("score"));
    // Reset game or increment score up by 1
    if (result == -1) {
        score = 0;
    } else {
        score = score + result;
    }
    sessionStorage.setItem("score", score);
    document.getElementById("score").innerHTML = "Score: " + score;
}

/** 
 * Calculate, Update and Add Graphic to represent the success rate
 * @param {*} currentScore (Current score from the game)
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} currentScore 
 * @param {*} maxLevel 
 */
function updateSuccessRate(currentScore, maxLevel) {
    // Calculate the success rate
    let rate = 0;
    if (currentScore == -1) {
        document.getElementById("success-rate").innerHTML = "Success Rate: 0.0%";
    } else {
        rate = (currentScore / parseInt(checkCurrentLevel(maxLevel)) * 100).toFixed(1);
        document.getElementById("success-rate").innerHTML = "Success Rate: " + rate + "%";
    }
    // Set image common attributes
    let img = document.createElement("IMG");
    img.setAttribute("width", "100");
    img.setAttribute("height", "40");
    img.setAttribute("class", "success-bar");
    img.style.verticalAlign = "text-bottom";
    // Select the image to represent the success rate
    switch (true) {
        case (rate > 0) && (rate <= 10):
            img.setAttribute("src", "assets/images/success-rate01.png");
            img.setAttribute("alt", "10% Success Rate");
            break;
        case (rate > 10) && (rate <= 20):
            img.setAttribute("src", "assets/images/success-rate02.png");
            img.setAttribute("alt", "20% Success Rate");
            break;
        case (rate > 20) && (rate <= 30):
            img.setAttribute("src", "assets/images/success-rate03.png");
            img.setAttribute("alt", "30% Success Rate");
            break;
        case (rate > 30) && (rate <= 40):
            img.setAttribute("src", "assets/images/success-rate04.png");
            img.setAttribute("alt", "40% Success Rate");
            break;
        case (rate > 40) && (rate <= 50):
            img.setAttribute("src", "assets/images/success-rate05.png");
            img.setAttribute("alt", "50% Success Rate");
            break;
        case (rate > 50) && (rate <= 60):
            img.setAttribute("src", "assets/images/success-rate06.png");
            img.setAttribute("alt", "60% Success Rate");
            break;
        case (rate > 60) && (rate <= 70):
            img.setAttribute("src", "assets/images/success-rate07.png");
            img.setAttribute("alt", "70% Success Rate");
            break;
        case (rate > 70) && (rate <= 80):
            img.setAttribute("src", "assets/images/success-rate08.png");
            img.setAttribute("alt", "80% Success Rate");
            break;
        case (rate > 80) && (rate <= 90):
            img.setAttribute("src", "assets/images/success-rate09.png");
            img.setAttribute("alt", "90% Success Rate");
            break;
        case (rate > 90) && (rate <= 100):
            img.setAttribute("src", "assets/images/success-rate10.png");
            img.setAttribute("alt", "100% Success Rate");
            break;
        default:
            img.setAttribute("src", "assets/images/success-rate00.png");
            img.setAttribute("alt", "Zero Success Rate");
    }
    // Update image to the game area
    document.getElementById("success-rate").appendChild(img);
}

/**
 * Run timer for the game
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} gameTimeInMinute (Maximum game time in minutes)
 * @returns setInterval identifier
 */
function displayTimer(maxLevel, gameTimeInMinute) {
    let duration = 0;
    let clockId = setInterval(function () {
        // Calculate minutes and seconds
        duration++;
        let min = Math.floor((duration / 60));
        let sec = Math.floor((duration % 60));
        // Convert time to string and to format 00:00s
        let minuteTimer = sessionStorage.getItem("minuteTimer");
        let secondTimer = sessionStorage.getItem("secondTimer");
        minuteTimer = min.toString();
        secondTimer = sec.toString();
        if (minuteTimer.toString().length == 1) {
            minuteTimer = "0" + minuteTimer;
        }
        if (secondTimer.toString().length == 1) {
            secondTimer = "0" + secondTimer;
        }
        document.getElementById("timer").innerHTML = "Timer: " + minuteTimer + ":" + secondTimer;
        sessionStorage.setItem("minuteTimer", minuteTimer);
        sessionStorage.setItem("secondTimer", secondTimer);
        // Game timeout set by global variable
        if (min == gameTimeInMinute) {
            clearInterval(clockId);
            popupModal("TIME OUT", "timeout", maxLevel, gameTimeInMinute);
        }
    }, 1000);
    return clockId;
}

/**
 * Update best score by comparing the score and time
 * @returns (Best Score, Best Time or Failed)
 */
function updateBestScore() {
    // Calculate the current best time in seconds
    let bestScoreTime = localStorage.getItem("bestScoreTime");
    let bestMin = parseInt(bestScoreTime.substring(0, 2)) * 60;
    let bestSec = parseInt(bestScoreTime.substring(3));
    let bestTime = bestMin + bestSec;
    // Calculate the game score in seconds
    let minuteTimer = sessionStorage.getItem("minuteTimer");
    let secondTimer = sessionStorage.getItem("secondTimer");
    let scoreMin = parseInt(minuteTimer) * 60;
    let scoreSec = parseInt(secondTimer);
    let scoreTime = scoreMin + scoreSec;
    // Compare the game score with best score by number of correct answers
    // and the time to complete the game
    let score = parseInt(sessionStorage.getItem("score"));
    let bestScore = parseInt(localStorage.getItem("bestScore"));
    switch (true) {
        case (score > bestScore):
            bestScore = score;
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + "m " + secondTimer + "s)";
            localStorage.setItem('bestScore', bestScore);
            localStorage.setItem("bestScoreTime", bestScoreTime);
            return "Best Score";
        case (score == bestScore) && (scoreTime < bestTime):
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + "m " + secondTimer + "s)";
            localStorage.setItem("bestScoreTime", bestScoreTime);
            return "Best Time";
        default:
            return "Failed";
    }
}

/**
 * Display message in the result section
 * @param {*} message (0-9 ONLY, Answer, Correct, Incorrect, Next or Hide)
 * @param {*} maxLevel (Maximum number of levels)
 */
function displayMsg(message, maxLevel) {
    let msg = document.getElementById("result").textContent;
    // Set default message color to black
    document.getElementById("result").style.color = "black";
    // Select message from the calling position of the game
    switch (message) {
        // Call from key event listener
        case "0-9 ONLY":
            msg = "Hint: Number 0-9 only";
            break;
            // Call from hideNumbers key event listener
        case "Answer":
            msg = "Enter your answer and hit the Submit button";
            break;
            // Call from checkAnswer
        case "Correct":
            if (checkCurrentLevel(maxLevel) != maxLevel) {
                msg = "Correct Answer - Click Next to continue";
            } else {
                msg = "Correct Answer";
            }
            break;
            // call from checkAnswer
        case "Incorrect":
            if (checkCurrentLevel(maxLevel) != maxLevel) {
                msg = "Wrong Answer - Click Next to continue";
            } else {
                msg = "Wrong Answer";
            }
            break;
            // Call from nextLevel
        case "Next":
            msg = "Hide message";
            document.getElementById("result").style.color = "#b9b9b9";
            break;
            // Hide current message on screen
        case "Hide":
            document.getElementById("result").style.color = "#b9b9b9";
            break;
        default:
            msg = "Click (NEW GAME) to Start";
    }
    // Update html on id result
    document.getElementById("result").innerHTML = msg;
}

/**
 * Popup box for game over and instruction
 * @param {*} title (INSTRUCTION, GAME OVER or TIME OUT)
 * @param {*} opt1 (INSTRUCTION, timeout, best)
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} gameTimeInMinute (Maximum game time in minutes)
 */
function popupModal(title, opt1, maxLevel, gameTimeInMinute) {
    // Get current disabled status for all buttons
    let originalState = checkBtnDisabled();
    let duringMemoryTime = originalState.btnNewGame + originalState.btnSubmit + originalState.btnNext;
    if (opt1 == "timeout") {
        originalState.btnNewGame = false;
        originalState.btnNext = true;
        originalState.btnSubmit = true;
    }
    // Disable all buttons while modal box is display
    if (duringMemoryTime < 3) {
        btnDisabled("new-game", true);
        btnDisabled("next", true);
        btnDisabled("submit", true);
    }
    // Get the modal
    let modal = document.getElementById("msg-modal");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("msg-modal-close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        // Reset previous disabled status to all buttons
        if (duringMemoryTime < 3) {
            btnDisabled("new-game", originalState.btnNewGame);
            btnDisabled("next", originalState.btnNext);
            btnDisabled("submit", originalState.btnSubmit);
            if (originalState.btnSubmit == false) {
                document.getElementById("submit").focus();
            } else {
                if (originalState.btnNext == false) {
                    document.getElementById("next").focus();
                } else {
                    document.getElementById("new-game").focus();
                }
            }
        }
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // Reset previous disabled status to all buttons
            if (duringMemoryTime < 3) {
                btnDisabled("new-game", originalState.btnNewGame);
                btnDisabled("next", originalState.btnNext);
                btnDisabled("submit", originalState.btnSubmit);
                if (originalState.btnSubmit == false) {
                    document.getElementById("submit").focus();
                } else {
                    if (originalState.btnNext == false) {
                        document.getElementById("next").focus();
                    } else {
                        document.getElementById("new-game").focus();
                    }
                }
            }
        }
    };
    // Update modal title and contents
    let msg = "";
    let fontSize = "";
    let margin = "";
    let textAlign = "";
    // Get contents for the modal box
    switch (title) {
        case "GAME OVER":
            msg = gameOver(opt1, maxLevel);
            textAlign = "center";
            break;
        case "INSTRUCTION":
            msg = displayInstruction(maxLevel, gameTimeInMinute);
            textAlign = "left";
            break;
        case "TIME OUT":
            let score = sessionStorage.getItem("score");
            msg = `
                <p>Game Over!</p>
                <br>
                <p>This score has not been recorded: ${score} / ${maxLevel}</p>
            `;
            textAlign = "center";
            break;
    }
    // Run Media Query - returning font size and margin for modal box
    let mQuery = mediaQuery(title);
    fontSize = mQuery.fontSize;
    margin = mQuery.margin;
    // Update Modal Box
    document.getElementsByClassName("msg-modal-title")[0].innerHTML = title;
    document.getElementsByClassName("msg-modal-body")[0].innerHTML = msg;
    document.getElementsByClassName("msg-modal-body")[0].style.fontSize = fontSize;
    document.getElementsByClassName("msg-modal-body")[0].style.margin = margin;
    document.getElementsByClassName("msg-modal-body")[0].style.textAlign = textAlign;
    // Id instruction-list only created when instruction button is clicked
    if (opt1 == "INSTRUCTION") {
        document.getElementById("instruction-list").style.fontSize = fontSize;
    }
}

/**
 * Media Query for Modal Box
 * @param {*} boxTitle (INSTRUCTION, GAME OVER or TIME OUT)
 * @returns fontsize and margin
 */
function mediaQuery(boxTitle) {
    let fontSize = "";
    let margin = "";
    // Screen width below 600px
    if (window.matchMedia('screen and (max-width: 599px)').matches) {
        document.getElementsByClassName("msg-modal-content")[0].style.width = "80%";
        if (boxTitle == "INSTRUCTION") {
            fontSize = "100%";
            margin = "30px 10%";
        } else {
            fontSize = "160%";
            margin = "15px";
        }
    } else {
        // Default values for screen width equal or above 600px
        document.getElementsByClassName("msg-modal-content")[0].style.width = "60%";
        if (boxTitle == "INSTRUCTION") {
            fontSize = "120%";
            margin = "30px 10%";
        } else {
            fontSize = "200%";
            margin = "30px";
        }
    }
    // Screen width below 400px
    if (window.matchMedia('screen and (max-width: 399px)').matches) {
        document.getElementsByClassName("msg-modal-content")[0].style.width = "90%";
        if (boxTitle == "INSTRUCTION") {
            fontSize = "90%";
            margin = "25px 5%";
        } else {
            fontSize = "140%";
            margin = "10px";
        }
    }
    // Return values
    return {
        fontSize,
        margin
    };
}

/**
 * Select game over message and return string to display in modal box.
 * @param {*} bestScore (Score status)
 * @param {*} maxLevel (Maximum number of levels)
 * @returns message (Best score, Best Time or Score)
 */
function gameOver(bestScore, maxLevel) {
    let msg = "";
    let score = sessionStorage.getItem("score");
    switch (bestScore) {
        // More correct answers
        case "Best Score":
            msg = `
                <p>Score: ${score} / ${maxLevel}</p>
                <br>
                <p>You Have The Best Score!</p>
            `;
            break;
            // Same number of correct answers but in a quicker time
        case "Best Time":
            msg = `
                <p>Score: ${score} / ${maxLevel}</p>
                <br>
                <p>You have the fastest time for ${score} correct answers!</p>
            `;
            break;
            // Default score
        default:
            msg = `
            <p>Score: ${score} / ${maxLevel}</p>
        `;
    }
    return msg;
}

/**
 * Create html order list for the instruction
 * @param {*} maxLevel (Maximum number of levels)
 * @param {*} gameTimeInMinute (Maximum game time in minutes)
 * @returns html string
 */
function displayInstruction(maxLevel, gameTimeInMinute) {
    let msg = `
        <ol id = "instruction-list">
            <li>Total ${maxLevel} Levels in ${gameTimeInMinute} minutes</li>
            <li>Click "New Game" to start</li>
            <li>Memorise the numbers appear on screen</li>
            <li>Enter the numbers that disappered on screen</li>
            <li>Submit your answer</li>
            <li>Result will returns as correct or wrong answer</li>
            <li>Click button ???Next??? to continue to the next level</li>
            <li>Game finish when you completed level ${maxLevel} or stop after ${gameTimeInMinute} minutes</li>
        </ol>
    `;
    return msg;
}

/**
 * Check disabled status on all buttons
 * @returns button (new game, next, submit)
 */
function checkBtnDisabled() {
    let btnNewGame = document.getElementById("new-game").disabled;
    let btnNext = document.getElementById("next").disabled;
    let btnSubmit = document.getElementById("submit").disabled;
    return {
        btnNewGame,
        btnNext,
        btnSubmit
    };
}

/**
 * This function is call from onclick event in html statement
 * Display and hide menu bar
 */
function menuBar() {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        // Hide menu list
        x.style.display = "none";
    } else {
        // Display menu list
        x.style.display = "block";
    }
}