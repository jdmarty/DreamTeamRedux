const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type: DataTypes.INTEGER
    },
    offence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "player",
  }
);

module.exports = Player;
