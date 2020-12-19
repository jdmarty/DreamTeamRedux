const router = require("express").Router();
const { Team, Player, TeamPlayer, User } = require("../../models");

// get all teams
router.get("/", async (req, res) => {
  try {
    //find all teams
    const teamData = await Team.findAll({
      include: [
        //join with User on matching user_id
        { model: User },
        //join with Player after finding matching id in TeamPlayer named 'players'
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });
    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one team
router.get("/:id", async (req, res) => {
  try {
    //find one team by the associated id
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });

    if (!teamData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new team
router.post("/", async (req, res) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name,
      user_id: req.session.user_id || req.body.user_id,
    });
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
