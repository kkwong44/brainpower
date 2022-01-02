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
let bestScore = 0;
let bestScoreTime = "59:99";

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // Create boxes to hold numbers for computer generated and player's answer
    createNumberSquares("memory-box", maxDigit);
    createNumberSquares("answer-box", maxDigit);

    // Reset game to initial state
    resetGame(maxDigit);
    document.getElementById("best-score").innerHTML = "Best Score: --:--";

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
                case "instruction":
                    popupModal("INSTRUCTION");
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
 */
function resetGame(maxDigit) {
    // Reset to constant default vaules
    numDigits = minDigit;
    memoryTime = initialMemoryTime;
    document.getElementById("timer").innerHTML = "Timer: 00:00s";
    // Reduce the font size and hide result section
    document.getElementById("result").style.fontSize = "75%";
    document.getElementById("result").style.marginTop = "10px";
    document.getElementById("result").style.color = "#b9b9b9";
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
    displayMsg("Answer");
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
        displayMsg("Correct");
        updateScore(1);
    } else {
        displayMsg("Incorrect");
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
        let best = updateBestScore();
        popupModal("GAME OVER", best);
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

    displayMsg("Next");
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
 * Calculate, Update and Add Graphic to represent the success rate
 */
 function updateSuccessRate(currentScore) {
    // Calculate the success rate
    let rate = 0;
    if (currentScore == -1) {
        document.getElementById("success-rate").innerHTML = "Success Rate: 0.0%";
    } else {
        rate = (currentScore / parseInt(checkCurrentLevel()) * 100).toFixed(1);
        document.getElementById("success-rate").innerHTML = "Success Rate: " + rate + "%";
    }
    // Set image common attributes
    let img = document.createElement("IMG");
    img.setAttribute("width", "100");
    img.setAttribute("height", "40");
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
 */
function displayTimer() {
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
        document.getElementById("timer").innerHTML = "Timer: " + minuteTimer + ":" + secondTimer + "s";
        // Game timeout set by global variable
        if (minuteTimer  == gameTimeInMinute){
            clearInterval(clock);
            popupModal("TIME OUT","timeout");
        }
    }, 1000);
    return clock;
}

/**
 * Update best score by comparing the score and time
 */
 function updateBestScore() {
    // Calculate the current best time in seconds
    let bestMin = parseInt(bestScoreTime.substring(0,2)) * 60;
    let bestSec = parseInt(bestScoreTime.substring(3));
    let bestTime = bestMin + bestSec;
    // Calculate the game sacoe in seconds
    let scoreMin = parseInt(minuteTimer) * 60;
    let scoreSec = parseInt(secondTimer);
    let scoreTime = scoreMin + scoreSec;
    // Compare the game score with best score by number of of correct answers
    // and the time to complete the game
    switch (true) {
        case (score > bestScore):
            bestScore = score;
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + ":" + secondTimer +"s)";
            return "Best Score";
            break;
        case (score == bestScore) && (scoreTime < bestTime):
            console.log("scoreTime ", scoreTime);
            console.log("bestScoreTime ", bestScoreTime);
            bestScoreTime = minuteTimer + ":" + secondTimer;
            document.getElementById("best-score").innerHTML = "Best Score: " + bestScore + "      (" + minuteTimer + ":" + secondTimer +"s)";
            return "Best Time";
            break;
        default:
            return "Failed";
    }
}

/**
 * Display message in the result section
 */
function displayMsg(message) {
    let msg = "";
    // Set default message color to black
    document.getElementById("result").style.color = "black";
    // Select message from the calling position of the game
    switch (message) {
        // Call from hideNumbers
        case "Answer":
            msg = "Enter your answer and hit the Submit button";
            break;
        // Call from checkAnswer
        case "Correct":
            if (checkCurrentLevel() != maxLevel) {
                msg = "Correct Answer - Click Next to continue";
            } else {
                msg = "Correct Answer";
            }
            break;
        // call from checkAnswer
        case "Incorrect":
            if (checkCurrentLevel() != maxLevel) {
                msg = "Wrong Answer - Click Next to continue";
            } else {
                msg = "Wrong Answer";
            }
            break;
        // Call from nextLevel
        case "Next":
            msg = "Hide this message by setting the color to background color";
            document.getElementById("result").style.color = "#b9b9b9";
            break;
        }
    // Update html on id result
    document.getElementById("result").innerHTML = msg;
}

/**
 * Popup box for game over and instruction
 * @param {*} title 
 * @param {*} opt1 
 */
 function popupModal(title, opt1) {
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
    switch (title) {
        case "GAME OVER":
            msg = gameOver(opt1);
            fontSize = "200%";
            margin = "30px";
            textAlign = "center";
            break;
        case "INSTRUCTION":
            msg = displayInstruction();
            fontSize = "120%";
            margin = "30px 10%";
            textAlign = "left";
            break;
        case "TIME OUT":
            msg = `
                <p>Game Over!</p>
                <br>
                <p>Score: ${score} / ${maxLevel}</p>
            `;
            fontSize = "200%";
            margin = "30px";
            textAlign = "center";
            break;
    }
    
    document.getElementsByClassName("msg-modal-title")[0].innerHTML = title;
    document.getElementsByClassName("msg-modal-body")[0].innerHTML = msg;
    document.getElementsByClassName("msg-modal-body")[0].style.fontSize = fontSize;
    document.getElementsByClassName("msg-modal-body")[0].style.margin = margin;
    document.getElementsByClassName("msg-modal-body")[0].style.textAlign = textAlign;
    document.getElementById("instruction-list").style.fontSize = fontSize;
}

/**
 * Select game over message and return string to display in modal box.
 * @param {*} bestScore 
 * @returns 
 */
function gameOver(bestScore) {
    let msg = "";
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
                <p>Your Score Have The Quickest Time!</p>
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
function displayInstruction() {
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