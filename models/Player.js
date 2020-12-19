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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    games_played: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min: {
      type: DataTypes.STRING,
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
    fg3m: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fg3a: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ftm: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fta: {
      type: DataTypes.DECIMAL(10, 2),
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
    turnover: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pf: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pts: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fg_pct: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    fg3_pct: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    ft_pct: {
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
