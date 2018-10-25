var playarea = document.querySelector('.playarea');
var step = 0;// determines who is player
var fieldsquareList = document.querySelectorAll('.fieldsquare');
var horizontal = document.querySelector('.horizontal');
var vertical = document.querySelector('.vertical');
var diagonal = document.querySelector('.diagonal');
var reset;
var dataArray = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function clearTable() {
    fieldsquareList.forEach(function (item) {
        item.innerText = '';
    });

    horizontal.classList.remove('line0');
    horizontal.classList.remove('line1');
    horizontal.classList.remove('line2');

    vertical.classList.remove('vline0');
    vertical.classList.remove('vline1');
    vertical.classList.remove('vline2');

    diagonal.classList.remove('left');
    diagonal.classList.remove('right');

    reset = false;
    dataArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    step = 0;
}

function getWinner(winningCombination) {
    if (winningCombination === 3) {
        var winner = document.querySelector('.winner');
        winner.innerText = +winner.innerText + 1;
    }

    if (winningCombination === 15) {
        var scoreList = document.querySelectorAll('.score');

        scoreList.forEach(function (item) {
            item.classList.toggle('winner');
        });
        var winner = document.querySelector('.winner');
        winner.innerText = +winner.innerText + 1;
    }
}

function finalResult() {
    for (var i = 0; i < dataArray.length; i++) {
        var currentArray = dataArray[i];
        var horizontalLine = 0;

        for (var j = 0; j < currentArray.length; j++) {
            horizontalLine += currentArray[j];
        }

        if (horizontalLine === 3 || horizontalLine === 15) {
            var linePosition = 'line' + i;
            var hLine = document.querySelector('.horizontal');
            hLine.classList.add(linePosition);
            getWinner(horizontalLine);
            reset = true;
            return reset;
        }
    }

    var verticalLine0 = 0;
    var verticalLine1 = 0;
    var verticalLine2 = 0;
    var diagonalLine1 = 0;

    for (var o = 0; o < dataArray.length; o++) {
        var currentArray1 = dataArray[o];
        verticalLine0 += currentArray1[0];
        verticalLine1 += currentArray1[1];
        verticalLine2 += currentArray1[2];
        diagonalLine1 = diagonalLine1 + currentArray1[o];
    }

    var array1 = dataArray[0];
    var array2 = dataArray[1];
    var array3 = dataArray[2];
    var diagonalLine2 = array1[2] + array2[1] + array3[0];

    if (verticalLine0 === 3 || verticalLine0 === 15) {
        var vLine0 = document.querySelector('.vertical');
        vLine0.classList.add('vline0');
        getWinner(verticalLine0);
        reset = true;
        return reset;
    }
    if (verticalLine1 === 3 || verticalLine1 === 15) {
        var vLine1 = document.querySelector('.vertical');
        vLine1.classList.add('vline1');
        getWinner(verticalLine1);
        reset = true;
        return reset;

    }
    if (verticalLine2 === 3 || verticalLine2 === 15) {
        var vLine2 = document.querySelector('.vertical');
        vLine2.classList.add('vline2');
        getWinner(verticalLine2);
        reset = true;
        return reset;
    }

    if (diagonalLine1 === 3 || diagonalLine1 === 15) {
        var dLine1 = document.querySelector('.diagonal');
        dLine1.classList.add('left');
        getWinner(diagonalLine1);
        reset = true;
        return reset;
    }

    if (diagonalLine2 === 3 || diagonalLine2 === 15) {
        var dLine2 = document.querySelector('.diagonal');
        dLine2.classList.add('right');
        getWinner(diagonalLine2);

        reset = true;
        return reset;
    }

    var fieldsquareCount = 0;
    console.log(fieldsquareCount);

    fieldsquareList.forEach(function (item) {
        if(item.innerText) {
            fieldsquareCount += 1;
            console.log(fieldsquareCount);
        }
    });

    if(fieldsquareCount === 9) {
        clearTable();
    }
}

playarea.addEventListener('click', function (event) {
    if (reset) {
        clearTable();
        var spanList =document.querySelectorAll('span');
        spanList.forEach(function (item) {
            item.classList.toggle('turn')
        });
    } else {

        if (!event.target.innerText) {
            var position = event.target.getAttribute('id');
            var outerArrayCoordinate = position.slice(0, 1);// index in the first Array
            var innerArrayCoordinate = position.slice(1, 2);// index in the second Array
            var innerArray = dataArray[outerArrayCoordinate];
            var spanList =document.querySelectorAll('span');

            if (step % 2 === 0) {
                event.target.innerText = "x";
                step++;
                innerArray[innerArrayCoordinate] = 1;
                spanList.forEach(function (item) {
                    item.classList.toggle('turn')
                });
            } else {
                event.target.innerText = 'o';
                step++;
                innerArray[innerArrayCoordinate] = 5;
                spanList.forEach(function (item) {
                    item.classList.toggle('turn')
                });
            }

            finalResult();
        }
    }
});

var button = document.querySelector('button');

button.addEventListener('click', function () {

    var scoreList = document.querySelectorAll('.score');
    clearTable();
    scoreList.forEach(function (item) {
        item.innerText = 0;
        item.classList.remove('winner');
    });
    var firstPlayer = scoreList[0];
    firstPlayer.classList.add('winner');

});