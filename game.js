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
    deck.shuffle();

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
