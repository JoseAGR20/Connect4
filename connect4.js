
//CONNECT 4 GAME.
const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1;
let board = [];// array of rows, each row is array of cells  (board[y][x])

//The following functtion uses the "board" variable to create a board. 
function makeBoard() {
  for (let x = 0; x < HEIGHT; x++){
    board.push(Array.from({length: WIDTH}));
  } 
}

function makeHtmlBoard() {
  const board = document.getElementById('board');

  //These lines make the top row "clickable" for a player to add pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  //top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
    headCell.addEventListener("click", handleClick); // Set up the event listener here
  top.append(headCell);
  }
  board.append(top);

  // These lines create the main body of the board grid. 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}
  // TODO: make a div and insert into correct table cell

/** endGame: announce game end */

function endGame(message) {
  alert(message);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // checking for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // checking for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!')
}
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //currPlayer = currPlayer === 1 ? 2 : 1;
currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //This denotes the 4 different ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // This checks for the 4 cells needed to win only as needed.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
