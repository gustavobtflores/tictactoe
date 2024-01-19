export class BoardUI {
  constructor() {
    this.boardEl = document.getElementById('board');
  }

  render(board, isHumanTurn = false, isGameOver = false) {
    const gameState = board.getGameStateToArray();

    for (let i = 0; i < gameState.length; i++) {
      const squareEl = this.boardEl.querySelector(`td#square-${i}`);

      if (gameState[i]) {
        squareEl.dataset.value = gameState[i];
      } else {
        squareEl.removeAttribute('data-value');
      }
    }

    if (isHumanTurn & !isGameOver) this.updateHumanTurn(board);
    else this.endGame();
  }

  endGame() {
    this.boardEl.removeAttribute('data-user-turn');
  }

  updateHumanTurn(board) {
    if (board.isXToPlay) {
      this.boardEl.dataset.userTurn = 'X';
    } else {
      this.boardEl.dataset.userTurn = 'O';
    }
  }
}
