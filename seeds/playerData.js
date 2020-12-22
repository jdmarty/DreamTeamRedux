const { Player } = require("../models")
const playerData = require("../db/scraper/nbaStats2.json")

const seedPlayers = () => Player.bulkCreate(playerData);

module.exports = seedPlayers;
