// Set maximum, minimum number of digits and default values for the game
let minuteTimer = 0;
let secondTimer = 0;
let bestScore = 0;
let bestScoreTime = "59:99";

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // Constants for the entire game
    const maxDigit = 8; // Maximum number of digits to remember
    const minDigit = 4; // Minumum number of digits to remember
    const maxLevel = 20; // Maximum number of levels
    const gameInterval = 4; // Increase difficulties for every intererval on levels
    const initialMemoryTime = 2000; // Initial memory time in milliseconds
    const gameTimeInMinute = 10; // Maximum game time in minutes
    // Variables for the entire game
    let numDigits = minDigit; // Initially start number of digits as minimum of digits
    let memoryTime = initialMemoryTime // Start memory time from initial value

    // Storing values from the game to the session storage
    sessionStorage.setItem("numDigits",numDigits); // Number of digits
    sessionStorage.setItem("memoryTime",memoryTime); // Memory time for current level
    sessionStorage.setItem("score", 0); // Reset game score to zero

    // Create boxes to hold numbers from random number generator and input from player's answer
    createNumberSquares("memory-box", maxDigit);
    createNumberSquares("answer-box", maxDigit);

    // Button event listener for on mouse over and mouse out
    document.getElementById("submit").addEventListener("mouseover", btnOverIn);
    document.getElementById("submit").addEventListener("mouseout", btnOverOut);
    document.getElementById("next").addEventListener("mouseover", btnOverIn);
    document.getElementById("next").addEventListener("mouseout", btnOverOut);
    document.getElementById("new-game").addEventListener("mouseover", btnOverIn);
    document.getElementById("new-game").addEventListener("mouseout", btnOverOut);

    // Reset game to initial state
    resetGame(maxDigit, minDigit, maxLevel, initialMemoryTime);
    document.getElementById("best-score").innerHTML = "Best Score: --:--";

    // Button event
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let btnType = this.getAttribute("data-type");
            switch(btnType) {
                case "new-game":
                    runNewGame(minDigit, maxDigit, maxLevel, initialMemoryTime, gameTimeInMinute);
                    break;
                case "submit":
                    numDigits = sessionStorage.getItem("numDigits");
                    displayResult(numDigits, maxLevel, gameInterval, gameTimeInMinute);
                    break;
                case "next":
                    numDigits = sessionStorage.getItem("numDigits");
                    nextLevel(numDigits, maxDigit, maxLevel);
                    break;
                case "instruction":
                    popupModal("INSTRUCTION", "", maxLevel, gameTimeInMinute);
                    break;
                default:
                    alert(`Undefined - ${btnType}`);
            }
        })
    }

})

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
    } else {
        alert(`Unable to Create Number Squares for Undefined ID "${type}"`);
    }
}

/**
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
        if (inputValue >= 0 && inputValue <=9 && inputValue != " ") {
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
        document.getElementById("submit").style.outline = "1px solid black";
    }
}

/**
 * Enable and Disable button by ID name
 * @param {*} id (Button Id)
 * @param {*} disabled (True or False)
 */
function btnDisabled(id,disabled) {
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
 * When mouse moveover the button
 * Set button color as background color
 */
 function btnOverIn() {
    btn = this.id;
    btn = document.getElementById(btn);
    btn.style.background = "#b9b9b9";
}

/**
 * When mouse moveout the button
 * Set button color to green
 */
 function btnOverOut() {
    btn = this.id;
    btn = document.getElementById(btn);
    btn.style.background = "green";
    btn.style.outline = "none";
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
 * @param {*} maxDigit (Maximum nuber of squares)
 */
function resetGame(maxDigit, minDigit, maxLevel, initialMemoryTime) {
    // Reset to constant default vaules
    sessionStorage.setItem("numDigits",minDigit);
    sessionStorage.setItem("memoryTime",initialMemoryTime);
    document.getElementById("timer").innerHTML = "Timer: 00:00";
    // Reduce the font size and display fefault message
    document.getElementById("result").style.fontSize = "75%";
    document.getElementById("result").style.marginTop = "10px";
    displayMsg("default", "");
    // Empty and gray out all squares
    for (let i = 0; i < maxDigit; i++) {
        document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
        document.getElementsByClassName("answer-square")[i].value = "";
        document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
        document.getElementsByClassName("answer-square")[i].style.background = "#6a6a6a";
    }
    // Initialise buttons status
    btnDisabled("new-game", false);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    // Reset Results
    updateScore(-1);
    updateSuccessRate(-1, maxLevel);
}

/**
 * Start a new game with minmum number of digits
 * @param {*} currentNumDigits (Number of digits for current game level)
 */
function runNewGame(currentNumDigits, maxDigit, maxLevel, initialMemoryTime, gameTimeInMinute) {
    resetGame(maxDigit, currentNumDigits, maxLevel, initialMemoryTime);
    displayMsg("Hide", "");
    displayNumbers(currentNumDigits, maxDigit);
    document.getElementById("levels").innerHTML = "Level: 1 of " + maxLevel;
    btnDisabled("new-game", true);
    btnDisabled("submit", true);
    btnDisabled("next", true);
    // Hide numbers after memoryTime has elapsed
    let memoryTime = sessionStorage.getItem("memoryTime");
    const  time = setTimeout(hideNumbers, memoryTime, currentNumDigits);
    // Start timer
    clock = displayTimer(maxLevel, gameTimeInMinute);
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
 */
function checkAnswer(currentNumDigits, maxLevel) {
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
 */
function displayResult(currentNumDigits, maxLevel, gameInterval, gameTimeInMinute) {
    checkAnswer(currentNumDigits, maxLevel);
    let level = checkCurrentLevel(maxLevel);
    if (level < maxLevel) {
        // Set buttons style and focus on next button
        btnDisabled("submit", true);
        document.getElementById("submit").style.outline = "none";
        btnDisabled("next", false);
        document.getElementById("next").style.outline = "1px solid black";
        document.getElementById("next").focus();
        // Increase dificulty by an extra digit for every game interval and allow an extra half second to memorise the number
        let difficulty = level % gameInterval;
        if  (difficulty === 0) {
            // Get current values from session storage and update with new values
            numDigits = parseInt(sessionStorage.getItem("numDigits"));
            let memoryTime = parseInt(sessionStorage.getItem("memoryTime"));
            numDigits = numDigits + 1;
            memoryTime = memoryTime + 500;
            sessionStorage.setItem("numDigits",numDigits);
            sessionStorage.setItem("memoryTime",memoryTime);
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
        let best = updateBestScore();
        popupModal("GAME OVER", best, maxLevel, gameTimeInMinute);
    }
}

/** 
 * Find current game level from game area
 * @returns Current Lever Number
 */
function checkCurrentLevel(maxLevel) {
    let levels = document.getElementById("levels").textContent;
    let unwantedChar =  (maxLevel.toString()).length + 11;
    let length = levels.length - unwantedChar;
    currentLevel = parseInt(levels.slice(6 , 7 + length));
    return currentLevel;
}

/**
 * Run next level
 * @param {*} currentNumDigits (Number of digits for current game level)
 */
 function nextLevel(currentNumDigits, maxDigit, maxLevel) {

    displayMsg("Next", "");
    let level = checkCurrentLevel(maxLevel) +1;
    if (level <= maxLevel) {
        document.getElementById("levels").innerHTML = "Level: " + level + " of " + maxLevel;
        displayNumbers(currentNumDigits, maxDigit);
        
        document.getElementById("next").style.outline = "none";
        btnDisabled("new-game", true);
        btnDisabled("submit", true);
        btnDisabled("next", true);
        
        // Hide numbers after memoryTime has elapsed
        let memoryTime = sessionStorage.getItem("memoryTime");
        const  time = setTimeout(hideNumbers, memoryTime, currentNumDigits);
    } else {
        alert("Game Over");
    }
}

/** 
 * Update scores
 */
function updateScore(result) {
    // Get and update current score from session storage
    let score = parseInt(sessionStorage.getItem("score"));
    if (result == -1) {
        score = 0;
    } else {
        score = score + result;
    }
    sessionStorage.setItem("score",score);
    document.getElementById("score").innerHTML = "Score: " + score;
}

/** 
 * Calculate, Update and Add Graphic to represent the success rate
 * @param {*} currentScore (Currrent score from the game)
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
    img.style.verticalAlign ="text-bottom";
    // Select the image to represent the success rate
    switch (rate = Math.round(rate/10)) {
         case 1:
            img.setAttribute("src", "assets/images/success-rate01.png");
            img.setAttribute("alt", "10% Success Rate");
            break;
        case 2:
            img.setAttribute("src", "assets/images/success-rate02.png");
            img.setAttribute("alt", "20% Success Rate");
            break;
        case 3:
            img.setAttribute("src", "assets/images/success-rate03.png");
            img.setAttribute("alt", "30% Success Rate");
            break;
        case 4:
            img.setAttribute("src", "assets/images/success-rate04.png");
            img.setAttribute("alt", "40% Success Rate");
            break;
        case 5:
            img.setAttribute("src", "assets/images/success-rate05.png");
            img.setAttribute("alt", "50% Success Rate");
            break;
        case 6:
            img.setAttribute("src", "assets/images/success-rate06.png");
            img.setAttribute("alt", "60% Success Rate");
            break;
        case 7:
            img.setAttribute("src", "assets/images/success-rate07.png");
            img.setAttribute("alt", "70% Success Rate");
            break;
        case 8:
            img.setAttribute("src", "assets/images/success-rate08.png");
            img.setAttribute("alt", "80% Success Rate");
            break;
        case 9:
            img.setAttribute("src", "assets/images/success-rate09.png");
            img.setAttribute("alt", "90% Success Rate");
            break;
        case 10:
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
 * @returns setInterval identifier
 */
function displayTimer(maxLevel, gameTimeInMinute) {
    let duration = 0;
    let clock = setInterval(function(){
        // Calculate minutes and seconds
        duration++;
        let min = Math.floor((duration / 60));
        let sec = Math.floor((duration % 60));
        // Convert time to string and to format 00:00s
        minuteTimer = min.toString();
        secondTimer = sec.toString();
        if (minuteTimer.toString().length == 1) {
            minuteTimer = "0" + minuteTimer;
        }
        if (secondTimer.toString().length == 1) {
            secondTimer = "0" + secondTimer;
        }
        document.getElementById("timer").innerHTML = "Timer: " + minuteTimer + ":" + secondTimer;
        // Game timeout set by global variable
        if (minuteTimer  == gameTimeInMinute){
            clearInterval(clock);
            popupModal("TIME OUT", "timeout", maxLevel, gameTimeInMinute);
        }
    }, 1000);
    return clock;
}

/**
 * Update best score by comparing the score and time
 * @returns (Best Score, Best Time or Failed)
 */
 function updateBestScore() {
    // Calculate the current best time in seconds
    let bestMin = parseInt(bestScoreTime.substring(0,2)) * 60;
    let bestSec = parseInt(bestScoreTime.substring(3));
    let bestTime = bestMin + bestSec;
    // Calculate the game score in seconds
    let scoreMin = parseInt(minuteTimer) * 60;
    let scoreSec = parseInt(secondTimer);
    let scoreTime = scoreMin + scoreSec;
    // Compare the game score with best score by number of of correct answers
    // and the time to complete the game
    let score = sessionStorage.getItem("score");
    switch (true) {
        case (score > bestScore):
            bestScore = score;
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + "m " + secondTimer + "s)";
            return "Best Score";
            break;
        case (score == bestScore) && (scoreTime < bestTime):
            console.log("scoreTime ", scoreTime);
            console.log("bestScoreTime ", bestScoreTime);
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + "m " + secondTimer + "s)";
            return "Best Time";
            break;
        default:
            return "Failed";
    }
}

/**
 * Display message in the result section
 * @param {*} message (0-9 ONLY, Answer, Correct, Incorrect, Next or Hide)
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
            msg = "Click (NEW GAME) to Start"
        }
    // Update html on id result
    document.getElementById("result").innerHTML = msg;
}

/**
 * Popup box for game over and instruction
 * @param {*} title (INSTRUCTION, GAME OVER or TIME OUT)
 * @param {*} opt1 (INSTRUCTION, timeout, best)
 */
 function popupModal(title, opt1, maxLevel, gameTimeInMinute) {
    // Get current disabled status for all buttons
    let originalState = checkBtnDisabled();
    if (opt1 == "timeout") {
        originalState.btnNewGame = false;
        originalState.btnNext = true;
        originalState.btnSubmit = true;
    }
    // Disable all buttons while modal box is display
    btnDisabled("new-game", true);
    btnDisabled("next", true);
    btnDisabled("submit", true);
    // Get the modal
    let modal = document.getElementById("msg-modal");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("msg-modal-close")[0];
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        // Reset previous disabled status to all buttons
        btnDisabled("new-game", originalState.btnNewGame);
        btnDisabled("next", originalState.btnNext);
        btnDisabled("submit", originalState.btnSubmit);
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // Reset previous disabled status to all buttons
            btnDisabled("new-game", originalState.btnNewGame);
            btnDisabled("next", originalState.btnNext);
            btnDisabled("submit", originalState.btnSubmit);
        }
    }
    // Update modal title and contents
    let msg ="";
    let fontSize = "";
    let margin ="";
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
                <p>Score: ${score} / ${maxLevel}</p>
            `;
            textAlign = "center";
            break;
    }
    // Media Query - reyurning font size and margin for modal box
    mQuery = mediaQuery(title);
    fontSize = mQuery.fontSize;
    margin = mQuery.margin; 
    // Update Modal Box
    document.getElementsByClassName("msg-modal-title")[0].innerHTML = title;
    document.getElementsByClassName("msg-modal-body")[0].innerHTML = msg;
    document.getElementsByClassName("msg-modal-body")[0].style.fontSize = fontSize;
    document.getElementsByClassName("msg-modal-body")[0].style.margin = margin;
    document.getElementsByClassName("msg-modal-body")[0].style.textAlign = textAlign;
    // Id instruction-list only created when instruction buttion is clicked
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
    return {fontSize, margin};
}

/**
 * Select game over message and return string to display in modal box.
 * @param {*} bestScore
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
            <li>Click button “Next” to continue to the next level</li>
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
    return {btnNewGame, btnNext, btnSubmit};
}