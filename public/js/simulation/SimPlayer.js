class SimPlayer {
  constructor(stats) {
    this.id = stats.id;
    this.name = stats.player_name;
    //scores for chance calculations
    this.pointScore = stats.pts
    this.assistScore = stats.ast;
    this.reboundScore = stats.reb;
    this.blockScore = stats.blk;
    this.stealScore = stats.stl;
    //offense and defense score for team
    this.offense =
      (stats.pts * 0.8 + stats.oreb * 0.2 + stats.ast * 0.2 - stats.tov * 0.1) *
      (stats.tspct / 1.2);
    this.defense = stats.dreb + stats.stl + stats.blk;
    //initialize with empty stats
    this.points = 0;
    this.assists = 0;
    this.rebounds = 0;
    this.blocks = 0;
    this.steals = 0;
  }

  score() {
    this.points += 2;
  }

  assist() {
    this.assists++
  }

  rebound() {
    this.rebounds++
  }

  block() {
    this.blocks++
  }

  steal() {
    this.steals++
  }
}

module.exports = SimPlayer;
