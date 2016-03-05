function Card(suit, number) {
    this.suit = suit;
    this.number = number;
}

Card.prototype.value = function () {
    return (this.number < 11) ? this.number : 10;
};
function Deck() {
    this.cards = [];

}

Deck.prototype.createDeck = function () {
    var cards = [];
    //Create desk with all the cards
    for (var i = 0; i < 52; i++) {
        //Card in 4 group of 13 that means
        //Group 0: clubs 
        //Group 1: spades
        //Group 2: hearts
        //Group 3: diamonds
        var group = Math.floor(i / 13) + 1;

        var value = i % 13 + 1;

        cards.push(new Card(group, value));
    }

    this.cards = this.shuffle(cards);
};

Deck.prototype.shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

    return array;
};

Deck.prototype.getCards = function () {
    return this.cards;
};

Deck.prototype.deal = function () {
    return (this.cards.length > 0) ? this.cards.pop() : false;
};

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

Hand.prototype.emptyHand = function(){
    this.count = 0;
    this.cards = [];
    this.ases = 0;
    this.initialHand();
};
Hand.prototype.addCard = function (card) {
    var value = card.value();
    this.cards.push(card);
    this.count += value;
    if (value === 11) {
        this.ases++;
    }
};
Hand.prototype.getHand = function () {
    return this.cards;
}

Hand.prototype.getScore = function () {
    if (this.ases > 0) {
        while (this.count > 21 && this.aces > 0) {
            this.count -= 10;
            this.aces -= 1;
        }
    }
    return this.count;
};

Hand.prototype.hit = function () {
    if (this.getScore() > 21) {
        return false;
    }
    this.addCard(this.deck.deal());
};

Hand.prototype.stick = function () {
    return this.getScore();
};

var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function Dealer(hand) {
    this.hand = hand;
}

Dealer.prototype.makeHand = function () {
    var value = getRandomMinMax(1, 21);

    while (this.hand.getScore() < value) {
        this.hand.hit();
    }
};

(function () {
    var deck = new Deck();

    deck.createDeck();

    var playerHand  = new Hand(deck);
    var dealerHand  = new Hand(deck);
    var dealer      = new Dealer(dealerHand);
    var finished    = false;
    var restartGame = function(){
        deck.createDeck();
        document.getElementById("messaje").innerHTML = "";
        playerHand.emptyHand();
        dealerHand.emptyHand();
        document.getElementById("count-dealer").innerHTML = dealerHand.getScore();
        document.getElementById("count-player").innerHTML = playerHand.getScore();
        finished = false;
    };
    
    document.getElementById("count-dealer").innerHTML = dealerHand.getScore();
    document.getElementById("count-player").innerHTML = playerHand.getScore();
    document.getElementById("hit").addEventListener('click', function () {
        if (finished) {
            restartGame();
        }
        playerHand.hit();
        var score = playerHand.getScore();
        if (score > 21) {
            document.getElementById("messaje").innerHTML = "You lose this hand mate!!";
            finished = true;
        }
        document.getElementById("count-player").innerHTML = score;
    });
    document.getElementById("stick").addEventListener('click', function () {
        if (finished) {
            restartGame();
        }
        dealer.makeHand();
        var dealerScore = dealerHand.getScore();
        document.getElementById("count-dealer").innerHTML = dealerScore;
        if (dealerScore > 21 || playerHand.getScore() > dealerScore) {
            document.getElementById("messaje").innerHTML = "You win, congratulations!!";
            finished = true;
        } else {
            document.getElementById("messaje").innerHTML = "You lose this hand mate!!";
            finished = true;
        }
    });
}());
