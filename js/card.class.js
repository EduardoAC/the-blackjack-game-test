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
    this.hidden = false;
}

/**
 * function value
 * Returns the number value of a card basic in the Blackjack rules
 * @returns {Number}
 */
Card.prototype.value = function () {
    var realValue = this.number;

    //The figures have 10 value all of them
    if (realValue > 10) {
        realValue = 10;
    }
    //If we got an As the value that truly have is initialy 11
    if (realValue === 1) {
        realValue = 11;
    }

    return realValue;
};

/**
 * function isAs
 * Return if this card is an As
 * @returns {Boolean}
 */
Card.prototype.isAs = function () {
    return this.number === 1;
}
/**
 * function getBackgroundPosition
 * Return position based in suit and card number
 * @returns {Array}
 */
Card.prototype.getBackgroundPosition = function () {
    // X offset of the sprite is -73px * i
    var xPosition = -73 * (this.number - 1); // We start on As that is 0 offset
    // Y offset of the sprite is -98px * i
    var yPosition = -98 * this.suit;

    return [xPosition, yPosition];
};

/**
 * function hide
 * Hide the card number and suit
 */
Card.prototype.hide = function(){
    this.hidden = true;
};
/**
 * function isHidden
 * return if the card is hidden
 * @returns {Boolean}
 */
Card.prototype.isHidden = function(){
    return this.hidden;
};