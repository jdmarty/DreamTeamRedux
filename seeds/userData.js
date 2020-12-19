const { User } = require('../models')

const userData = [
  {
    name: "Josh",
    email: "joshu@hotmail.com",
    password: "password12345",
  },
  {
    name: "Lesley",
    email: "lesley@gmail.com",
    password: "password12345",
  },
  {
    name: "Ivan",
    email: "ivan@aol.com",
    password: "password12345",
  },
  {
    name: "AJ",
    email: "aj@hotmail.com",
    password: "password12345",
  },
  {
    name: "Ben",
    email: "ben@gmail.com",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;
