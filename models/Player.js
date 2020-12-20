const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    player_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pts: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fgm: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    fga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fgpct: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    oreb: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dreb: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    reb: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ast: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stl: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    blk: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tov: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tspct: {
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
