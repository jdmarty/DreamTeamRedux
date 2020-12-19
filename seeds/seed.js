const seedUsers = require('./userData');
const seedTeams = require('./teamData');
const seedPlayers = require('./playerData');
const seedTeamPlayer = require('./teamPlayerData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedTeams();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  await seedPlayers();
  console.log("\n----- TAGS SEEDED -----\n");

  await seedTeamPlayer();
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  process.exit(0);
};


seedAll();
