const { TeamPlayer } = require('../models')

const teamPlayerData = [
  {
    team_id: 1,
    player_id: 3,
  },
  {
    team_id: 1,
    player_id: 175,
  },
  {
    team_id: 1,
    player_id: 956,
  },
  {
    team_id: 1,
    player_id: 210,
  },
  {
    team_id: 1,
    player_id: 278,
  },
  {
    team_id: 2,
    player_id: 463,
  },
  {
    team_id: 2,
    player_id: 523,
  },
  {
    team_id: 2,
    player_id: 86,
  },
  {
    team_id: 2,
    player_id: 688,
  },
  {
    team_id: 2,
    player_id: 215,
  },
  {
    team_id: 3,
    player_id: 1,
  },
  {
    team_id: 3,
    player_id: 2,
  },
  {
    team_id: 3,
    player_id: 3,
  },
  {
    team_id: 3,
    player_id: 4,
  },
  {
    team_id: 3,
    player_id: 5,
  },
];

const seedTeamPlayer = () => TeamPlayer.bulkCreate(teamPlayerData);

module.exports = seedTeamPlayer