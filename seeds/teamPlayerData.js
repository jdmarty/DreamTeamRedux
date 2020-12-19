const { TeamPlayer } = require('../models')

const teamPlayerData = [
  {
    team_id: 1,
    player_id: 1,
  },
  {
    team_id: 1,
    player_id: 2,
  },
  {
    team_id: 1,
    player_id: 3,
  },
  {
    team_id: 1,
    player_id: 4,
  },
  {
    team_id: 1,
    player_id: 5,
  },
  {
    team_id: 2,
    player_id: 1,
  },
  {
    team_id: 2,
    player_id: 3,
  },
  {
    team_id: 2,
    player_id: 5,
  },
  {
    team_id: 3,
    player_id: 1,
  },
];

const seedTeamPlayer = () => TeamPlayer.bulkCreate(teamPlayerData);

module.exports = seedTeamPlayer