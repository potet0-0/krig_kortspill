const suits = ['H', 'K', 'R', 'S'];

let deck = suits.flatMap(suit =>
    Array.from({ length: 13 }, (_, i) => ({
        display: `cards/${suit}${String(i + 1).padStart(2, '0')}.png`,
        value: i + 2
    }))
);

let score1 = 0;
let score2 = 0;

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawCard() {
    if (deck.length === 0) return null;
    return deck.pop();
}

deck = shuffle(deck);
console.log(deck.map(card => card.display));

const button = document.getElementById("draw-btn");
const display1 = document.getElementById("card1-display");
const display2 = document.getElementById("card2-display");
const result = document.getElementById("result");
const deckCount = document.getElementById("deck-count");
const scoreEl1 = document.getElementById("score1");
const scoreEl2 = document.getElementById("score2");

function setResult(text, type) {
    result.textContent = text;
    result.className = `result-text ${type}`;
}

button.addEventListener("click", () => {
    const card1 = drawCard();
    const card2 = drawCard();

    if (card1 === null || card2 === null) {
        setResult("Ingen flere kort!", "empty");
        button.disabled = true;
        return;
    }

    display1.classList.remove("flip");
    display2.classList.remove("flip");
    void display1.offsetWidth;
    void display2.offsetWidth;
    display1.classList.add("flip");
    display2.classList.add("flip");

    display1.innerHTML = `<img src="${card1.display}" alt="kort">`;
    display2.innerHTML = `<img src="${card2.display}" alt="kort">`;
    deckCount.textContent = deck.length;

    // Remove highlights
    scoreEl1.classList.remove("highlight");
    scoreEl2.classList.remove("highlight");

    if (card1.value > card2.value) {
        score1 += 2;
        scoreEl1.textContent = score1;
        scoreEl1.classList.add("highlight");
        setResult("Spiller 1 vinner!", "win1");
    } else if (card2.value > card1.value) {
        score2 += 2;
        scoreEl2.textContent = score2;
        scoreEl2.classList.add("highlight");
        setResult("Spiller 2 vinner!", "win2");
    } else {
        setResult("Uavgjort!", "tie");
    }

    if (deck.length === 0) {
        if (score1 > score2) setResult("Spiller 1 vinner spillet!", "win1");
        else if (score2 > score1) setResult("Spiller 2 vinner spillet!", "win2");
        else setResult("Uavgjort!", "tie");
        button.disabled = true;
    }
});