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
    offence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    twoPtPercent: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    threePtPercent: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    ppg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    oreb: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    dreb: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    steals: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    blocks: {
      type: DataTypes.DECIMAL(10, 3),
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
