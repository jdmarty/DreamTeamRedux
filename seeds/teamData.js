const { Team } = require('../models');

const teamData = [
  {
    name: "Lions",
    user_id: 2
  },
  {
    name: "Tigers",
    user_id: 2
  },
  {
    name: "Bears",
    user_id: 3
  },
];

const seedTeams = () => Team.bulkCreate(teamData)

module.exports = seedTeams;