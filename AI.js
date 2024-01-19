export class AI {
  constructor() {
    this.negativeInfinity = -999999;
    this.positionsEvaluated = 0;
    this.searchDuration = 0;
    this.depth = 0;
  }

  evaluate(board, depth) {
    const hasWinner = [1, 2].includes(board.state);
    const player = board.isXToPlay ? 10 : -10;

    if (hasWinner) {
      const winner = board.state === 1 ? 1 : -1;

      return player * winner + depth * winner;
    }

    return 0;
  }

  //TODO: Implement alpha-beta pruning for faster plays lookup,
  // it is not needed, but it is a good knowledge to have
  search(board, depth) {
    this.positionsEvaluated++;

    if (board.isGameEnded()) {
      return this.evaluate(board, depth);
    }

    const plays = board.legalPlays();
    let value = this.negativeInfinity;

    for (const play of plays) {
      board.play(play);
      value = Math.max(value, -this.search(board, depth + 1));
      board.undoPlay(play);
    }

    return value;
  }

  findBestPlay(board) {
    let bestValue = this.negativeInfinity;
    let bestPlay = null;
    const legalPlays = board.legalPlays();

    if (legalPlays.length === 9 || legalPlays.length === 8) {
      return legalPlays[Math.floor(Math.random() * legalPlays.length)];
    }

    for (const play of legalPlays) {
      board.play(play);
      let value = -this.search(board, 1);
      board.undoPlay(play);

      if (value > bestValue) {
        bestValue = value;
        bestPlay = play;
      }

      this.positionsEvaluated = 0;
    }

    const player = board.isXToPlay ? 'X' : 'O';
    console.log(`bestPlay: ${bestPlay} -- bestValue: ${bestValue} -- player: ${player}`);

    return bestPlay;
  }

  think(board) {
    this.positionsEvaluated = 0;
    const start = performance.now();
    const bestPlay = this.findBestPlay(board);
    const end = performance.now();
    this.searchDuration = end - start;

    return bestPlay;
  }
}
