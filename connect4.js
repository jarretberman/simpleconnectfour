/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//made board just columns for ease in findSpotForCol
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (i = 0; i < WIDTH; i++) {
    board.push([])
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  htmlBoard = document.querySelector("#board")

  // creates an additonal row for clicks to make connect 4 triggers
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // creates table elements to fit a board space
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    row.classList.add("game-row")
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  if (board[x].length < 6) { // with empty arrays only need to use length
    return board[x].length
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //console.log(5 - y, x)
  board[x][y] = currPlayer
  const chip = document.createElement("div")
  chip.classList.add("piece")
  chip.classList.add(`player-${currPlayer}`)
  document.getElementById(`${5 - y}-${x}`).append(chip)
}

/** endGame: announce game end */
//also resets the game board
function endGame(msg) {
  setTimeout(() =>{
    alert(msg)
    board = []
    const html = document.querySelector("#board")
    html.textContent = ""
    makeBoard()
    makeHtmlBoard()
    }, 2200)
  
  // TODO: pop up alert message
}

//added tie function for readability
const checkForTie = () => {
  for (x in board) {
    //console.log(board[x])
    if (board[x].length === 6) {

    } else { 
      //console.log("no tie")
      return;
    }
    
  }
  endGame("Game Over. Tie")
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  //console.log(x, y)
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  checkForTie()

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  // TODO: switch currPlayer 1 <-> 2
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

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

