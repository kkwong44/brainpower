// Script for index.html
// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {

    manualLists()

})

/**
 * Create manual lists for the home page 
 */
function manualLists() {
    // List for the game description
    let descList = `
        <li>This game is designed to test your memory.</li>
        <li>A random number will be generated and show on the screen for a short period of time.</li>
        <li>You need to remember this number before it disappeared from the screen.</li>
        <li>The game starts with 4 digits.</li>
        <li>Difficulties will increase for every 4 levels by adding an extra digit.</li>
        <li>Time to memorise the number will also increase for every 4 levels.</li>
        <li>There are 20 levels and the game is over when you completed the last level.</li>
        <li>Each game has a maximum of 10 minutes to play.</li>
        <li>The game will time out after 10 minutes and the score will not be recorded.</li>
    `;
    let list = document.getElementsByClassName("manual-list")[0];
    list.innerHTML = descList;
    // list for how to play the game
    let playList = `
        <li>Select (NEW GAME) to start the game.</li>
        <li>Enter the number as prompted and submit your answer.</li>
        <li>The result will return to indicate your answer is correct or incorrect.</li>
        <li>Select (NEXT) to proceed to the next level.</li>
        <li>Repeat as above to enter you answer till the game is over.</li>
    `;
    list = document.getElementsByClassName("manual-list")[1];
    list.innerHTML = playList;
    // List for the scoring system
    let scoringList = `
        <li>Score will be updated for each correct answer.</li>
        <li>Best score is calculated by number of correct answers then follow by time.</li>
    `;
    list = document.getElementsByClassName("manual-list")[2];
    list.innerHTML = scoringList;
}
