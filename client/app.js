
//////////////////////////////////////////
/// Initialize Game Board and Listeners///
//////////////////////////////////////////

function initialize() {
  var playerXScore = document.getElementsByClassName('x-wins')[0];
  var playerOScore = document.getElementsByClassName('o-wins')[0];
  var gameSquares = document.querySelectorAll('td');
  var resetButton = document.querySelectorAll('button')[0];
  var outcomeElement = document.getElementsByClassName('game-result')[0];

  var state = {
    xWins: 0,
    oWins: 0,
    charToPlay: 'X',
    addNewPieces: true,
    totalPlaysPerRound: 0,
    uniqueSquareId: 1
  };

  gameSquares.forEach((el) => {
    //adds class name to game square
    el.classList.add('game-square', state.uniqueSquareId);
    state.uniqueSquareId++;
    //adds click event listener to square
    el.addEventListener('click', () => {
      gameLogic(el, state, outcomeElement);
    })
  });

  resetButton.addEventListener('click', () => {
    resetBoard(gameSquares, state, outcomeElement);
  });

  setPlayerScores(state, '', playerXScore, playerOScore);
  setGamePlayable(state, true);
}

///////////////////////////////////////
/// Manage Game Logic and Board Rest///
///////////////////////////////////////

function gameLogic(el, obj, outcomeEl) {
  if (el.innerText === "" && obj.addNewPieces) {
    updateBoardSquare(el, obj);
    if (checkForWins(el)) {
      showOutcome(outcomeEl, obj.charToPlay + ' Wins!');
      setPlayerScores(obj, obj.charToPlay);
      setGamePlayable(obj, false);
    } else if (obj.totalPlaysPerRound === 9) {
      showOutcome(outcomeEl, 'Tie!', false);
      setGamePlayable(obj, false);
    } else {
      obj.charToPlay = setCharToPlay(obj.charToPlay);
    }
  }
}

function resetBoard(domEls, obj, outcomeEl) {
  domEls.forEach((el) => {
    el.innerText = '';
  })
  setGamePlayable(obj, true);
  showOutcome(outcomeEl, '');
}

function setGamePlayable(obj, bool) {
  obj.addNewPieces = bool;
  obj.totalPlaysPerRound = 0;
}

///////////////////////
/// Set Game Pieces ///
///////////////////////

function updateBoardSquare(el, obj) {
  el.innerText = obj.charToPlay;
  obj.totalPlaysPerRound++;
}

function setCharToPlay(char) {
  if (char === 'X') {
    return 'O';
  } else {
    return 'X';
  }
}

//////////////////////
/// Check For Wins ///
//////////////////////

function checkForWins(element) {
  var rowsColsDiags = {
    firstRow: '123',
    secondRow: '456',
    thirdRow: '789',
    firstCol: '147',
    secondCol: '258',
    thirdCol: '369',
    diagRight: '159',
    diagLeft: '357'
  };

  for (var line in rowsColsDiags) {
    if (rowsColsDiags[line].includes(element.classList[1])) {
      var allXorO = '';
      for (let square of rowsColsDiags[line]) {
        allXorO += document.getElementsByClassName(square)[0].innerText;
      }
      if (allXorO === 'XXX' || allXorO === 'OOO') {
        return true;
      }
    }
  }
  return false;
}

/////////////////////////////////////
/// Set Player Scores And Outcome ///
/////////////////////////////////////

function setPlayerScores(obj, winner, xEl, oEl) {
  xEl = xEl || document.getElementsByClassName('x-wins')[0];
  oEl = oEl || document.getElementsByClassName('o-wins')[0];
  if (winner) {
    winner === 'X' ? obj.xWins++ : obj.oWins++;
    winner === 'X' ? xEl.innerText = obj.xWins : oEl.innerText = obj.oWins
    obj.charToPlay = winner;
  } else {
    xEl.innerText = obj.xWins;
    oEl.innerText = obj.oWins;
  }
}

function showOutcome(el, string, bool) {
  el.innerText = string;
}

initialize();