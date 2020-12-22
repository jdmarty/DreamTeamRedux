const router = require("express").Router();
const { Team, Player, TeamPlayer } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op


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

// get one player by id
router.get("/player/:id", async (req, res) => {
  try {
    //find one player by the associated id
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

// get one player by name
router.get("/name", async (req, res) => {
  try {
    //remember to replace spaces with %20 when creating url
    //find one player by name
    const playerData = await Player.findAll({
      include: { model: Team, through: TeamPlayer, as: "teams" },
      where: {
        player_name: {
          [Op.like]: `%${req.query.search}%`
        }
      }
    });

    if (!playerData) {
      res.status(404).json({ message: "No player found with this name!" });
      return;
    }

    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
