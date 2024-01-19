const endGameMessages = {
  0: 'Game ended in a draw',
  1: 'X won!',
  2: 'O won!',
};

export class BoardUI {
  constructor() {
    this.boardEl = document.getElementById('board');
    this.endGameEl = document.getElementById('game-over');
  }

  render(board, isHumanTurn = false, isGameOver = false) {
    this.endGameEl.textContent = '';
    const gameState = board.getGameStateToArray();

    for (let i = 0; i < gameState.length; i++) {
      const squareEl = this.boardEl.querySelector(`td#square-${i}`);

      if (gameState[i]) {
        squareEl.dataset.value = gameState[i];
      } else {
        squareEl.removeAttribute('data-value');
      }
    }

    if (isGameOver) {
      this.endGame(board);
      return;
    }

    if (isHumanTurn) this.updateHumanTurn(board);
  }

  endGame(board) {
    console.log('Game over');
    this.boardEl.removeAttribute('data-user-turn');
    this.endGameEl.textContent = endGameMessages[board.state];
  }

  updateHumanTurn(board) {
    if (board.isXToPlay) {
      this.boardEl.dataset.userTurn = 'X';
    } else {
      this.boardEl.dataset.userTurn = 'O';
    }
  }
}
