class DartsGame {
  constructor(players) {
    this._players = this._createPlayers(players);
    this._currentPlayerIndex = 0;
  }

  _createPlayers = playerNames => playerNames.map(playerName => {
    return {
      name: playerName,
      currentPoints: 301,
      isWinner: false,
    }
  });

  score = playerIndex => this._players[playerIndex].currentPoints;

  throw = (score, factor) => {
    const lastThrowPoints = score * factor;

    this._players[this._currentPlayerIndex].currentPoints -= lastThrowPoints;
  };
}

module.exports = DartsGame;
