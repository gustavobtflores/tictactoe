import { Board, GAME_STATES } from './Board.js';

describe('Board class tests', () => {
  test('play() with a legal move should update the board and switch players', () => {
    const board = new Board();
    board.play(0);
    expect(board.xPlayer).toBe(0b000000001);
    expect(board.isXToPlay).toBe(false);
  });

  test('play() on an occupied square should throw an error', () => {
    const board = new Board();
    board.play(0);
    expect(() => board.play(0)).toThrow('Illegal play');
  });

  test('play() resulting in a win should update the game state', () => {
    const board = new Board();
    board.play(0);
    board.play(3);
    board.play(1);
    board.play(4);
    board.play(2);
    expect(board.state).toBe(GAME_STATES.xWinner);
  });

  test('undoPlay() should revert the last move and switch players', () => {
    const board = new Board();
    board.play(0);
    board.undoPlay(0);
    expect(board.xPlayer).toBe(0b000000000);
    expect(board.isXToPlay).toBe(true);
  });

  test('undoPlay() after a winning move should reset the game state to running', () => {
    const board = new Board();

    board.play(0);
    board.play(3);
    board.play(1);
    board.play(4);
    board.play(2);
    board.undoPlay(2);
    expect(board.state).toBe(GAME_STATES.running);
  });

  test('undoPlay() on an unoccupied square should throw an error', () => {
    const board = new Board();

    expect(() => board.undoPlay(0)).toThrow('Cannot undo play on unoccupied square');
  });

  test('isDraw should return true if board is full and none of the players won', () => {
    const board = new Board();

    //Plays leading to draw
    board.play(0);
    board.play(4);
    board.play(1);
    board.play(2);
    board.play(6);
    board.play(3);
    board.play(5);
    board.play(7);
    board.play(8);

    expect(board.isDraw()).toBe(true);
  });
});
