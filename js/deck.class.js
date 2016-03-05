/**
 * Class Deck
 * Deck is a virtual representation of a real 52 cards deck use for Blackjack
 * @returns {Deck}
 */
function Deck() {
    this.cards = [];
}

/*
 * function createDeck
 * Create 52 card which have 13 cards split in 4 suit
 * @returns {undefined}
 */
Deck.prototype.createDeck = function () {
    var cards = [];
    
    //Create desk with all the cards
    for (var i = 0; i < 52; i++) {
        //Suit order
        //Group 0: clubs 
        //Group 1: spades
        //Group 2: hearts
        //Group 3: diamonds
        var group = Math.floor(i / 13) + 1;

        var value = i % 13 + 1;

        cards.push(new Card(group, value));
    }
    this.cards = cards;
};

/**
 * function shuffle 
 * Re-order randomly the cards in the deck to prepare the deck for the game
 */
Deck.prototype.shuffle = function () {
    var array = this.cards, currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
};

/**
 * function getCards
 * Return all the cards left in the deck
 * @returns {Card[]}
 */
Deck.prototype.getCards = function () {
    return this.cards;
};

/**
 * function deal
 * Return the next card in the top of the deck unless we don't have more cards
 * @returns {Card}
 */
Deck.prototype.deal = function () {
    return (this.cards.length > 0) ? this.cards.pop() : false;
};



