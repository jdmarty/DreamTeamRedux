const User = require("./User");
const Team = require("./Team");
const TeamPlayer = require("./TeamPlayer");
const Player = require("./Player");

User.hasMany(Team, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Team.belongsTo(User, {
  foreignKey: "user_id",
});

Player.belongsToMany(Team, {
  through: {
    model: TeamPlayer,
    unique: false,
  },
  as: "teams",
});

Team.belongsToMany(Player, {
  through: {
    model: TeamPlayer,
    unique: false,
  },
  as: "players",
});

module.exports = { User, Team, Player, TeamPlayer };
