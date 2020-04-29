class DartsGame {
  constructor(players) {
    this._players = this._createPlayers(players);
  }

  _createPlayers = playerNames => playerNames.map(playerName => {
    return {
      name: playerName,
      currentPoints: 301,
      isWinner: false,
    }
  });

  score = playerIndex => this._players[playerIndex].currentPoints;
}

module.exports = DartsGame;
