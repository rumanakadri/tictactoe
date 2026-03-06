const cells = document.querySelectorAll(".cell"); //select all the cells
//console.log(cells);
const playerTurn = document.querySelector("#player-turn");
const winnerDetails = document.querySelector("#winnerDetails");
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", resetGame);

cells.forEach((cell) => cell.addEventListener("click", cellClicked)); //add event lister to all the cells

let startingGameState = ["", "", "", "", "", "", "", "", ""];

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  //console.log(cellIndex);
  if (startingGameState[cellIndex] == "") {
    //only update content if no player has selected it before
    updateCellContent(this); //pass this specific cell to have its content updated.
  }
}

function updateCellContent(cell) {
  //console.log(cell.textContent);
  const cellIndex = cell.getAttribute("cellIndex");
  if (playerTurn.textContent == "X's turn") {
    cell.textContent = "X";
    startingGameState[cellIndex] = "X";
  } else if (playerTurn.textContent == "O's turn") {
    cell.textContent = "O";
    startingGameState[cellIndex] = "O";
  }
  winninglogic();
  changePlayer();
}

function changePlayer() {
  if (playerTurn.textContent == "X's turn") {
    playerTurn.textContent = "O's turn";
  } else if (playerTurn.textContent == "O's turn") {
    playerTurn.textContent = "X's turn";
  }
}

/*Winning Logic */
const winningPatterns = [
  [0, 1, 2], //row win condition
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //column win condition
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //diagonal win condition
  [2, 4, 6],
];

function winninglogic() {
  for (let i of winningPatterns) {
    let val1 = cells[i[0]].innerText;
    let val2 = cells[i[1]].innerText;
    let val3 = cells[i[2]].innerText;

    if (
      val1 == val2 &&
      val2 == val3 &&
      val1 !== "" &&
      val2 !== "" &&
      val3 !== ""
    ) {
      //console.log('Winner is ' + val1)
      winnerDetails.innerText = "Winner is " + val1;
      iswin = true;
      return;
    }

    if (!startingGameState.includes("")) {
      winnerDetails.innerText = "Draw!";
    }
  }
}

function resetGame() {
  for (let cellValue of cells) {
    cellValue.innerText = "";
    winnerDetails.innerText = "";
    startingGameState = ["", "", "", "", "", "", "", "", ""];
    enabled();
  }
}
