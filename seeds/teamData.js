const { Team } = require("../models");

const teamData = [
  {
    name: "2016 Cavs",
    user_id: 1,
  },
  {
    name: "2016 Warriors",
    user_id: 1,
  },
  {
    name: "The Best",
    user_id: 1,
  },
  {
    name: "'92 Dream Team",
    user_id: 1,
  },
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;
