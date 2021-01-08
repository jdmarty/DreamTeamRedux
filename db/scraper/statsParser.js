const axios = require("axios").default;

const generatePlayers = async () => {
  // get stats from nba API
  const stats = await axios.get(
    "https://stats.nba.com/stats/leagueLeaders?ActiveFlag=No&LeagueID=00&PerMode=Totals&Scope=S&Season=All+Time&SeasonType=Regular+Season&StatCategory=PTS"
  );
  const output = [];
  // loop through allstats
  stats.data.resultSet.rowSet.forEach((arr) => {
    // if any data is missing, skip this player
    if (arr.includes(null)) return;
    const player = {};

    // pull data out of the array index
    const playerName = arr[1];
    // if player has no last name, return
    if (!playerName.split(" ")[1]) return;
    const playerId = arr[0];
    const gamesPlayed = arr[2];
    const fieldGoalsMade = arr[4];
    const fieldGoalsAttempted = arr[5];
    const fieldGoalPercent = arr[6];
    const offensiveRebounds = arr[13];
    const defensiveRebounds = arr[14];
    const totalRebounds = arr[15];
    const totalAssists = arr[16];
    const totalSteals = arr[17];
    const totalBlocks = arr[18];
    const totalTurnovers = arr[19];
    const points = arr[21];
    const trueShooting = arr[25];

    // generate an object for this player
    player.id = playerId;
    player.player_name = playerName;
    player.gp = gamesPlayed;
    player.pts_total = points;
    player.pts = points / gamesPlayed;
    player.fgm = fieldGoalsMade / gamesPlayed;
    player.fga = fieldGoalsAttempted / gamesPlayed;
    player.fgpct = fieldGoalPercent;
    player.oreb = offensiveRebounds / gamesPlayed;
    player.dreb = defensiveRebounds / gamesPlayed;
    player.reb = totalRebounds / gamesPlayed;
    player.ast = totalAssists / gamesPlayed;
    player.stl = totalSteals / gamesPlayed;
    player.blk = totalBlocks / gamesPlayed;
    player.tov = totalTurnovers / gamesPlayed;
    player.tspct = trueShooting;
    // push that object to the output array
    output.push(player);
  });
  return output;
};

module.exports = generatePlayers;
