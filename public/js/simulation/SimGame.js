const { Team } = require("../../../models");
const SimTeam = require("./SimTeam");

class SimGame {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = new SimTeam(homeTeam);
    this.awayTeam = new SimTeam(awayTeam);
    this.scoreboard = {
      homeScore: 0,
      awayScore: 0,
    };
    this.log = [];
  }

  resolvePossession(offTeam, defTeam) {
    const offResult = Math.ceil(Math.random() * 100) + offTeam.offense;
    const defResult = Math.ceil(Math.random() * 50) + defTeam.defense;
    if (offResult >= defResult) {
      offTeam.scoreTeam();
      if (offTeam === this.homeTeam) {
        this.scoreboard.homeScore += 2;
        this.log.push(this.scoreboard);
      } else {
        this.scoreboard.awayScore += 2;
        this.log.push(this.scoreboard);
      }
    }
  }

  runGame() {
    let pos = 0;
    let posCount = 0;
    this.log.push('First Quarter')
    while (posCount < 200 || this.scoreboard.homeScore === this.scoreboard.awayScore) {
      if (!pos % 2) {
        this.resolvePossession(this.homeTeam, this.awayTeam);
      } else {
        this.resolvePossession(this.awayTeam, this.homeTeam);
      }
      if (Math.round(posCount) === 50 && !this.log.includes("Second Quarter")) {
        this.log.push("Second Quarter");
      }
      if (Math.round(posCount) === 100 && !this.log.includes("Third Quarter")) {
        this.log.push("Third Quarter");
      }
      if (Math.round(posCount) === 100 && !this.log.includes("Fourth Quarter")) {
        this.log.push("Fourth Quarter");
      }
      posCount += 1 + Math.random() * 0.5;
      pos++;
    }
    this.log.push(`${this.homeTeam.name}: ${this.homeTeam.score} | ${this.awayTeam.name}: ${this.awayTeam.score}`)
    if (this.homeScore > this.awayScore) {
        this.log.push(`${this.homeTeam} Wins!`)
    } else {
        this.log.push(`${this.homeTeam} Wins!`)
    }
    return this.log
  }
}
