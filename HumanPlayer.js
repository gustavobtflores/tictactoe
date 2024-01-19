export class HumanPlayer extends EventTarget {
  constructor(boardUI) {
    super();
    this.isTurnToPlay = false;
    this.boardUI = boardUI;
    this.initPlayEvent();
  }

  notifyTurnToPlay() {
    this.isTurnToPlay = true;
  }

  initPlayEvent() {
    this.boardUI.boardEl.addEventListener('mousedown', (e) => {
      if (!this.isTurnToPlay) return;

      const squareEl = e.target.closest('td');
      const clickedOnSquare = !!squareEl;

      if (clickedOnSquare) {
        const squareIdx = parseInt(squareEl.id.replace('square-', ''));

        this.dispatchEvent(new CustomEvent('move-chosen', { detail: { play: squareIdx } }));
      }
    });
  }
}
