class SimPlayer {
  constructor(stats) {
    this.id = stats.id;
    this.name = stats.player_name;
    this.offense =
      (stats.pts * 0.8 + stats.oreb * 0.2 + stats.ast * 0.2 - stats.tov * 0.1) *
      (stats.tspct / 1.2);
    this.defense = stats.dreb + stats.stl + stats.blk;
    this.points = 0;
  }

  score() {
    this.points += 2;
  }
}

module.exports = SimPlayer;
