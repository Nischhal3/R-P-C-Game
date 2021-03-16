/**
 * Java Script assignment 02
 * Author [Nischhal Shrestha]
 */

const match = document.querySelector('.match');
const startGame = document.querySelector('.start');
const buttons = document.querySelectorAll('.buttons button');
const cHandSignSrc = document.querySelector('.cHand');
const pHandSignSrc = document.querySelector('.pHand');
const winner = document.querySelector('.winner');
const newGame = document.querySelector('.restart');

let playerWinCount = 0;
let computerWinCount = 0;
const winHistory = [];

/**
 * starting the game
 * User can write their name in the input field
 * start screen input will fade out after startGame button click
 */
startGame.addEventListener('click', () => {
    const screen = document.querySelector('.screen');
    const pName = document.querySelector('.player');
    const inputName = document.querySelector('.name');

    screen.classList.add('fadeOut');
    match.classList.add('fadeIn');
    pName.textContent = `${inputName.value} Score`;

    //Adding keyboard input events
    document.addEventListener('keypress', onKeyPress);
});

/**
 * Enables keyboard input
 * User can pick rock, paper or scissors from keyboard 
 * keys instruction: A for rock, S for paper and F for scissors 
 */
const onKeyPress = (keyClicked) => {
    const btnRock = document.querySelector('.rock');
    const btnPaper = document.querySelector('.paper');
    const btnScissors = document.querySelector('.scissors');

    if (keyClicked.key === 'a') {
        btnRock.click();
    } else if (keyClicked.key === 's') {
        btnPaper.click();
    } else if (keyClicked.key === 'f') {
        btnScissors.click();
    }
}


/**
 * Enables button click event
 */
for (let button of buttons) {
    button.addEventListener('click', () => {
        const number = getNumber();
        let playerHandSign = button.textContent;

        //Everthing inside this function will excute after 2 secs/ after hand animation ends
        setTimeout(() => {
            console.log(`User pick: ${playerHandSign}`);

            //assinging return value of displalComputerHandSign to computerHandSign
            let computerHandSign = displayComputerHandSign(number);
            displayPlayerHandSign(playerHandSign);

            //assigning return value of compareHandSign to matchResult
            let matchResult = compareHandSign(playerHandSign, computerHandSign);
            updateResult(matchResult);
            updateScoreToHtml();
            gameWinner();
        }, 2000);

        animation();
        disableButton();
    });
}

/**
 * generating random numbers 0, 1 and 2
 */
const getNumber = () => {
    const num = Math.floor(Math.random() * 3);
    return num;
}

/**
 * displays computer hand sign on page depending upong the number generated
 * 0 = rock, 1 = paper & 2 = scissors
 * returns correspnding string values 'rock', 'paper' or 'scissors' for the displayed sign
 */
const displayComputerHandSign = (number) => {
    let computerHandSign = '';
    if (number === 0) {
        cHandSignSrc.src = './images/rock.png';
        computerHandSign = 'rock';
    } else if (number === 1) {
        cHandSignSrc.src = './images/paper.png';
        computerHandSign = 'paper';
    } else {
        cHandSignSrc.src = './images/scissors.png';
        computerHandSign = 'scissors';
    }
    console.log(`Computer pick: ${computerHandSign}`);
    return computerHandSign;
}

/**
 * displays player hand sign to the page
 */
const displayPlayerHandSign = (playerHandSign) => {
    pHandSignSrc.src = `./images/${playerHandSign}.png`;
}

/**
 * Hands animation
 */
const animation = () => {
    const hands = document.querySelectorAll('.hand');
    cHandSignSrc.style.animation = 'shakeComputer 2s ease';
    pHandSignSrc.style.animation = 'shakePlayer 2s ease';
    for (let hand of hands) {
        hand.addEventListener('animationend', function () {
            hand.style.animation = '';
        })
    }
}

/**
 * disables buttons for 2 second 
 */
const disableButton = () => {
    for (let button of buttons) {
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
        }, 2000);
    }
}

/**
 * @param {*} playerHandSign 
 * @param {*} computerHandSign 
 * compares player and computer had sign
 * returns number corresponding to the sign
 * 0 = It is draw
 * 1 = computer won!
 * 2 = player won!
 */
const compareHandSign = (playerHandSign, computerHandSign) => {
    if (playerHandSign === computerHandSign) {
        console.log('it is draw!');
        return 0;
    } else if (playerHandSign === 'rock') {
        if (computerHandSign === 'paper') {
            console.log('Computer won!');
            return 1;
        } else {
            console.log('Player won!');
            return 2;
        }
    } else if (playerHandSign === 'paper') {
        if (computerHandSign === 'rock') {
            console.log('Player won!');
            return 2;
        } else {
            console.log('Computer won!');
            return 1;
        }
    } else {
        if (computerHandSign === 'rock') {
            console.log('Computer won!');
            return 1;
        } else {
            console.log('Player won!');
            return 2;
        }
    }
}

/**
 * 
 * @param {*} matchResult 
 * keep track of player/computer win history and draw
 */
const updateResult = (matchResult) => {
    const result = document.querySelector('.count');
    if (matchResult === 1) {
        computerWinCount++;
        winHistory.push('Computer won!');
        result.textContent = 'Computer won!';
    } else if (matchResult === 2) {
        playerWinCount++;
        winHistory.push('Player Won!');
        result.textContent = 'Player won!';
    } else {
        winHistory.push('It is draw!');
        result.textContent = 'It is draw!';
    }
    //console.log(winHistory);
}

/**
 * updates scores to html page
 */
const updateScoreToHtml = () => {
    const playerScore = document.querySelector('.p-score');
    const computerScore = document.querySelector('.c-score');

    playerScore.textContent = playerWinCount;
    computerScore.textContent = computerWinCount;
}

/**
 * displays game winner
 */
const showWinner = () => {
    const gameOver = document.querySelector('.end-screen');

    match.classList.remove('fadeIn');
    gameOver.classList.add('fadeIn');
}

/**
 * starting new game/ reload page
 */
newGame.addEventListener('click', () => {
    location.reload();
})

/**
 * deciding game winner
 * if player wins 3 times in a row: Player wins
 * if computer wins 3 times in a row: Computer wins
 * Else whoever wins 10 round1, wins the game
 */
const gameWinner = () => {
    const winCount = document.querySelector('.totalWin');
    for (let i = 0; i < winHistory.length; i++) {
        if (winHistory[i] === 'Player Won!' && winHistory[i + 1] === 'Player Won!' && winHistory[i + 2] === 'Player Won!') {
            winner.textContent = 'Player Won!';
            winCount.textContent = `Total win is ${playerWinCount}`;
            document.removeEventListener('keypress', onKeyPress);
            showWinner();
        } else if (winHistory[i] === 'Computer won!' && winHistory[i + 1] === 'Computer won!' && winHistory[i + 2] === 'Computer won!') {
            winner.textContent = 'Computer Won!'
            winCount.textContent = `Total win is ${computerWinCount}`;
            document.removeEventListener('keypress', onKeyPress);
            showWinner();
        } else {
            if (playerWinCount == 10) {
                winner.textContent = 'Player Won!';
                winCount.textContent = `Total win is ${playerWinCount}`;
                document.removeEventListener('keypress', onKeyPress);
                showWinner();
            } else if (computerWinCount == 10) {
                winner.textContent = 'Computer Won!';
                winCount.textContent = `Total win is ${computerWinCount}`;
                document.removeEventListener('keypress', onKeyPress);
                showWinner();
            }
        }
    }
}

