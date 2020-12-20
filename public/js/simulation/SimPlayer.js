class SimPlayer {
  constructor(stats) {
    this.id = stats.id
    this.name = stats.player_name
    this.offense =
      (stats.pts + (stats.oreb*.1) + (stats.ast*.3) - stats.tov) * (stats.tspct/1.2);
    this.defense = stats.dreb + stats.stl + stats.blk;
    this.points = 0;
  }
}

console.log(players);

module.exports = SimPlayer;
