const { Cavs, Warriors, Best } = require('./baseData');
const SimTeam = require("./SimTeam");

class SimGame {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = new SimTeam(homeTeam);
    this.awayTeam = new SimTeam(awayTeam);
    this.log = [];
  }

  resolvePossession(offTeam, defTeam) {
    const record = {}
    const offResult = Math.ceil(Math.random() * 100) + offTeam.offense;
    const defResult = Math.ceil(Math.random() * 85) + defTeam.defense;
    if (offResult >= defResult) {
      offTeam.scoreTeam();
    }
    record[this.homeTeam.name] = this.homeTeam.score;
    record[this.awayTeam.name] = this.awayTeam.score;
    return record
  }

  runGame() {
    let pos = 0;
    let posCount = 0;
    this.log.push('First Quarter')
    //run the game until all possessions are complete
    while (posCount < 220 || this.homeTeam.score === this.awayTeam.score) {
      //alternate possession  
      if (pos % 2) {
        const current = this.resolvePossession(this.awayTeam, this.homeTeam);
        this.log.push(current)
      } else {
        const current = this.resolvePossession(this.homeTeam, this.awayTeam);
        this.log.push(current)
      }
      if (Math.floor(posCount) === 50 && !this.log.includes("Second Quarter")) {
        this.log.push("Second Quarter");
      }
      if (Math.floor(posCount) === 100 && !this.log.includes("Third Quarter")) {
        this.log.push("Third Quarter");
      }
      if (Math.floor(posCount) === 150 && !this.log.includes("Fourth Quarter")) {
        this.log.push("Fourth Quarter");
      }
      posCount += 1 + Math.random() * 0.5;
      pos++;
    }
    //log the final result
    this.log.push(`${this.homeTeam.name}: ${this.homeTeam.score} | ${this.awayTeam.name}: ${this.awayTeam.score}`)
    if (this.homeTeam.score > this.awayTeam.score) {
        this.log.push(`${this.homeTeam.name} Win!`)
    } else {
        this.log.push(`${this.awayTeam.name} Win!`)
    }
    console.log(this.log);
    return this.log
  }

  getPlayerScores() {
      const homeScores = this.homeTeam.players.map(player => {
          return { name: player.name, points: player.points }
      })
      const awayScores = this.awayTeam.players.map((player) => {
        return { name: player.name, points: player.points };
      });
      console.log(homeScores, awayScores, (this.homeTeam.score + this.awayTeam.score))
  }

}

// const game = new SimGame(Cavs, Warriors)

// game.runGame()
// game.getPlayerScores()

module.exports = SimGame
