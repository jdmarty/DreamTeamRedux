const router = require("express").Router();
const { Team, Player, TeamPlayer, User } = require("../../models");

// get all Players
router.get("/", async (req, res) => {
  try {
    //find all Players
    const playerData = await Player.findAll({
      include: { model: Team, through: TeamPlayer, as: "teams" },
      limit: 25,
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one player by player_id and season
router.get("/player", async (req, res) => {
  try {
    const playerData = await Player.findOne({
      where: { player_id: req.query.player_id, season: req.query.season },
      include: { model: Team, through: TeamPlayer, as: "teams" },
    });

    if (!playerData) {
      res
        .status(404)
        .json({ message: "No player found with these parameters!" });
      return;
    }

    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one player by id
router.get("/player/:id", async (req, res) => {
  try {
    //find one team by the associated id
    const playerData = await Player.findByPk(req.params.id, {
      include: { model: Team, through: TeamPlayer, as: "teams" },
    });

    if (!playerData) {
      res.status(404).json({ message: "No player found with this id!" });
      return;
    }

    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new player
router.post("/", async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a player
router.delete("/:id", async (req, res) => {
  try {
    //find all TeamPlayers for this player
    const teamPlayersToRemove = await TeamPlayer.findAll({
      where: { player_id: req.params.id },
    });
    const teamPlayerIdsToRemove = teamPlayersToRemove.map(({ id }) => id);
    //remove Teams and TeamPlayers that match the provided ids
    const removedItems = await Promise.all([
      TeamPlayer.destroy({ where: { id: teamPlayerIdsToRemove } }),
      Player.destroy({ where: { id: req.params.id } }),
    ]);
    res.status(200).json({
      deletedPlayers: removedItems[1],
      deletedTeamPlayers: removedItems[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
