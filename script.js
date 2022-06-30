const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firtsCard, secondCard; 
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firtsCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firtsCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firtsCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firtsCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firtsCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firtsCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
