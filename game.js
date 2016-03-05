(function () {
    var deck = new Deck();
    var playerHand  = new Hand(deck);
    var dealerHand  = new Hand(deck);
    var finished    = true;
    
    var paintHands = function(forceVisible){
        document.getElementById("count-dealer").innerHTML = dealerHand.getScore(forceVisible);
        document.getElementById("dealer-cards").innerHTML = dealerHand.showHand(forceVisible);
        document.getElementById("count-player").innerHTML = playerHand.getScore();
        document.getElementById("player-cards").innerHTML = playerHand.showHand();
    };
    
    var startGame = function(){
        deck.createDeck();
        deck.shuffle();
        playerHand.emptyHand();
        playerHand.hit();
        playerHand.hit();
        dealerHand.emptyHand();
        dealerHand.hit();
        dealerHand.hit(true);
        finished = false;
        document.getElementById("message").innerHTML = "";
        toggleDealHitStick(finished);
        paintHands();
    };
    
    var toggleDealHitStick = function(gameOver){
        if(gameOver){
            document.getElementById("hit").style.display = "none";
            document.getElementById("stick").style.display = "none";
            document.getElementById("deal").style.display = "";
        }else{
            document.getElementById("hit").style.display = "";
            document.getElementById("stick").style.display = "";
            document.getElementById("deal").style.display = "none";
        }
    };

    document.getElementById("hit").addEventListener('click', function () {
        if (finished) {
            return;
        }
        playerHand.hit();
        var score = playerHand.getScore();
        if (score > 21) {
            document.getElementById("message").innerHTML = "You lose this hand mate!!";
            dealerHand.showHand(true);
            finished = true;
            toggleDealHitStick(finished);
        }
        paintHands(finished);
    });
    document.getElementById("stick").addEventListener('click', function () {
        if (finished) {
            return;
        }
        
        var dealerScore = dealerHand.getScore(true);
        while (dealerScore < 21 && dealerScore < playerHand.getScore()) {
            dealerHand.hit();
            dealerScore = dealerHand.getScore(true);
        }
        if (dealerScore > 21 || playerHand.getScore() > dealerScore) {
            document.getElementById("message").innerHTML = "You win, congratulations!!";
            finished = true;
            toggleDealHitStick(finished);
        } else {
            document.getElementById("message").innerHTML = "You lose this hand mate!!";
            dealerHand.showHand(true);
            finished = true;
            toggleDealHitStick(finished);
        }
        paintHands(finished);
    });
    document.getElementById("deal").addEventListener('click', function () {
        if(finished){
            startGame();
        }
    });
}());
