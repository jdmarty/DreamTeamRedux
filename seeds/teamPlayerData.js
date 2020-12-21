const { TeamPlayer } = require('../models')

const teamPlayerData = [
  {
    team_id: 1,
    player_id: 1,
  },
  {
    team_id: 1,
    player_id: 3,
  },
  {
    team_id: 1,
    player_id: 5,
  },
  {
    team_id: 1,
    player_id: 7,
  },
  {
    team_id: 1,
    player_id: 9,
  },
  {
    team_id: 2,
    player_id: 100,
  },
  {
    team_id: 2,
    player_id: 101,
  },
  {
    team_id: 2,
    player_id: 102,
  },
  {
    team_id: 2,
    player_id: 103,
  },
  {
    team_id: 2,
    player_id: 104,
  },
];

const seedTeamPlayer = () => TeamPlayer.bulkCreate(teamPlayerData);

module.exports = seedTeamPlayer