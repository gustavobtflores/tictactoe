/**
 * Enum for game states.
 * @readonly
 * @enum {number}
 */
export const GAME_STATES = {
  running: 0,
  xWinner: 1,
  oWinner: 2,
};

export class Board {
  constructor() {
    this.state = GAME_STATES.running;
    this.isXToPlay = true;
    this.initialState = 0b111111111;
    this.winConditions = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100];
    this.xPlayer = 0b000000000;
    this.oPlayer = 0b000000000;
    this.cols = 3;
    this.rows = 3;
  }

  isGameEnded() {
    const hasWinner = [GAME_STATES.xWinner, GAME_STATES.oWinner];

    return hasWinner.includes(this.state) || this.isFull();
  }

  isFull() {
    return !this.initialState;
  }

  isLegal(play) {
    return this.legalPlays().includes(play);
  }

  reset() {
    this.state = GAME_STATES.running;
    this.initialState = 0b111111111;
    this.xPlayer = 0b000000000;
    this.oPlayer = 0b000000000;
    this.isXToPlay = true;
  }

  mask(idx) {
    return 1 << idx;
  }

  checkWin() {
    this.state = GAME_STATES.running;

    for (let i = 0; i < this.winConditions.length; i++) {
      if ((this.xPlayer & this.winConditions[i]) === this.winConditions[i]) {
        this.state = GAME_STATES.xWinner;
        break;
      }

      if ((this.oPlayer & this.winConditions[i]) === this.winConditions[i]) {
        this.state = GAME_STATES.oWinner;
        break;
      }
    }
  }

  ascii() {
    let ascii = '';

    ascii += '   1   2   3\n';

    for (let x = 0; x < this.rows; x++) {
      let row = [' |'];

      for (let y = 0; y < this.cols; y++) {
        const mask = this.mask(x + y * 3);

        if (this.xPlayer & mask) {
          row.push(' X |');
          continue;
        }

        if (this.oPlayer & mask) {
          row.push(' O |');
          continue;
        }

        row.push('   |');
      }

      ascii += '\n |---|---|---|\n';
      ascii += row.join('');
    }

    ascii += '\n |---|---|---|\n';

    return ascii;
  }

  getGameStateToArray() {
    const state = [];

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const idx = x * this.cols + y;
        const mask = this.mask(idx);

        if (this.xPlayer & mask) {
          state[idx] = 'X';
          continue;
        } else if (this.oPlayer & mask) {
          state[idx] = 'O';
          continue;
        } else state[idx] = '';
      }
    }

    return state;
  }

  isDraw() {
    const winnerStates = [GAME_STATES.xWinner, GAME_STATES.oWinner];

    return this.legalPlays().length === 0 && !winnerStates.includes(this.state);
  }

  debug() {
    console.log(`Game state -- ${this.state.toString(2)}`);
    console.log(`X Player -- ${this.xPlayer.toString(2)}`);
    console.log(`O Player -- ${this.oPlayer.toString(2)}`);
    console.log(`Initial state -- ${this.initialState.toString(2)}`);
  }

  print() {
    console.log(this.ascii());
  }

  legalPlays() {
    let legal = [];

    for (let i = 0; i < 9; i++) {
      const isSquareFree = (1 << i) & this.initialState;

      if (isSquareFree) {
        legal.push(i);
      }
    }

    return legal;
  }

  play(square) {
    if (!this.legalPlays().includes(square)) {
      throw new Error('Illegal play');
    }

    const mask = this.mask(square);

    if (this.isXToPlay) this.xPlayer |= mask;
    else this.oPlayer |= mask;

    this.isXToPlay = !this.isXToPlay;
    this.initialState ^= mask;

    this.checkWin();
  }

  undoPlay(square) {
    if (this.legalPlays().includes(square)) {
      throw new Error('Cannot undo play on unoccupied square');
    }

    const mask = this.mask(square);

    this.initialState |= mask;
    this.xPlayer &= ~mask;
    this.oPlayer &= ~mask;

    this.isXToPlay = !this.isXToPlay;

    this.checkWin();
  }
}
