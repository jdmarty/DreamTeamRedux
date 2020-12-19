const router = require("express").Router();
const { Team, Player, TeamPlayer, User } = require("../../models");

// get all Players
router.get("/", async (req, res) => {
  try {
    //find all Players
    const playerData = await Player.findAll({
      include: { model: Team, through: TeamPlayer, as: "teams" },
      limit: 25
    });
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one player by player_id and season
router.get("/player", async (req,res) => {
    try {
      const playerData = await Player.findOne({
        where: { player_id: req.query.player_id, season: req.query.season },
        include: { model: Team, through: TeamPlayer, as: "teams" }
      })

    if (!playerData) {
      res.status(404).json({ message: "No player found with these parameters!" });
      return;
    }

    res.status(200).json(playerData)
    } catch (err) {
      res.status(500).json(err);
    }
})

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
router.post("/", async (req,res) => {
    
})



module.exports = router