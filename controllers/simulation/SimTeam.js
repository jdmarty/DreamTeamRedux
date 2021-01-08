/* eslint-disable require-jsdoc */
const SimPlayer = require("./SimPlayer");

class SimTeam {
  constructor(team) {
    // team id, name, and user from input object
    (this.id = team.id), (this.name = team.name), (this.user = team.user.name);
    // create an array of players for each stat block
    this.players = team.players.map((stats) => new SimPlayer(stats));
    // sum the offense and defense player stats to get a team stat
    this.offense = this.players.reduce((a, b) => a + b.offense, 0);
    this.defense = this.players.reduce((a, b) => a + b.defense, 0);
    // sum other stats for calculations of assists and rebounds
    this.totalAssists = this.players.reduce((a, b) => a + b.stats.assists, 0);
    this.totalFGM = this.players.reduce((a, b) => a + b.stats.fgmade, 0);
    this.assistPerFGM = this.totalAssists / this.totalFGM;
    this.assistBeat = (1 - this.assistPerFGM) * 100;
    this.totalORebs = this.players.reduce((a, b) => a + b.stats.offRebs, 0);
    this.oRebsPerPos = this.totalORebs / 105;
    this.oRebBeat = (1 - this.oRebsPerPos) * 100;
    // generate an array of ids to represent a players chance of performing an action
    const generateChance = (players, type) => {
      const output = [];
      players.forEach((player) => {
        for (let i = 0; i < Math.round(player.stats[type] * 10); i++) {
          output.push(player.id);
        }
      });
      return output;
    };
    // generate an array of events based on how a team plays defense
    const generateDefense = (players) => {
      const output = [];
      players.forEach((player) => {
        for (let i = 0; i < Math.round(player.stats.rebounds * 10); i++) {
          output.push("rebound");
        }
        for (let i = 0; i < Math.round(player.stats.blocks * 10); i++) {
          output.push("block");
        }
        for (let i = 0; i < Math.round(player.stats.steals * 10); i++) {
          output.push("steal");
        }
      });
      return output;
    };
    // create an array for each chance of an event occuring
    this.eventChances = {
      scoreChance: generateChance(this.players, "points"),
      assistChance: generateChance(this.players, "assists"),
      reboundChance: generateChance(this.players, "rebounds"),
      blockChance: generateChance(this.players, "blocks"),
      stealChance: generateChance(this.players, "steals"),
      defenseType: generateDefense(this.players),
    };
    // initialize team with no score
    this.score = 0;
  }
  // method to determine which player participated on a play
  calcParticipant(arr, method) {
    const participantIndex = Math.floor(
      Math.random() * this.eventChances[arr].length
    );
    const participantId = this.eventChances[arr][participantIndex];
    const participant = this.players.find(
      (player) => player.id === participantId
    );
    if (method) {
      participant[method]();
    }
    return participant;
  }

  // method to determine what type of turnover the defense forced
  calcDefenseType() {
    const typeIndex = Math.floor(
      Math.random() * this.eventChances.defenseType.length
    );
    const type = this.eventChances.defenseType[typeIndex];
    return type;
  }
  // score team and award points, assists, and rebounds
  scoreTeam(shooter) {
    const result = [];
    this.score += 2;
    // Score the player who took the shot
    shooter.score();
    result.push({ type: "Score", player: shooter.name });
    // Randomly give a player an assist based on assist chance
    const didContribute = Math.random() * 100;
    if (didContribute > this.assistBeat) {
      const assist = this.calcParticipant("assistChance", "assist");
      result.push({ type: "Assist", player: assist.name });
    }
    // Randomly give a player a rebound based on rebound chance
    if (didContribute > this.oRebBeat) {
      const rebound = this.calcParticipant("reboundChance", "rebound");
      result.push({ type: "Rebound", player: rebound.name });
    }
    return result;
  }

  defenseTeam() {
    const result = [];
    // determine what type of turnover occurred
    const type = this.calcDefenseType();
    // for each type, determine which player did it and add to their stats
    if (type === "rebound") {
      const rebound = this.calcParticipant("reboundChance", "rebound");
      result.push({ type: "Rebound", player: rebound.name });
    } else if (type === "block") {
      const block = this.calcParticipant("blockChance", "block");
      result.push({ type: "Block", player: block.name });
    } else {
      const steal = this.calcParticipant("stealChance", "steal");
      result.push({ type: "Steal", player: steal.name });
    }
    return result;
  }
}

module.exports = SimTeam;
