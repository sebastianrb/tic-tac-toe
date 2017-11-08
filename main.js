jQuery(document).ready(function($) {
    var $squares = $(".square");
    var victoryCounter = 0;
    var $restartButton = $('.restart-p');

    //victory sets - 9 possible
    var $topLeftAcross = $(".square-1, .square-2, .square-3");
    var $topLeftDown = $(".square-1, .square-4, .square-7");
    var $topLeftDiagonal = $(".square-1, .square-5, .square-9");
    var $topMiddleDown = $(".square-2, .square-5, .square-8");
    var $topRightDown = $(".square-3, .square-6, .square-9");
    var $topRightDiagonal = $(".square-3, .square-5, .square-7");
    var $middleLeftAcross = $(".square-4, .square-5, .square-6");
    var $bottomLeftAcross = $(".square-7, .square-8, .square-9");

    var whoStartsNumber = (Math.random()).toFixed(2);

    if(whoStartsNumber > .5) {
        randomComputerMove();
    }

    //handle clicks
    $squares.on('click', function(event) {
        event.preventDefault();

        //get clicked square
        var $clickedSquare = $(this);

        //get and insert image
        var $imageElement = generateImage("x");
        $clickedSquare.append($imageElement);
        setTimeout(function() {
            $clickedSquare.find("img").addClass("appear");
        }, 100);

        //set class and disable clicked square
        $clickedSquare.removeClass('status-empty').addClass("status-x");

        //check for victory
        if (victoryCheck(".status-x")) {
            return;
        }

        if ($(".status-empty").length === 0) {
            console.log("A tie");
            $('.tie-alert').addClass("tie");
            return;
        }

        computerMove();
    });

    $restartButton.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $('.square').removeClass("status-o status-x").addClass("status-empty");
        $('.end-strike').removeClass("end-strike--shown").css('z-index', '-10');
        $('.tie-alert').removeClass('tie');
        $('.win-alert').removeClass('win');
        $('.board').find('img').removeClass("appear");
        setTimeout(function() {
            $('.board').find('img').remove();
            whoStartsNumber = (Math.random()).toFixed(2);
            if(whoStartsNumber > 0.5) {
                randomComputerMove();
            }
        }, 300);
    });

    //computer move function
    function computerMove() {

        //implement some basic AI
        //check victory sets; if there are any with two x marks, computer should generate random number to decide whether or not it will be smart
        //generate random number in between 0 and 1 using Math.Random()
        //if number is between 0 and .6, computer should be smart and look for sets with two x marks and fill in the third with an o
        //if number is between .61 and 1, computer should do random move

        //check for possible computer victory
        if(($topLeftAcross.filter(".status-o").length === 2 && $topLeftAcross.filter(".status-empty").length === 1) ||
            ($topLeftDown.filter(".status-o").length === 2 && $topLeftDown.filter(".status-empty").length === 1) ||
            ($topLeftDiagonal.filter(".status-o").length === 2 && $topLeftDiagonal.filter(".status-empty").length === 1) ||
            ($topMiddleDown.filter(".status-o").length === 2 && $topMiddleDown.filter(".status-empty").length === 1) ||
            ($topRightDown.filter(".status-o").length === 2 && $topRightDown.filter(".status-empty").length === 1) ||
            ($topRightDiagonal.filter(".status-o").length === 2 && $topRightDiagonal.filter(".status-empty").length === 1) ||
            ($middleLeftAcross.filter(".status-o").length === 2 && $middleLeftAcross.filter(".status-empty").length === 1) ||
            ($bottomLeftAcross.filter(".status-o").length === 2 && $bottomLeftAcross.filter(".status-empty").length === 1)) {

            if ($topLeftAcross.filter(".status-o").length === 2 && $topLeftAcross.filter(".status-empty").length === 1) {
                $smartComputerMove = $topLeftAcross.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($topLeftDown.filter(".status-o").length === 2 && $topLeftDown.filter(".status-empty").length === 1) {
                $smartComputerMove = $topLeftDown.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($topLeftDiagonal.filter(".status-o").length === 2 && $topLeftDiagonal.filter(".status-empty").length === 1) {
                $smartComputerMove = $topLeftDiagonal.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($topMiddleDown.filter(".status-o").length === 2 && $topMiddleDown.filter(".status-empty").length === 1) {
                $smartComputerMove = $topMiddleDown.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($topRightDown.filter(".status-o").length === 2 && $topRightDown.filter(".status-empty").length === 1) {
                $smartComputerMove = $topRightDown.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($topRightDiagonal.filter(".status-o").length === 2 && $topRightDiagonal.filter(".status-empty").length === 1) {
                $smartComputerMove = $topRightDiagonal.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($middleLeftAcross.filter(".status-o").length === 2 && $middleLeftAcross.filter(".status-empty").length === 1) {
                $smartComputerMove = $middleLeftAcross.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            } else if($bottomLeftAcross.filter(".status-o").length === 2 && $bottomLeftAcross.filter(".status-empty").length === 1) {
                $smartComputerMove = $bottomLeftAcross.filter(".status-empty");
                $smartComputerMove.removeClass("status-empty").addClass("status-o");
            }

            //update view
            //get and insert image into smart computer move square
            var $imageElement = generateImage("o");
            console.log("Smart computer move:", $smartComputerMove);
            $smartComputerMove.append($imageElement);
            setTimeout(function() {
                $smartComputerMove.find("img").addClass("appear");
                if(victoryCheck(".status-o")) {
                    return;
                }
                if ($(".status-empty").length === 0) {
                    console.log("A tie");
                    $('.tie-alert').addClass("tie");
                    return;
                }
            }, 300);

            console.log("Computer is near victory and makes smart move to win.");

            return;
        }

        //check victory sets
        if (($topLeftAcross.filter(".status-x").length === 2 && $topLeftAcross.filter(".status-empty").length === 1) ||
            ($topLeftDown.filter(".status-x").length === 2 && $topLeftDown.filter(".status-empty").length === 1) ||
            ($topLeftDiagonal.filter(".status-x").length === 2 && $topLeftDiagonal.filter(".status-empty").length === 1) ||
            ($topMiddleDown.filter(".status-x").length === 2 && $topMiddleDown.filter(".status-empty").length === 1) ||
            ($topRightDown.filter(".status-x").length === 2 && $topRightDown.filter(".status-empty").length === 1) ||
            ($topRightDiagonal.filter(".status-x").length === 2 && $topRightDiagonal.filter(".status-empty").length === 1) ||
            ($middleLeftAcross.filter(".status-x").length === 2 && $middleLeftAcross.filter(".status-empty").length === 1) ||
            ($bottomLeftAcross.filter(".status-x").length === 2 && $bottomLeftAcross.filter(".status-empty").length === 1)) {

            console.log("Computer recognizes player is close to victory...");
            //player is close to winningl geberate random number between 0 and 1
            var computerAIFactor = (Math.random()).toFixed(2);

            if(computerAIFactor > .80) {
                //computer moves randomly
                randomComputerMove();
                console.log("AI Factor is " + computerAIFactor, ", computer moves randomly");
            } else {

                console.log("AI Factor is " + computerAIFactor, ", computer moves intelligently");

                //smart computer move
                var $smartComputerMove;

                if ($topLeftAcross.filter(".status-x").length === 2 && $topLeftAcross.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topLeftAcross.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($topLeftDown.filter(".status-x").length === 2 && $topLeftDown.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topLeftDown.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($topLeftDiagonal.filter(".status-x").length === 2 && $topLeftDiagonal.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topLeftDiagonal.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($topMiddleDown.filter(".status-x").length === 2 && $topMiddleDown.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topMiddleDown.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($topRightDown.filter(".status-x").length === 2 && $topRightDown.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topRightDown.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($topRightDiagonal.filter(".status-x").length === 2 && $topRightDiagonal.filter(".status-empty").length === 1) {
                    $smartComputerMove = $topRightDiagonal.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($middleLeftAcross.filter(".status-x").length === 2 && $middleLeftAcross.filter(".status-empty").length === 1) {
                    $smartComputerMove = $middleLeftAcross.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                } else if($bottomLeftAcross.filter(".status-x").length === 2 && $bottomLeftAcross.filter(".status-empty").length === 1) {
                    $smartComputerMove = $bottomLeftAcross.filter(".status-empty");
                    $smartComputerMove.removeClass("status-empty").addClass("status-o");
                }

                //update view
                //get and insert image into smart computer move square
                var $imageElement = generateImage("o");
                console.log("Smart computer move:", $smartComputerMove);
                $smartComputerMove.append($imageElement);
                setTimeout(function() {
                    $smartComputerMove.find("img").addClass("appear");
                    if(victoryCheck(".status-o")) {
                        return;
                    }
                    if ($(".status-empty").length === 0) {
                        console.log("A tie");
                        $('.tie-alert').addClass("tie");
                        return;
                    }
                }, 300);
            }
        } else {
            //player is not close to victory, random move
            console.log("Player is not close to victory, computer moves randomly");
            randomComputerMove();
        }

        if(victoryCheck(".status-o")) {
            return;
        }

        if ($(".status-empty").length === 0) {
            console.log("A tie");
            $('.tie-alert').addClass("tie");
            return;
        }

    }

    //check for victory
    function victoryCheck(symbolClass) {
        var victory = false;
        if ($topLeftAcross.filter(symbolClass).length === 3 ||
            $topLeftDown.filter(symbolClass).length === 3 ||
            $topLeftDiagonal.filter(symbolClass).length === 3 ||
            $topMiddleDown.filter(symbolClass).length === 3 ||
            $topRightDown.filter(symbolClass).length === 3 ||
            $topRightDiagonal.filter(symbolClass).length === 3 ||
            $middleLeftAcross.filter(symbolClass).length === 3 ||
            $bottomLeftAcross.filter(symbolClass).length === 3) {
                console.log("Winner");
            if ($topLeftAcross.filter(symbolClass).length === 3) {
                $('.topLeftAcross').css("z-index", "10").addClass('end-strike--shown');
            } else if($topLeftDown.filter(symbolClass).length === 3) {
                $('.topLeftDown').css("z-index", "10").addClass('end-strike--shown');
            } else if($topLeftDiagonal.filter(symbolClass).length === 3) {
                $('.topLeftDiagonal').css("z-index", "10").addClass('end-strike--shown');
            } else if($topMiddleDown.filter(symbolClass).length === 3) {
                $('.topMiddleDown').css("z-index", "10").addClass('end-strike--shown');
            } else if($topRightDown.filter(symbolClass).length === 3) {
                $('.topRightDown').css("z-index", "10").addClass('end-strike--shown');
            } else if($topRightDiagonal.filter(symbolClass).length === 3) {
                $('.topRightDiagonal').css("z-index", "10").addClass('end-strike--shown');
            } else if($middleLeftAcross.filter(symbolClass).length === 3) {
                $('.middleLeftAcross').css("z-index", "10").addClass('end-strike--shown');
            } else if($bottomLeftAcross.filter(symbolClass).length === 3) {
                $('.bottomLeftAcross').css("z-index", "10").addClass('end-strike--shown');
            }
                endGameWin(symbolClass);
                return true;
        } else {
            return false;
        }
    }

    function endGameWin(symbol) {
        $('.square').removeClass("status-empty");
        if (symbol === ".status-x") {
            $('.win-alert').text("You win!").addClass("win");
        } else {
            $('.win-alert').text("Computer wins!").addClass("win");
        }
    }

    function  generateImage(symbol) {
        var $newImage = $('<img>');
        $newImage.attr('src', './TicTacToe_Assets/' + symbol.toUpperCase() + ".png");
        $newImage.addClass('letter');
        return $newImage;
    }

    function randomComputerMove() {
        computerReady = true;
        if(computerReady) {
           //get empty squares
          var $emptySquares = $('.status-empty');

          //generate random number from empty squares
          var $numberOfEmptySquares = $emptySquares.length;
          var randomNumber = Math.floor((Math.random() * $numberOfEmptySquares) + 1);

          //select square and disable it
          var $computerMove = $($emptySquares.get(randomNumber - 1));
          $computerMove.removeClass("status-empty").addClass("status-o");

          //get and insert image
          var $imageElement = generateImage("o");
          console.log("Random computer move:", $computerMove);
          $computerMove.append($imageElement);
          setTimeout(function() {
              $computerMove.find("img").addClass("appear");
            if(victoryCheck(".status-o")) {
                return;
            }
              if ($(".status-empty").length === 0) {
                  console.log("A tie");
                  $('.tie-alert').addClass("tie");
                  return;
              }
          }, 300);
        }
    }

});
