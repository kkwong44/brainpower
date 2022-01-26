// Script for index.html
// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // Constants for the entire game
    // The game can be changed from here. eg number of levels for the whole game
    // Note: Number of digits beyond 8 will affect the display
    const maxDigit = 8; // Maximum number of digits to remember
    const minDigit = 4; // Minimum number of digits to remember
    const maxLevel = 20; // Maximum number of levels
    const gameInterval = 4; // Increase difficulties for every interval on levels
    const initialMemoryTime = 1500; // Initial memory time in milliseconds
    const gameTimeInMinute = 10; // Maximum game time in minutes
    // Add constants to session storage
    sessionStorage.setItem("maxDigit", maxDigit);
    sessionStorage.setItem("minDigit", minDigit);
    sessionStorage.setItem("maxLevel", maxLevel);
    sessionStorage.setItem("gameInterval", gameInterval);
    sessionStorage.setItem("initialMemoryTime", initialMemoryTime);
    sessionStorage.setItem("gameTimeInMinute", gameTimeInMinute);
    // Load lists to page
    manualLists();
});

/**
 * Create manual contents for the home page 
 */
function manualLists() {
    // Get constant values from session storage
    const minDigit = sessionStorage.getItem("minDigit");
    const maxLevel = sessionStorage.getItem("maxLevel");
    const gameInterval = sessionStorage.getItem("gameInterval");
    const gameTimeInMinute = sessionStorage.getItem("gameTimeInMinute");
    // List for the game description
    let descList = `
        <li>This game is designed to test your memory.</li>
        <li>A random number will be generated and show on the screen for a short period of time.</li>
        <li>You need to remember this number before it disappeared from the screen.</li>
        <li>The game starts with ${minDigit} digits.</li>
        <li>Difficulties will increase for every ${gameInterval} levels by adding an extra digit.</li>
        <li>Time to memorise the number will also increase for every ${gameInterval} levels.</li>
        <li>There are ${maxLevel} levels and the game is over when you completed the last level.</li>
        <li>Each game has a maximum of ${gameTimeInMinute} minutes to play.</li>
        <li>The game will time out after ${gameTimeInMinute} minutes and the score will not be recorded.</li>
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

/**
 * Display and hide menu bar
 */
function menuBar() {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        // Hide menu list
        x.style.display = "none";
        // Display play game button
        document.getElementById("btn-game").style.display = "block";
    } else {
        // Display menu list
        x.style.display = "block";
        // Hide play game button when scree width is below 768px
        if (window.matchMedia('screen and (max-width: 767px)').matches) {
            document.getElementById("btn-game").style.display = "none";
        } else {
            document.getElementById("btn-game").style.display = "block";
        }
    }
}