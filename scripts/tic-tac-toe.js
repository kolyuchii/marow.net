const CELL_TYPES = {
  TYPE_O: "type-o",
  TYPE_X: "type-x"
};
const GAME_MODE = {
  STARTED: 0,
  STOPPED: 1
};
const MATRIX_SIZE = 3;

class App {
  matrix = null;
  currentCellType = CELL_TYPES.TYPE_X;
  gameMode = GAME_MODE.STARTED;

  constructor() {
    this.wrapperEl = document.querySelector(".js-app");
    this.newGameEls = this.wrapperEl.querySelectorAll(".js-new-game");
    this.resultEl = this.wrapperEl.querySelector(".js-result");
    this.resultTextEl = this.wrapperEl.querySelector(".js-result-text");
    this.gridEl = this.wrapperEl.querySelector(".js-grid");

    this.init();
  }

  init() {
    this.newGameEls.forEach(item => {
      item.addEventListener("click", this.newGame.bind(this));
    });

    this.gridEl.addEventListener("click", this.onClick.bind(this));
  }

  newGame() {
    this.currentCellType = CELL_TYPES.TYPE_X;
    this.matrix = this.getMatrix(MATRIX_SIZE);
    this.gameMode = GAME_MODE.STARTED;
    this.draw();
    this.gridEl.classList.remove("hidden");
  }
  getMatrix(matrixSize) {
    const matrix = [];
    for (let row = 0; row < matrixSize; row += 1) {
      matrix[row] = [];
      for (let cell = 0; cell < matrixSize; cell += 1) {
        matrix[row][cell] = null;
      }
    }
    return matrix;
  }
  onClick(event) {
    if (this.gameMode === GAME_MODE.STOPED) {
      return false;
    }
    const { cell, row } = event.target.dataset;
    if (this.matrix[row][cell] !== null) {
      return false;
    }
    this.matrix[row][cell] = this.currentCellType;

    if (this.check(this.matrix, row, cell, this.currentCellType)) {
      this.gameMode = GAME_MODE.STOPED;
    }

    this.draw();

    this.currentCellType =
      this.currentCellType === CELL_TYPES.TYPE_X
        ? CELL_TYPES.TYPE_O
        : CELL_TYPES.TYPE_X;
  }

  check(matrix, y, x, currentCellType) {
    const col = matrix.every(item => item[x] === currentCellType);
    const row = matrix[y].every(item => item === currentCellType);
    let diag1 = true;
    let diag2 = true;
    for (let i = 0, x = 0; i < MATRIX_SIZE; i += 1, x += 1) {
      if (matrix[i][x] !== currentCellType) {
        diag1 = false;
      }
    }

    for (let i = MATRIX_SIZE - 1, x = 0; x < MATRIX_SIZE; i -= 1, x += 1) {
      if (matrix[i][x] !== currentCellType) {
        diag2 = false;
      }
    }

    return col || row || diag1 || diag2;
  }

  getResult() {
    this.resultEl.classList.toggle(
      "hidden",
      this.gameMode === GAME_MODE.STARTED
    );
    if (this.gameMode === GAME_MODE.STOPED) {
      this.resultTextEl.innerHTML = `The ${
        this.currentCellType === CELL_TYPES.TYPE_X ? "X" : "O"
      } player won!`;
    }
  }

  draw() {
    this.gridEl.innerHTML = "";
    this.matrix.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("grid__row");
      row.forEach((cell, cellIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.setAttribute("data-row", rowIndex);
        cellDiv.setAttribute("data-cell", cellIndex);
        cellDiv.classList.add(
          cell === null ? "is-selected" : cell,
          "grid__cell"
        );
        rowDiv.append(cellDiv);
      });
      this.gridEl.append(rowDiv);
    });

    this.getResult();
  }
}

export default new App();
