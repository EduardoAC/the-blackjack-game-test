/**
 * Class Hand 
 * it will have the cards what you are playing with
 * @param {type} deck
 * @returns {Hand}
 */
function Hand(deck) {
    this.count = 0;
    this.cards = [];
    this.ases = 0;
    this.deck = deck;

    this.initialHand = function () {
        this.addCard(deck.deal());
        this.addCard(deck.deal());
    };
    this.initialHand();
}

/**
 * function emptyHand
 * it will clear your hand for a new game
 * @returns {undefined}
 */
Hand.prototype.emptyHand = function(){
    this.count = 0;
    this.cards = [];
    this.ases = 0;
    this.initialHand();
};

/**
 * function addCard
 * Store a new card in our hand
 * - if we got an As in our card we keep in mind for our card count
 * @param {Card} card
 */
Hand.prototype.addCard = function (card) {
    this.cards.push(card);
    this.updateScore(card);
};

/**
 * function updateScore
 * Update card count based in the value of the card
 * @param {type} card
 */
Hand.prototype.updateScore = function(card){
    var value = card.value();
    
    //We update the card count to avoid unnecesary loops on getScore
    this.count += value;
    
    //As is defined as 11 value
    if (card.isAs()) {
        this.ases++;
    }    
};

/**
 * function getHand
 * Returns the cards in the hand
 * @returns {Card[]}
 */
Hand.prototype.getHand = function () {
    return this.cards;
};

/**
 * function getScore
 * Return the total card count based in them number
 * - We have to check to review Ases because it has double value 
 * based in the total count
 * @returns {Number}
 */
Hand.prototype.getScore = function () {
    var totalCount = this.count, ases = this.ases;

    //Review total score 
    if (ases > 0) {
        while (totalCount > 21 && ases > 0) {
            totalCount -= 10;
            ases -= 1;
        }
    }
    
    return totalCount;
};

/**
 * function hit 
 * it allows to get a new card from the deck unless we raise more than 21 already
 * @returns {Boolean}
 */
Hand.prototype.hit = function () {
    if (this.getScore() > 21) {
        return false;
    }
    this.addCard(this.deck.deal());
};


