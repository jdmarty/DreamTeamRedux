class SimPlayer {
  constructor(stats) {
    this.id = stats.id;
    this.name = stats.player_name;
    //player stats
    this.stats = {
      points: stats.pts,
      assists: stats.ast,
      offRebs: stats.oreb,
      defReb: stats.dreb,
      rebounds: stats.reb,
      blocks: stats.blk,
      steals: stats.stl,
      fgPercent: stats.fgpct*100
    };
    //overall offense and defense score
    this.offense = stats.pts + stats.oreb + stats.ast
    this.defense = stats.dreb + stats.stl + stats.blk;
    //initialize with empty stats
    this.gameStats = {
      points: 0,
      assists: 0,
      rebounds: 0,
      blocks: 0,
      steals: 0,
    };
  }

  score() {
    this.gameStats.points += 2;
  }

  assist() {
    this.gameStats.assists++;
  }

  rebound() {
    this.gameStats.rebounds++;
  }

  block() {
    this.gameStats.blocks++;
  }

  steal() {
    this.gameStats.steals++;
  }
}
// const player = new SimPlayer(stats)
// console.log(player);

module.exports = SimPlayer;
