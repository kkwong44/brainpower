// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "new-game") {
                alert("New Game");
            } else {
                let gameType = this.getAttribute("data-type");
                alert(`Undefine - ${gameType}`);
            }
        })
    }
})

/** 
 * Create squares to hold numbers
 * Use for random generated numbers and player's anwser
 */
function createNumberSquares(type) {
    let squares = "";
    let numberOfDigit = 8;
    // check ID
    if (type == "memory-box" || type == "answer-box") {
        for (let i = 1; i <= numberOfDigit; i++) {
            // Use span for memory box
            if (type == "memory-box") {
                boxType = "<span>" + i + "</span>";
            } else {
                // Use input text for answer box
                if (type == "answer-box") {
                    boxType = '<input type="text" class="answer-square">';
                }
            }
            // Create html string for each square
            let square = `
                <div class=${type}>
                    ${boxType}
                </div>
            `;
            // Complete html string and add to the id section
            squares += square;
            let memoryBox = document.getElementById(type);
            memoryBox.innerHTML = squares;
        }
    } else {
        alert(`Unable to Create Number Squares for Undefined ID "${type}"`);
    }
}

// Create boxes to hold numbers for computer generated and player's anwser
createNumberSquares("memory-box");
createNumberSquares("answer-box");