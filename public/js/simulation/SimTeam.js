const SimPlayer = require("./SimPlayer");

class SimTeam {
  constructor(team) {
    //team id, name, and user from input object
    (this.id = team.id), (this.name = team.name), (this.user = team.user.name);
    //create an array of players for each stat block
    this.players = team.players.map((stats) => new SimPlayer(stats));
    //sum the offense and defense player stats to get a team stat
    this.offense = this.players.reduce((a, b) => a + b.offense, 0);
    this.defense = this.players.reduce((a, b) => a + b.defense, 0);
    //generate an array of ids to represent a players chance of scoring
    const generateScoreChance = (players) => {
      let output = [];
      players.forEach((player) => {
        for (let i = 0; i < Math.round(player.offense); i++) {
          output.push(player.id);
        }
      });
      return output;
    };
    this.scoreChance = generateScoreChance(this.players);
    this.score = 0;
  }

  scoreTeam() {
    this.score += 2;
    const scorerIndex = Math.floor(Math.random() * this.scoreChance.length);
    const scorerId = this.scoreChance[scorerIndex];
    const scorer = this.players.find((player) => player.id === scorerId);
    scorer.score();
  }
}

module.exports = SimTeam;
