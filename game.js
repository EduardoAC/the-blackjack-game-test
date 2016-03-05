(function () {
    var deck = new Deck();

    deck.createDeck();
    deck.shuffle();

    var playerHand  = new Hand(deck);
    var dealerHand  = new Hand(deck);
    var finished    = false;
    
    var paintHands = function(forceVisible){
        document.getElementById("count-dealer").innerHTML = dealerHand.getScore(forceVisible);
        document.getElementById("dealer-cards").innerHTML = dealerHand.showHand(forceVisible);
        document.getElementById("count-player").innerHTML = playerHand.getScore();
        document.getElementById("player-cards").innerHTML = playerHand.showHand();
    };
    
    var startGame = function(){
        deck.createDeck();
        deck.shuffle();
        document.getElementById("message").innerHTML = "";
        playerHand.emptyHand();
        playerHand.hit();
        playerHand.hit();
        dealerHand.emptyHand();
        dealerHand.hit();
        dealerHand.hit(true);
        paintHands();
        finished = false;
    };
    
    startGame();
    document.getElementById("hit").addEventListener('click', function () {
        if (finished) {
            startGame();
            return;
        }
        playerHand.hit();
        var score = playerHand.getScore();
        if (score > 21) {
            document.getElementById("message").innerHTML = "You lose this hand mate!!";
            dealerHand.showHand(true);
            finished = true;
        }
        paintHands(finished);
    });
    document.getElementById("stick").addEventListener('click', function () {
        if (finished) {
            startGame();
        }
        
        var dealerScore = dealerHand.getScore(true);
        while (dealerScore < 21 && dealerScore < playerHand.getScore()) {
            dealerHand.hit();
            dealerScore = dealerHand.getScore(true);
        }
        if (dealerScore > 21 || playerHand.getScore() > dealerScore) {
            document.getElementById("message").innerHTML = "You win, congratulations!!";
            finished = true;
        } else {
            document.getElementById("message").innerHTML = "You lose this hand mate!!";
            dealerHand.showHand(true);
            finished = true;
        }
        paintHands(finished);
    });
}());
