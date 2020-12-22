const router = require("express").Router();
const { Team, Player, TeamPlayer } = require("../../models");

// create a new TeamPlayer connection
router.post("/", async (req, res) => {
  try {
    const currentConnections = await TeamPlayer.findAll({
      where: { team_id: req.body.team_id }
    });

    if (currentConnections.length >= 5) {
      res.status(400).json({ message: "Team is full! Delete a player from this team before proceeding" });
      return;
    }

    if (currentConnections.find(tc => tc.player_id === req.body.player_id)) {
      res.status(400).json({ message: "Selected player is already on this team!" });
      return;
    }

    const newTeamPlayer = await TeamPlayer.create(req.body);
    res.status(201).json(newTeamPlayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a TeamPlayer connection by team_id and player_id
router.delete("/", async (req, res) => {
  try {
    const deletedTeamPlayer = await TeamPlayer.destroy({
      where: { team_id: req.body.team_id, player_id: req.body.player_id },
    });
    res.status(200).json(deletedTeamPlayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
