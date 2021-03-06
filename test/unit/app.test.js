const Game = require('./../../app');
let game;

describe('Test Game', () => {
  test('Handle clean game', () => {
    expect(Game).toBe(Game);
  });
});

describe('Test the score method', () => {
  beforeEach(() => {
    game = new Game(['Ivan', 'Petr']);
  });

  test('Receive points for first player', () => {
    expect(game.score(0)).toBe(301);
  });

  test('The score method receive only valid type of data', () => {
    expect(() => game.score('0')).toThrow('Type of index must be an int!');
  });
});

describe('Test the throw method', () => {
  beforeEach(() => {
    game = new Game(['Ivan', 'Petr']);
  });

  test('The first player can make the first throw', () => {
    game.throw(9, 3);
    expect(game.score(0)).toBe(274);
  });

  test('The throw method receive only valid types of data', () => {
    expect(() => game.throw('9', '3')).toThrow('All parameters must be an int!');
  });

  test('The throw method receive only valid parameters', () => {
    expect(() => game.throw(21, 3)).toThrow('The throw parameters must be valid!');
    expect(() => game.throw(20, 4)).toThrow('The throw parameters must be valid!');
  });

  test('After three throws of the first player, the second player will throw his first one', () => {
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    expect(game.score(1)).toBe(274);
  });

  test('After throw of the last player, will be throw of the first', () => {
    game.throw(20, 3);
    game.throw(20, 3);
    game.throw(20, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(20, 3);
    expect(game.score(0)).toBe(61);
  });
});

describe('Test the last throw', () => {
  beforeEach(() => {
    game = new Game(['Ivan', 'Petr']);
    game.throw(20, 3);
    game.throw(20, 3);
    game.throw(20, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(20, 3);
    game.throw(20, 2);
    game.throw(11, 1);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
  });

  test('Player has 291 points before the last throw, he mush have 2 factor for scoring last trow points. There is fail try.', () => {
    game.throw(10, 1);
    expect(game.score(0)).toBe(10);
  });

  test('Player has 291 points before the last throw, he mush have 2 factor for scoring last trow points. There is success try.', () => {
    game.throw(5, 2);
    expect(game.score(0)).toBe(0);
  });

  test('The winner was shown', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    game.throw(5, 2);
    expect(consoleSpy).toHaveBeenCalledWith('Player Ivan won!');
  });
});
