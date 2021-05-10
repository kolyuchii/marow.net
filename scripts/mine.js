class Mine {
    matrixX = 30;
    matrixY = 20;
    minesCount = 120;
    dim = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    constructor() {
        this.init();
    }

    init() {
        this.wrapperEl = document.querySelector('.js-mine');
        this.gridEl = this.wrapperEl.querySelector('.js-grid');
        this.newGameEl = this.wrapperEl.querySelector('.js-new-game');

        this.gridEl.addEventListener('click', this.onClick.bind(this));
        this.newGameEl.addEventListener('click', this.newGame.bind(this));
        this.veilEl = this.wrapperEl.querySelector('.js-veil');
    }

    newGame() {
        this.closedCells = this.matrixX * this.matrixY;
        this.veilEl.classList.remove("hidden");
        this.isGameFinished = false;
        this.generateMatrix();
    }

    generateMatrix() {
        this.matrix = [];
        for (let i = 0; i < this.matrixY; i++) {
            this.matrix[i] = [];
            for (let x = 0; x < this.matrixX; x++) {
                this.matrix[i][x] = {
                    isMine: false,
                    isMarked: false,
                    isOpened: false,
                    value: 0,
                };
            }
        }

        let minesCount = 0;
        while (minesCount < this.minesCount) {
            const y = Math.floor(Math.random() * this.matrixY);
            const x = Math.floor(Math.random() * this.matrixX);

            if (this.matrix[y][x].isMine === false) {
                this.matrix[y][x].isMine = true;
                this.matrix[y][x].value = 9;
                minesCount++;
            }
        }

        for (let row = 0; row < this.matrixY; row++) {
            for (let cell = 0; cell < this.matrixX; cell++) {
                if (this.matrix[row][cell].isMine) {
                    this.dim.forEach(([y, x]) => {
                        if (
                            this.matrix[y + row] &&
                            this.matrix[y + row][x + cell] &&
                            this.matrix[y + row][x + cell].isMine === false
                        ) {
                            this.matrix[y + row][x + cell].value += 1;
                        }
                    });
                }
            }
        }

        this.draw();
    }

    onClick(event) {
        const el = event.target;
        const X = Number(el.dataset.x);
        const Y = Number(el.dataset.y);

        if (this.matrix[Y][X].isMine) {
            this.endGame();
            this.draw();
        }

        if (this.matrix[Y][X].isOpened === false) {
            this.openCells(Y, X);

            if (this.closedCells === this.minesCount) {
                this.endGame();
            }

            this.draw();
        }
    }

    openCells(Y, X) {
        const stack = [[Y, X]];
        this.matrix[Y][X].isOpened = true;
        this.closedCells--;

        while (stack.length) {
            const [row, cell] = stack.shift();

            this.dim.forEach(([y, x]) => {
                if (
                    this.matrix[y + row] &&
                    this.matrix[y + row][x + cell] &&
                    this.matrix[y + row][x + cell].isOpened === false &&
                    this.matrix[y + row][x + cell].isMine === false &&
                    (this.matrix[y + row][x + cell].value === 0 || this.matrix[y + row][x + cell].value === 1)
                ) {
                    this.matrix[y + row][x + cell].isOpened = true;
                    this.closedCells--;
                    stack.push([y + row, x + cell]);
                }
            });
        }
    }

    endGame() {
        this.isGameFinished = true;
    }

    draw() {
        this.gridEl.innerHTML = '';
        this.gridEl.classList.toggle('finished', this.isGameFinished);

        this.matrix.forEach((row, Y) => {
            const rowEl = document.createElement('div');
            rowEl.classList.add('row');
            row.forEach((cell, X) => {
                const cellEl = document.createElement('div');
                cellEl.dataset.x = String(X);
                cellEl.dataset.y = String(Y);
                cellEl.classList.add('cell', `cell__type${cell.value}`);
                cellEl.classList.toggle('closed', !cell.isOpened);
                cellEl.classList.toggle(
                    'marked',
                    cell.isMarked && !cell.isOpened,
                );
                cellEl.innerText = cell.value ? cell.value : '';
                rowEl.append(cellEl);
            });
            this.gridEl.append(rowEl);
        });
    }
}

export default new Mine();
