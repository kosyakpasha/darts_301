// @flow

const { Table } = require('console-table-printer');

type League = 'AMA' | 'SEMI' | 'PRO';

type Player = {
  id: string,
  fullName: string,
  league: League,
};

type AllLeaders = {
  totalLeader: number,
  pro: number,
  semi: number,
  amateur: number,
};

type CurrentResult = {
  id: string,
  score: number,
  fullName: string,
  league: string,
};

interface GameInterface {
  throw(id: string, score: number, multiplier?: number): void;
  score(id: string): number | null;
  getLeaders(): AllLeaders;
  printTable(): void;

  _createCurrentResults(players: Array<Player>): Array<CurrentResult>;
  _validScores: Array<number>;
  _validFactor: Array<number>;
  _name: string;
  _startScore: number;
  _players: Array<Object>;
}

class Game implements GameInterface {
  _leagues: Array<string>;
  _currentResult: Array<CurrentResult>;
  _validScores: Array<number>;
  _validFactor: Array<number>;
  _name: string;
  _startScore: number;
  _players: Array<Object>;

  constructor(gameName: string, ...players: Array<Object>) {
    this._leagues = ['AMA', 'SEMI', 'PRO'];
    this._players = players;
    this._validScores = [1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20];
    this._validFactor = [1, 2, 3];
    this._name = gameName;
    this._startScore = 301;
  };

  init = () => this._currentResult = this._createCurrentResults(this._players);

  _createCurrentResults = (players: Array<Player>): Array<CurrentResult> => players.map((player: Object) => {
    const { id, fullName, league } = player;
    return {
      id,
      fullName,
      score: this._startScore,
      league
    }
  });

  score = (id: string): number | null => {
    const currentResult = this._currentResult.filter(result => result.id === id);
    return currentResult.length ? currentResult[0].score : null;
  };

  throw = (id: string, score: number, multiplier?: number = 1) => {
    this._validateThrowParams(score, multiplier);
    const lastThrowPoints = score * multiplier;
    const [result] = this._currentResult.filter(result => result.id === id);
    result.score -= lastThrowPoints;
    const currentPoints = this.score(id);
    currentPoints && this._checkLastThrow(id, currentPoints, lastThrowPoints, multiplier);
  };

  getLeaders = (): AllLeaders => {
    const totalLeader = [];
    const pro = [];
    const semi = [];
    const amateur = [];

    this._currentResult.forEach(result => {
      totalLeader.push(result.score);
      result.league === 'AMA' ? amateur.push(result.score) : null;
      result.league === 'SEMI' ? semi.push(result.score) : null;
      result.league === 'PRO' ? pro.push(result.score) : null;
    });
    return {
      totalLeader: Math.max(...totalLeader),
      pro: Math.max(...pro),
      semi: Math.max(...semi),
      amateur: Math.max(...amateur),
    };
  };

  printTable = (): void => {
    this._currentResult.sort((a, b) => a.score - b.score);
    const p = new Table();
    this._currentResult.forEach(result => {
      const { score, fullName, league } = result;
      const isPro = league === 'PRO';
      const isSemi = league === 'SEMI';
      const isAma = league === 'AMA';
      const colorBg = isPro ? 'red' : isSemi ? 'green' : isAma ? 'yellow' : 'grey';

      p.addRow({ score, fullName, league }, { color: colorBg });
    });

    p.printTable();
  };

  _validateThrowParams = (score: number, factor: number) => {
    if (!Number.isInteger(score) || !Number.isInteger(factor)) {
      throw new Error('All parameters must be an int!');
    }

    const areParamsValid = !!this._validScores.filter(validScore => score === validScore).length
      && !!this._validFactor.filter(validScore => factor === validScore).length;

    if (!areParamsValid) {
      throw new Error('The throw parameters must be valid!');
    }
  };

  _checkLastThrow = (playerId: string, currentPoints: number, lastThrowPoints: number, factor: number) => {
    if (currentPoints === 0 && factor === 2) {
      this._showWinner(this._players[+playerId].name);
    } else if (currentPoints < 0 || (currentPoints === 0 && factor !== 2)) {
      this._currentResult.map(result => result.id === playerId ? result.score += lastThrowPoints : null);
    }
  };

  _showWinner = (playerName: string): void => console.log(`Player ${playerName} won!`);
}

const plr1 = {
  id: '0',
  fullName: 'Petia',
  league: 'AMA',
};
const plr2 = {
  id: '1',
  fullName: 'Vasia',
  league: 'AMA',
};
const plr3 = {
  id: '2',
  fullName: 'Kolia',
  league: 'SEMI',
};
const plr4 = {
  id: '3',
  fullName: 'Misha',
  league: 'SEMI',
};
const plr5 = {
  id: '4',
  fullName: 'Dima',
  league: 'PRO',
};
const plr6 = {
  id: '5',
  fullName: 'Vsevolod',
  league: 'PRO',
};

const game =  new Game(`It's my game!`, plr1, plr2, plr3, plr4, plr5, plr6);

game.init();

game.throw('0', 10);
game.throw('0', 10, 2);
game.throw('0', 10, 3);
game.throw('1', 2);
game.throw('1', 15, 2);
game.throw('1', 18, 3);
game.throw('2', 7);
game.throw('2', 2, 2);
game.throw('2', 8, 3);
game.throw('3', 20);
game.throw('3', 16, 2);
game.throw('3', 19, 3);
game.throw('4', 6);
game.throw('4', 13, 2);
game.throw('4', 17, 3);
game.throw('5', 16);
game.throw('5', 15, 2);
game.throw('5', 14, 3);

console.log(game.score('0'));
console.log(game.score('6'));
console.log(game.getLeaders());

game.printTable();

game.throw('0', 10);
game.throw('0', 10, 2);
game.throw('0', 10, 3);
game.throw('1', 2);
game.throw('1', 15, 2);
game.throw('1', 18, 3);
game.throw('2', 7);
game.throw('2', 2, 2);
game.throw('2', 8, 3);
game.throw('3', 20);
game.throw('3', 16, 2);
game.throw('3', 19, 3);
game.throw('4', 6);
game.throw('4', 13, 2);
game.throw('4', 17, 3);
game.throw('5', 16);
game.throw('5', 15, 2);
game.throw('5', 14, 3);

game.printTable();

module.exports = new Game(`It's my game!`, plr1, plr2, plr3, plr4, plr5, plr6);
