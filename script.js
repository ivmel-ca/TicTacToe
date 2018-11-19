const playArea = document.querySelector('.playarea'); //  main play area
let step = 0;// determines who is player
const fieldSquareList = document.querySelectorAll('.fieldsquare');// cells of main area
const horizontal = document.querySelector('.horizontal');// winning line
const vertical = document.querySelector('.vertical');// winning line
const diagonal = document.querySelector('.diagonal');// winning line
let reset; // triggers main play area purification
const dataArray = [ // the main array to determine the winner
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const clearTable = () => { // when reset true, cleans every cell of main play area
    fieldSquareList.forEach( (item) =>  item.innerText = '');
    for (let i = 0; i < 3; i++) {
        horizontal.classList.remove('hline' + i);
        vertical.classList.remove('vline' + i);
        diagonal.classList.remove('dLine' + i);

    }
    reset = false;

    dataArray.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            item[i] = 0;
        }
    });
    step = 0;
};

const getWinner = (winningCombination) => { // determines winner

    switch (winningCombination) {
        case 3:
            const winner = document.querySelector('.winner');
            winner.innerText = +winner.innerText + 1;
            break;
        case 15:
            const scoreList = document.querySelectorAll('.score');

            scoreList.forEach(function (item) {
                item.classList.toggle('winner');
            });
            const newWinner = document.querySelector('.winner');
            newWinner.innerText = +newWinner.innerText + 1;
            break;
    }
};

const finalResult= () => {
    const combinations = {// set of counts, that determines where a red 'cross out' line will appear
        'verticalLine0': 0,
        'verticalLine1': 0,
        'verticalLine2': 0,
        'diagonalLine0': 0,
        'diagonalLine1': 0
    };
    for (let i = 0; i < dataArray.length; i++) { // counts from arrays winning number for each line
        const currentArray = dataArray[i];
        combinations.verticalLine0 += currentArray[0];
        combinations.verticalLine1 += currentArray[1];
        combinations.verticalLine2 += currentArray[2];
        combinations.diagonalLine0 += currentArray[i];
        combinations.diagonalLine1 += currentArray[-(i - 2)];

        let horizontalLine = 0;
        
        for (let i = 0; i < currentArray.length; i++) {
            horizontalLine += currentArray[i];
        }

        if ( horizontalLine === 3 ||  horizontalLine === 15) { //set a red line in a certain horizontal position
            const hLine = document.querySelector('.horizontal');
            hLine.classList.add('hline' + i);
            getWinner(horizontalLine);
            reset = true;
            return reset;
        }
    }
    for (let i = 0; i < dataArray.length; i++) {
        const currentVerticalLine = 'verticalLine' + i;

        if (combinations[currentVerticalLine] === 3 || combinations[currentVerticalLine] === 15) {//set a red line
                                                                                    // in a certain vertical position
            const vLine = document.querySelector('.vertical');
            vLine.classList.add('vline' + i);
            getWinner(combinations[currentVerticalLine]);
            reset = true;
            return reset;
        }
    }
    for (let i = 0; i < dataArray.length; i++) {
        const currentDiagonalLine = 'diagonalLine' + i;

        if (combinations[currentDiagonalLine] === 3 || combinations[currentDiagonalLine] === 15) {//set a red line
                                                                                    // in a certain diagonal position
            const dLine = document.querySelector('.diagonal');
            dLine.classList.add('dLine' + i);
            getWinner(combinations[currentDiagonalLine]);
            reset = true;
            return reset;
        }
    }

    let fieldSquareCount = 0;
    const standOffSituation = 9;

    fieldSquareList.forEach((item) => {// counter to determine standoff situation
        if (item.innerText) {
            fieldSquareCount ++;
        }
    });

    if (fieldSquareCount === standOffSituation) { // resolve standoff situation
        clearTable();
        const spanList = document.querySelectorAll('span');
        spanList.forEach( (item) => item.classList.toggle('turn') );//maintains the winner's turn in a standoff
        // situation
    }
};

playArea.addEventListener('click', (event) =>{
    let spanList = document.querySelectorAll('span');

    if (reset) {// winning combination provokes game area cleaning and maintains a turn of a winner
        clearTable();
        spanList.forEach( (item) => item.classList.toggle('turn') );
    } else {

        if (!event.target.innerText) {
            const position = event.target.getAttribute('id');
            const outerArrayCoordinate = position.slice(0, 1);// position coordinate in the first Array
            const innerArrayCoordinate = position.slice(1, 2);// position coordinate in the second Array
            const innerArray = dataArray[outerArrayCoordinate];
            spanList = document.querySelectorAll('span');

            if (step % 2 === 0) { // depends from turn its x or o, and sets matched number in the main array
                event.target.innerText = "x";
                innerArray[innerArrayCoordinate] = 1;

            } else {
                event.target.innerText = 'o';
                innerArray[innerArrayCoordinate] = 5;

            }
            step++;
            spanList.forEach((item) => item.classList.toggle('turn') );// switches turn
            finalResult();
        }
    }
});

const resetButton = document.querySelector('.reset-score');

resetButton.addEventListener('click', () => { // makes a total reset

    const scoreList = document.querySelectorAll('.score');
    clearTable();

    const spanList = document.querySelectorAll('span');
    spanList.forEach( (item) => item.classList.remove('turn') );
    spanList[0].classList.add('turn');
    scoreList.forEach( (item) => {
        item.innerText = 0;
        item.classList.remove('winner');
    });

    const firstPlayer = scoreList[0];
    firstPlayer.classList.add('winner');
});