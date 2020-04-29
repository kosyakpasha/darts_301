class DartsGame {
  constructor(players) {
    this._players = this._createPlayers(players);
    this._currentPlayerIndex = 0;
    this._throwCount = 0;
    this._validScores = [1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20];
    this._validFactor = [1, 2, 3];
  }

  _createPlayers = playerNames => playerNames.map(playerName => {
    return {
      name: playerName,
      currentPoints: 301,
    }
  });

  score = playerIndex => {
    this._validateScoreParams(playerIndex);
    return this._players[playerIndex].currentPoints;
  };

  throw = (score, factor) => {
    this._validateThrowParams(score, factor);
    const lastThrowPoints = score * factor;
    this._throwCount++;
    this._players[this._currentPlayerIndex].currentPoints -= lastThrowPoints;

    if (this._throwCount % 3 === 0 && this._throwCount !== 0) {
      this._currentPlayerIndex++;

      this._backQueueToTheBeginning();
    }

    const currentPoints = this.score(this._currentPlayerIndex);

    this._checkLastThrow(currentPoints, lastThrowPoints, factor);
  };

  _backQueueToTheBeginning = () => {
    if (this._currentPlayerIndex > this._players.length - 1) {
      this._currentPlayerIndex = 0;
    }
  };

  _validateThrowParams = (score, factor) => {
    if (!Number.isInteger(score) || !Number.isInteger(factor)) {
      throw new Error('All parameters must be an int!');
    }

    const areParamsValid = !!this._validScores.filter(validScore => score === validScore).length
      && !!this._validFactor.filter(validScore => factor === validScore).length;

    if (!areParamsValid) {
      throw new Error('The throw parameters must be valid!');
    }
  };

  _checkLastThrow = (currentPoints, lastThrowPoints, factor) => {
    if (currentPoints < 0 || (currentPoints === 0 && factor !== 2)) {
      this._players[this._currentPlayerIndex].currentPoints += lastThrowPoints;
    }
  };

  _validateScoreParams = playerIndex => {
    if (!Number.isInteger(playerIndex)) {
      throw new Error('Type of index must be an int!')
    }
  };
}

module.exports = DartsGame;
