/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * Global variables
 */

let disabledKeys = [];
let newGame;

/**
 * Functions
 */

// Function that runs when a key is pressed. Pressed key is send to the handleinteraction method of the game class
const keyPressFunction = (e) => {
    let pressedKey = (e.key);
    let regEx = /^[A-Za-z]+$/;

    if (pressedKey.length === 1 && regEx.test(pressedKey) && !disabledKeys.includes(pressedKey) && pressedKey !== 'Enter' && document.querySelector('#overlay').style.display === 'none') {
        disabledKeys.push(pressedKey);
        newGame.handleInteraction(pressedKey);
    }
}

// Function that runs when a click is registered in the keyboard area
const onScreenKeyClick = (e) => {
    if (e.target.classList.contains("key")) {
        newGame.handleInteraction(e.target.innerHTML);
    }
};

// Function that runs when the game is over and the start again button is clicked

const resetGame = () => {
    const oldDisplayedPhrase = document.querySelector('#phrase ul');
    oldDisplayedPhrase.textContent = '';
    newGame = new Game(newGame);
    newGame.startGame();
    newGame.missed = 0;
    let lives = document.querySelectorAll('.tries');
    for (let i = 0; i < lives.length; i++) {
        lives[i].innerHTML = `<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></img>`;
    }

    let enableKeys = document.querySelectorAll('button[disabled="disabled"]');
    for (let i = 0; i < enableKeys.length; i++) {
        enableKeys[i].removeAttribute('disabled');
        enableKeys[i].classList.remove('wrong', 'chosen');
    }

    disabledKeys = [];
};

/**
 * Event Listeners 
 */
// Event listener that listens for click on the start game button 
document.querySelector('#btn__reset').addEventListener('click', () => {
    resetGame();
});

//Event listener that listens for clicks on the on screen keyboard buttons
document.querySelector('#qwerty').addEventListener('click', onScreenKeyClick, false);

// Event listener that listens for keyboard input
document.addEventListener('keyup', keyPressFunction, false);
