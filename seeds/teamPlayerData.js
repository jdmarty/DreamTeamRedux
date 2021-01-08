const { TeamPlayer } = require("../models");

const teamPlayerData = [
  {
    team_id: 1,
    player_id: 202681,
  },
  {
    team_id: 1,
    player_id: 2544,
  },
  {
    team_id: 1,
    player_id: 201567,
  },
  {
    team_id: 1,
    player_id: 2747,
  },
  {
    team_id: 1,
    player_id: 202684,
  },
  {
    team_id: 2,
    player_id: 203084,
  },
  {
    team_id: 2,
    player_id: 101106,
  },
  {
    team_id: 2,
    player_id: 201939,
  },
  {
    team_id: 2,
    player_id: 203110,
  },
  {
    team_id: 2,
    player_id: 202691,
  },
  {
    team_id: 3,
    player_id: 76003,
  },
  {
    team_id: 3,
    player_id: 252,
  },
  {
    team_id: 3,
    player_id: 2544,
  },
  {
    team_id: 3,
    player_id: 977,
  },
  {
    team_id: 3,
    player_id: 893,
  },
  {
    team_id: 4,
    player_id: 893,
  },
  {
    team_id: 4,
    player_id: 77142,
  },
  {
    team_id: 4,
    player_id: 252,
  },
  {
    team_id: 4,
    player_id: 787,
  },
  {
    team_id: 4,
    player_id: 121,
  },
];

const seedTeamPlayer = () => TeamPlayer.bulkCreate(teamPlayerData);

module.exports = seedTeamPlayer;
