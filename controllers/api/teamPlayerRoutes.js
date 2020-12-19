const router = require("express").Router();
const { Team, Player, TeamPlayer } = require("../../models");

// create a new TeamPlayer connection
router.post("/", async (req, res) => {
  try {
    const newTeamPlayer = TeamPlayer.create(req.body);
    res.status(201).json(newTeamPlayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a TeamPlayer connection by team_id and player_id
router.delete("/", async (req, res) => {
  try {
    const deletedTeamPlayer = TeamPlayer.destroy({
      where: { team_id: req.body.team_id, player_id: req.body.player_id },
    });
    res.status(200).json(deletedTeamPlayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
