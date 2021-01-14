const { User } = require("../models");

const userData = [
  {
    name: "Josh",
    email: "joshu@gmail.com",
    password: "password12345",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
