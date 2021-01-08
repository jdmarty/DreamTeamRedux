/* eslint-disable new-cap */
const router = require("express").Router();
const { Team, Player, TeamPlayer, User } = require("../../models");
const SimGame = require("../simulation/SimGame");

// GET ROUTE TO RETRIEVE TEAMS FOR GAME
router.get("/", async (req, res) => {
  try {
    // find the home team
    const homeTeamData = await Team.findByPk(req.query.homeId, {
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });
    const homeTeam = homeTeamData.get({ plain: true });
    // find the away team
    const awayTeamData = await Team.findByPk(req.query.awayId, {
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });
    const awayTeam = awayTeamData.get({ plain: true });
    // create a new game for these two teams
    const newGame = new SimGame(homeTeam, awayTeam);
    // run a game for these teams and send the results
    const completedGame = newGame.runGame();
    res.status(200).json(completedGame);
    return newGame;
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
