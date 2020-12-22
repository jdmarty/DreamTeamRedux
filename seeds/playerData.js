const { Player } = require("../models")
const playerData = require("./nbaStats.json")

const seedPlayers = () => Player.bulkCreate(playerData);

module.exports = seedPlayers;
