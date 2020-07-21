/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

const Game = class {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase("Per causam sui intelligo id cujus essentia involvit existentiam sive id cujus natura non potest concipi nisi existens"),
            new Phrase("Per realitatem et perfectionem idem intelligo"),
            new Phrase("Unaquaeque res quantum in se est in suo esse perseverare conatur"),
            new Phrase("Ordo et connexio idearum idem est ac ordo et connexio rerum"),
            new Phrase("Phrases from Spinozas Ethica")];
        this.activePhrase = null;
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * (this.phrases.length))];
    }

    handleInteraction(clickedLetter) {
        const allKeys = document.querySelectorAll('.key');
        let keyOfClickedLetter;
        const phraseString = this.activePhrase.phrase;
        for (let i = 0; i < allKeys.length; i++) {
            if (allKeys[i].innerHTML === clickedLetter) {
                keyOfClickedLetter = allKeys[i];
                allKeys[i].setAttribute('disabled', 'disabled');
            }
        }

        if (this.activePhrase.checkLetter(clickedLetter)) {
            this.activePhrase.showMatchedLetter(clickedLetter);
            keyOfClickedLetter.classList.add('chosen');
            if (this.checkForWin()) {
                let win = true;
                this.gameOver(true);
            }    
        } else {
            this.removeLife();
            keyOfClickedLetter.classList.add('wrong');
        }
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        this.missed += 1;
        let lives = document.querySelectorAll('.tries');
        lives[lives.length - this.missed].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30"></img>`;
        if (this.missed === 5) {
            this.gameOver(false);
        }

    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        let hiddenLetters = document.querySelectorAll('.hide');
        if (hiddenLetters.length === 0) {
            return true;
        }
        return false;
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(win) {
        let overlay = document.querySelector('#overlay');
        let gameOverMessage = document.querySelector('#game-over-message');
        gameOverMessage.classList.remove('animate__animated', 'animate__zoomIn', 'animate__delay');
        overlay.removeAttribute('style');
        document.querySelectorAll('.letter').forEach(liLetter => {
            liLetter.classList.remove('animate__animated', 'animate__zoomIn');
        })
        if (win) {
            gameOverMessage.innerHTML = 'You Won!';
            gameOverMessage.classList.add('animate__animated', 'animate__zoomIn', 'animate__delay');
            if (overlay.classList.contains('lose'))
                overlay.classList.replace('lose', 'win');
            else if (overlay.classList.contains('start')) {
                overlay.classList.replace('start', 'win');
            }

        } else {
            gameOverMessage.innerHTML = 'You lost!';
            overlay.classList.replace('start', 'lose');
            gameOverMessage.classList.add('animate__animated', 'animate__zoomIn', 'animate__delay');
            if (overlay.classList.contains('win'))
                overlay.classList.replace('win', 'lose');
            else if (overlay.classList.contains('start')) {
                overlay.classList.replace('start', 'lose');
            }
        }
    }
}
