import { Board } from './Board.js';
import { BoardUI } from './BoardUI.js';
import { HumanPlayer } from './HumanPlayer.js';
import { AI } from './AI.js';

export class ChallengeController {
  constructor() {
    this.board = new Board();
    this.boardUI = new BoardUI();
    this.PLAYER_TYPES = {
      bot: 1,
      human: 2,
    };
  }

  initEvents() {
    if (this.xPlayer instanceof HumanPlayer) {
      this.xPlayer.addEventListener('move-chosen', (e) => this.onPlayChosen(e.detail.play));
    }

    if (this.oPlayer instanceof HumanPlayer) {
      this.oPlayer.addEventListener('move-chosen', (e) => this.onPlayChosen(e.detail.play));
    }
  }

  startNewGame(xPlayer, oPlayer) {
    this.board.reset();
    this.boardUI.render(this.board);
    this.xPlayer = xPlayer === this.PLAYER_TYPES['bot'] ? new AI() : new HumanPlayer(this.boardUI);
    this.oPlayer = oPlayer === this.PLAYER_TYPES['bot'] ? new AI() : new HumanPlayer(this.boardUI);
    this.playerToPlay = this.xPlayer;
    this.initEvents();
    this.notifyTurn();
  }

  togglePlayer() {
    this.playerToPlay = this.board.isXToPlay ? this.xPlayer : this.oPlayer;
  }

  notifyTurn() {
    if (this.playerToPlay instanceof HumanPlayer) {
      this.playerToPlay.notifyTurnToPlay();
    } else {
      const play = this.playerToPlay.think(this.board);

      this.onPlayChosen(play);
    }
  }

  onPlayChosen(play) {
    if (this.board.isLegal(play)) {
      this.playMove(play);
    } else {
      const currentPlayer = this.playerToPlay instanceof AI ? 'Bot' : 'Human';

      throw new Error(`Illegal play by ${currentPlayer} at index ${play}`);
    }
  }

  wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async playMove(play) {
    if (this.xPlayer instanceof AI && this.oPlayer instanceof AI) {
      await this.wait(250);
    }

    this.board.play(play);
    this.togglePlayer();
    const isHuman = this.playerToPlay instanceof HumanPlayer;

    if (this.board.isGameEnded()) {
      this.boardUI.render(this.board, isHuman, true);
    } else {
      this.boardUI.render(this.board, isHuman);
      this.notifyTurn();
    }
  }
}
