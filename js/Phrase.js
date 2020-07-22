/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

const ul = document.querySelector('#phrase ul');

const Phrase = class {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    
    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        console.log(this.phrase);
        for (let i = 0; i < this.phrase.length; i++) {
            const li = document.createElement('li');
            li.classList.add('animate__animated', 'animate__zoomIn');
            if (this.phrase[i] === ' ') {
                li.classList.add('space');
            } else {
                li.classList.add('hide', 'letter', this.phrase[i]);
                li.innerHTML = this.phrase[i];
            }
            ul.appendChild(li);
        }
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        const phraseArray = newGame.activePhrase.phrase.split('');
        for (let i = 0; i < phraseArray.length; i++) {
            if (phraseArray[i] === letter) {
                return true;
            }
        }
        return false;
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        document.querySelectorAll(`.${letter}`).forEach(liLetter => {
            liLetter.classList.replace('hide', 'show');
            liLetter.classList.remove('animate__animated', 'animate__zoomIn');
            liLetter.classList.add('animate__animated', 'animate__tada');
        });
    };
}

