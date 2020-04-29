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

  score = playerIndex => {
    if (!Number.isInteger(playerIndex)) {
      throw new Error('Type of index must be an int!')
    }

    return this._players[playerIndex].currentPoints;
  };

  throw = (score, factor) => {
    if (!Number.isInteger(score) || !Number.isInteger(factor)) {
      throw new Error('All parameters must be an int!')
    }

    const lastThrowPoints = score * factor;

    this._players[this._currentPlayerIndex].currentPoints -= lastThrowPoints;
  };
}

module.exports = DartsGame;
