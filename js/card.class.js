/**
 * Class Card
 * It contains one of the 52 cards in a blackjack deck
 * @param {Number} suit
 * @param {Number} number
 * @returns {Card}
 */
function Card(suit, number) {
    this.suit = suit;
    this.number = number;
}

/**
 * function value
 * Returns the number value of a card basic in the Blackjack rules
 * @returns {Number}
 */
Card.prototype.value = function () {
    var realValue = this.number;
    
    //The figures have 10 value all of them
    if(realValue > 10){
        realValue = 10;
    }
    //If we got an As the value that truly have is initialy 11
    if(realValue === 1){
        realValue = 11;
    }

    return realValue;
};

/**
 * function isAs
 * Return if this card is an As
 * @returns {Boolean}
 */
Card.prototype.isAs = function(){
    return this.number === 1;
}