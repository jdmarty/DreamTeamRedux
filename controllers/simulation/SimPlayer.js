class SimPlayer {
  constructor(stats) {
    this.id = stats.id;
    this.name = stats.player_name;
    //scores for chance calculations
    this.chance = {
      pointScore: stats.pts,
      assistScore: stats.ast,
      reboundScore: stats.reb,
      blockScore: stats.blk,
      stealScore: stats.stl
    }
    //offense and defense score for team
    this.offense =
      (stats.pts * 0.8 + stats.oreb * 0.2 + stats.ast * 0.2 - stats.tov * 0.1) *
      (stats.tspct / 1.2);
    this.defense = stats.dreb + stats.stl + stats.blk;
    //initialize with empty stats
    this.gameStats = {
      points: 0,
      assists: 0,
      rebounds: 0,
      blocks: 0,
      steals: 0,
    }
  }

  score() {
    this.gameStats.points += 2;
  }

  assist() {
    this.gameStats.assists++
  }

  rebound() {
    this.gameStats.rebounds++
  }

  block() {
    this.gameStats.blocks++
  }

  steal() {
    this.gameStats.steals++
  }
}

module.exports = SimPlayer;
