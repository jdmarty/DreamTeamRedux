// const { Cavs, Warriors, Best } = require("./baseData");
const SimTeam = require("./SimTeam");

class SimGame {
  constructor(homeTeam, awayTeam) {
    this.homeTeam = new SimTeam(homeTeam);
    this.awayTeam = new SimTeam(awayTeam);
    this.homeScoreOffset = this.homeTeam.offense - this.awayTeam.defense;
    this.awayScoreOffset = this.awayTeam.offense - this.homeTeam.defense;
    this.log = [];
  }

  resolvePossession(offTeam, defTeam) {
    const record = {};
    //calculate which offset to use
    const offset =
      offTeam === this.homeTeam ? this.homeScoreOffset : this.awayScoreOffset;
    const shootingOffset = offset > 100 ? 25 : offset * 0.25;
    //calculate which player takes the shot
    const shooter = offTeam.calcParticipant("scoreChance");
    //calculate which player is on defense
    const defender = defTeam.calcParticipant("scoreChance");
    //take a defended shot
    const shotResult = Math.random() * 100 + defender.defense - shootingOffset;
    if (shotResult <= shooter.stats.fgPercent) {
      const poss = offTeam.scoreTeam(shooter);
      record.possession = poss
    } else {
      const poss = defTeam.defenseTeam();
      record.possession = poss;
    }
    record.homeScore = this.homeTeam.score;
    record.awayScore = this.awayTeam.score;
    return record;
  }

  runGame() {
    let pos = 0;
    let posCount = 0;
    this.log.push("First Quarter");
    //run the game until all possessions are complete
    while (posCount < 220 || this.homeTeam.score === this.awayTeam.score) {
      //alternate possession
      if (pos % 2) {
        const current = this.resolvePossession(this.awayTeam, this.homeTeam);
        this.log.push(current);
      } else {
        const current = this.resolvePossession(this.homeTeam, this.awayTeam);
        this.log.push(current);
      }
      //push messages to show quarter boundaries
      if (Math.floor(posCount) > 50 && !this.log.includes("Second Quarter")) {
        this.log.push("Second Quarter");
      }
      if (Math.floor(posCount) > 100 && !this.log.includes("Third Quarter")) {
        this.log.push("Third Quarter");
      }
      if (Math.floor(posCount) > 150 && !this.log.includes("Fourth Quarter")) {
        this.log.push("Fourth Quarter");
      }
      //alternate possesion and increase posCount by a random toll
      posCount += 1 + Math.random() * 0.5;
      pos++;
    }
    //log the final result
    this.log.push(
      `${this.homeTeam.name}: ${this.homeTeam.score} | ${this.awayTeam.name}: ${this.awayTeam.score}`
    );
    if (this.homeTeam.score > this.awayTeam.score) {
      this.log.push(`${this.homeTeam.name} Win!`);
    } else {
      this.log.push(`${this.awayTeam.name} Win!`);
    }
    // console.log(this.log)
    return this;
  }

  // getPlayerStats() {
  //   const homeStats = this.homeTeam.players.map((player) => {
  //     return {
  //       name: player.name,
  //       points: player.gameStats.points,
  //       assists: player.gameStats.assists,
  //       rebounds: player.gameStats.rebounds,
  //       blocks: player.gameStats.blocks,
  //       steals: player.gameStats.steals,
  //     };
  //   });
  //   const awayStats = this.awayTeam.players.map((player) => {
  //     return {
  //       name: player.name,
  //       points: player.gameStats.points,
  //       assists: player.gameStats.assists,
  //       rebounds: player.gameStats.rebounds,
  //       blocks: player.gameStats.blocks,
  //       steals: player.gameStats.steals,
  //     };
  //   });
  //   console.log(homeStats, awayStats);
  // }

  // getFinalScore() {
  //   console.log(
  //     { home: this.homeTeam.name, score: this.homeTeam.score },
  //     { away: this.awayTeam.name, score: this.awayTeam.score }
  //   );
  // }
}

// const game = new SimGame(Best, Cavs);
// game.runGame();
// game.getPlayerStats();
// game.getFinalScore();

module.exports = SimGame;
