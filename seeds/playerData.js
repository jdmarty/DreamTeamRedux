const { Player } = require("../models");
const playerData = require("../db/scraper/nbaStats2.json");

const seedPlayers = async () => {
  let i;
  let j;
  let temparray;
  const chunk = 10;
  try {
    for (i = 0, j = playerData.length; i < j; i += chunk) {
      temparray = playerData.slice(i, i + chunk);
      try {
        await Player.bulkCreate(temparray);
      } catch(err) {
        console.log(err);
      }

    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = seedPlayers;
