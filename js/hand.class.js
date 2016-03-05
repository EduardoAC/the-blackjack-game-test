/**
 * Class Hand 
 * it will have the cards what you are playing with
 * @param {type} deck
 * @returns {Hand}
 */
function Hand(deck) {
    this.count = 0;
    this.hiddenCardsCount = 0;
    this.cards = [];
    this.ases = 0;
    this.deck = deck;

}

/**
 * function emptyHand
 * it will clear your hand for a new game
 * @returns {undefined}
 */
Hand.prototype.emptyHand = function () {
    this.count = 0;
    this.hiddenCardsCount = 0;
    this.cards = [];
    this.ases = 0;
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
Hand.prototype.updateScore = function (card) {
    var value = card.value();

    //We update the card count to avoid unnecesary loops on getScore
    if(card.isHidden()){
        this.hiddenCardsCount += value;
    }else{
        this.count += value;
    }
        
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
 * @param {Boolean} forceVisible count the hidden cards
 * @returns {Number}
 */
Hand.prototype.getScore = function (forceVisible) {
    var totalCount = this.count, ases = this.ases;

    if(forceVisible){
        totalCount += this.hiddenCardsCount;
    }
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
 * @param {Boolean} hidden
 * @returns {Boolean | Card}
 */
Hand.prototype.hit = function (hidden) {
    if (this.getScore() > 21) {
        return false;
    }
    var card = this.deck.deal();
    //Hide the card
    if(hidden){
        card.hide();
    }
    this.addCard(card);
    return card;
};

Hand.prototype.showHand = function (forceVisible) {
    var cards = this.getHand();
    var length = cards.length;
    var html = "", position;
    var hidden = "";
    for (var i = 0; i < length; i++) {
        position = cards[i].getBackgroundPosition();
        if(!forceVisible){
            hidden = (cards[i].isHidden())?"hidden":"";
        }
        html += "<i class='card "+ hidden + "' style='background-position:" 
                + position[0] + "px " 
                + position[1] + "px;'></i>";
    }
    return html;
};
