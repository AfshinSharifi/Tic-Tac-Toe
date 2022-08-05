"use strict";

var blocks = document.querySelectorAll('.style__block');
var restart = document.querySelector('.restart');
var scores = document.querySelectorAll('.score');
var statusGame = document.querySelector('.tic__status'); //Global Variables

var isActive = true;
var isTurn = true;
var cells = new Array(9);
var cellsNumber = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //Add Event Listeners

blocks.forEach(function (block) {
  block.addEventListener('click', function () {
    if (isTurn) {
      addTic(block);
      setTimeout(function () {
        statusGame.style.display = 'none';
      }, 500);
    } else {
      addToc(block);
      setTimeout(function () {
        statusGame.style.display = 'none';
      }, 500);
    }

    pushCells(block);
    checkWins();
  });
});
restart.addEventListener('click', reset); //Functions

function addTic(e) {
  if (e.innerText === '' && isActive) {
    statusGame.childNodes[1].innerText = 'Player 2Turn';
    statusGame.style.display = 'block';
    e.innerText = 'X';
    e.classList.add('tic--x');
    isTurn = false;
  }

  ;
}

function addToc(e) {
  if (e.innerText === '' && isActive) {
    statusGame.childNodes[1].innerText = 'Player 1 Turn';
    statusGame.style.display = 'block';
    e.innerText = 'O';
    e.classList.add('tic--o');
    isTurn = true;
  }

  ;
}

function reset() {
  blocks.forEach(function (block) {
    block.innerText = '';
    block.classList.remove('tic--x');
    block.classList.remove('tic--o');
    isTurn = true;
  });
  cells = new Array(9);
  statusGame.style.display = 'none';
  isActive = true;
}

function pushCells(block) {
  var num = block.classList[0].split('-')[1];

  if (block.classList.contains('tic--x')) {
    cells[num] = 'X';
  } else {
    cells[num] = 'O';
  }
}

function checkWins() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cellsNumber[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var num = _step.value;

      switch (cells[num[0]]) {
        case 'X':
          if (cells[num[1]] === 'X' && cells[num[2]] === 'X') {
            statusGame.childNodes[1].innerText = 'Player 1 Wins';
            statusGame.style.display = 'block';

            if (isActive) {
              scores[0].innerText = parseInt(scores[0].innerText) + 1;
            }

            ;
            isActive = false;
            setTimeout(function () {
              statusGame.style.display = 'block';
            }, 500);
          }

          break;

        case 'O':
          if (cells[num[1]] === 'O' && cells[num[2]] === 'O') {
            statusGame.childNodes[1].innerText = 'Player 2Wins';

            if (isActive) {
              scores[0].innerText = parseInt(scores[1].innerText) + 1;
            }

            ;
            statusGame.style.display = 'block';
            isActive = false;
            setTimeout(function () {
              statusGame.style.display = 'block';
            }, 500);
          }

          break;

        default:
          break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}