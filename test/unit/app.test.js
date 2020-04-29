const DartsGame = require('./../../app');
let game;

describe('Test DartsGame', () => {
  beforeEach(() => {
    game = new DartsGame(['Ivan', 'Petr']);
  });

  test('Handle clean game', () => {
    expect(DartsGame).toBe(DartsGame);
  });

  test('Receive points for first player', () => {
    expect(game.score(0)).toBe(301);
  });

  test('The first player can make the first throw', () => {
    game.throw(9, 3);
    expect(game.score(0)).toBe(274);
  });

  test('The score method receive only valid type of data', () => {
    expect(() => game.score('0')).toThrow('Type of index must be an int!');
  });

  test('The throw method receive only valid types of data', () => {
    expect(() => game.throw('9', '3')).toThrow('All parameters must be an int!');
  });

  test('After three throws of the first player, the second player will throw his first one', () => {
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    game.throw(9, 3);
    expect(game.score(1)).toBe(274);
  });
});
