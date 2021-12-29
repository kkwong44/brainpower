// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "new-game") {
                runNewGame();
            } else {
                let gameType = this.getAttribute("data-type");
                alert(`Undefine - ${gameType}`);
            }
        })
    }
})

/** 
 * Create squares to hold numbers
 * Use for random generated numbers and player's answer
 */
function createNumberSquares(type) {
    let squares = "";
    let numberOfDigit = 8;
    // check ID
    if (type == "memory-box" || type == "answer-box") {
        for (let i = 1; i <= numberOfDigit; i++) {
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
                        <input type="text" class="answer-square">
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

// Create boxes to hold numbers for computer generated and player's answer
createNumberSquares("memory-box");
createNumberSquares("answer-box");

/**
 * Generate random numbers between 0 and 9
 */
function randomGenerator(digits) {
    let num = [];
    for (let i = 0; i < digits; i++) {
        let num1 = Math.floor(Math.random() * 10);
        num[i] = num1;
    }
    return num;
}

/**
 * Display random numbers in the memory box
 */
function displayNumbers(digits) {
    randomGenerator(digits);
    for (let i = 0; i < 8; i++) {
        if (i < digits) {
            // Reset style and display Numbers in Memory Squares
            let num1 = Math.floor(Math.random() * 10);
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = num1;
            document.getElementsByClassName("memory-square")[i].style.background = "white";
            document.getElementsByClassName("answer-square")[i].style.background = "white";
            document.getElementsByClassName("answer-square")[i].disabled = false;
        } else {
            // Blank and disable unused squares
            document.getElementsByClassName("memory-square")[i].children[0].innerHTML = "";
            document.getElementsByClassName("memory-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].style.background = "#b9b9b9";
            document.getElementsByClassName("answer-square")[i].disabled = true;
        }
    }
}
