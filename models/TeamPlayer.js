const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");
const Team = require("./Team");

class TeamPlayer extends Model {}

TeamPlayer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "team",
        key: "id",
        unique: false,
      },
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "player",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "team_player",
  }
);

module.exports = TeamPlayer;
