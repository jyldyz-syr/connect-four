class ConnectFour {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.currentTurn = 0;
        this.columns = [];
        for (let i = 0; i <= 6; i++) {
            this.columns[i] = [];
        }
    }

    getColumnsDOM() {
        return this.columns
            .map((column, i) => `<div class="column"> ${this.getColumnDOM(i)} </div>`)
            .join("");
    }

    getColumnDOM(column) {
        return this.columns[column]
            .map((i) => `<div class="disc ${i}"> ${i} </div>`)
            .reverse()
            .join("");
    }

    currentPlayer() {
        return this.players[this.currentTurn];
    }

    turn() { this.currentTurn === 1 ? (this.currentTurn = 0) : this.currentTurn++; }

    drop(str, column) {
        // Returning 0 indicates the column was already filled up with discs.
        return this.columns[column].length === 6 ? 0 : this.columns[column].push(str);
    }

    dropByCurrentPlayer(column) {
        const addedToRow = this.drop(this.currentPlayer(), column);
        if (addedToRow > 0) {
            let isWin = this.checkConnectivity(column, addedToRow - 1, this.currentPlayer());
            return isWin ? this.currentPlayer() : this.turn();
        }
        else {
            // Attempted column was already filled.
            // Check if all columns are filled, return accordingly.
            const allColumnsFilled = this.columns.every((i) => { i.length === 6; });
            return allColumnsFilled ? "all-columns-filled" : "column-filled";
        }
    }

    checkContinuity(arr, value, continuity) {
        const result = arr.reduce((prev, current) => {
            if (prev === continuity) {
                return prev;
            }
            if (current === value) {
                return ++prev;
            }
            else {
                return 0;
            }
        }, 0);
        return result === continuity;
    }

    checkConnectivity(column, row, player) {
        if (this.checkContinuity(this.getColumn(column, row), player, 4) ||
            this.checkContinuity(this.getRow(column, row), player, 4) ||
            this.checkContinuity(this.getForwardDia(column, row), player, 4) ||
            this.checkContinuity(this.getBackwardDia(column, row), player, 4))
            return true;
        else {
            return false;
        }
    }

    getColumn(column, row) {
        return this.columns[column];
    }

    getRow(column, row) {
        let returnArr = [];
        for (let i = 0; i < this.columns.length; i++) {
            returnArr.push(this.columns[i][row] ? this.columns[i][row] : null);
        }
        return returnArr;
    }

    getForwardDia(column, row) {
        let returnArr = [];
        let c, r;
        for (c = column - row, r = 0; c < this.columns.length; c++, r++) {
            if (this.columns[c]) {
                returnArr.push(this.columns[c][r] ? this.columns[c][r] : null);
            }
        }
        return returnArr;
    }

    getBackwardDia(column, row) {
        let returnArr = [];
        let c, r;
        for (c = column + row, r = 0; c >= 0; c--, r++) {
            if (this.columns[c]) {
                returnArr.push(this.columns[c][r] ? this.columns[c][r] : null);
            }
        }
        return returnArr;
    }
}
