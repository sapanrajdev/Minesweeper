var board = document.getElementById("grid");
var isGameOn = true;
createBoard();

function selectDifficulty() {
  createBoard();
}

function createBoard() {
  isGameOn = true;
  board.innerHTML = "";
  for (var i = 0; i < 10; i++) {
    row = board.insertRow(i);
    for (var j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () { click(this); };
      var mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  randomMines();
}

function click(cell) {
  if (isGameOn) {
    if (cell.getAttribute("data-mine") == "true") {
      isGameOn = false;
      showMines();
      alert("Game Over");
    } else {
      cell.className = "clicked";
      var mineCount = 0;
      var cellRow = cell.parentNode.rowIndex;
      var cellCol = cell.cellIndex;
      for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
          if (board.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
        }
      }
      cell.innerHTML = mineCount;
      if (mineCount == 0) {
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
          for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            if (board.rows[i].cells[j].innerHTML == "") click(board.rows[i].cells[j]);
          }
        }
      }
      validateCompletion();
    }
  }
}

function randomMines() {
  var diff = document.getElementById('difficulty');
  for (var i = 0; i < parseInt(diff.value, 10); i++) {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = board.rows[row].cells[col];
    cell.setAttribute("data-mine", "true");
  }
}

function validateCompletion() {
  var levelComplete = true;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if ((board.rows[i].cells[j].getAttribute("data-mine") == "false") && (board.rows[i].cells[j].innerHTML == "")) levelComplete = false;
    }
  }
  if (levelComplete) {
    alert("You Win!");
    showMines();
  }
}

function showMines() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = board.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
    }
  }
}
