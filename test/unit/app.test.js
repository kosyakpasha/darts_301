const DartsGame = require('./../../app');
let game;

describe('Test DartsGame', () => {
  beforeEach(() => {
    game = new DartsGame(['Ivan', 'Petr']);
  });

  test('Handle clean game', () => {
    expect(DartsGame).toBe(DartsGame);
  });
});
