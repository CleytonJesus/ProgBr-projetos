'use strict'
const front = "card_front";
const back = "card_back";
const icon = "icon";

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameboard");
    gameBoard.innerHTML = '';
    for (let card of cards) {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(icon, "card");
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('mouseover', () => {
            cardElement.style.cursor = "pointer";
        })
        gameBoard.appendChild(cardElement);
    }
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        let gameOverLayer = document.getElementById("gameover");
                        gameOverLayer.style.display = "flex";
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000)

            }
        }

    }
}

function createCardContent(card, cardElement) {
    createCardFace(front, card, cardElement);
    createCardFace(back, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === front) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(icon);
        iconElement.src = "../images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameover");
    gameOverLayer.style.display = "none";
}





