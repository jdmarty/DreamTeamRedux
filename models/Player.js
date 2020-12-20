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
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    fgm: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    fga: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    fgpct: {
      type: DataTypes.FLOAT(5, 3),
      allowNull: false,
    },
    oreb: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    dreb: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    reb: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    ast: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    stl: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    blk: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    tov: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    tspct: {
      type: DataTypes.FLOAT(5, 3),
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
