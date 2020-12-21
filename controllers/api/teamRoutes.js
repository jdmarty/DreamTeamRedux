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

//get all teams for a specific user id
router.get("/user/:id", async (req, res) => {
  try {
    const teamData = await Team.findAll({
      where: { user_id: req.params.id },
      include: [
        { model: User },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });

    if (!teamData.length) {
      res.status(404).json({ message: "No teams for this user" });
      return;
    }

    res.status(200).json(teamData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// get one team
router.get("/team/:id", async (req, res) => {
  try {
    //find one team by the associated id
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });

    if (!teamData) {
      res.status(404).json({ message: "No team found with this id!" });
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
    //check how many teams this user already owns
    const userTeams = await Team.findAll({
      where: { user_id: req.body.user_id },
    });

    if (userTeams.length >= 25) {
      res.status(400).json({ message: "Users are limited to 25 teams" });
      return;
    }
    //create new team
    const newTeam = await Team.create({
      name: req.body.name,
      user_id: req.session.user_id || req.body.user_id,
    });
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a team name
router.put("/:id", async (req, res) => {
    try {
      const updatedTeam = await Team.update(req.body, {
        where: { id: req.params.id },
      });

      if (!updatedTeam[0]) {
        res.status(404).json({ message: "No team update performed" });
        return;
      }

      res.status(200).json({
        teamsUpdated: updatedTeam[0],
      });
    } catch (err) {
      res.status(500).json(err);
    }
})

//delete a team
router.delete("/:id", async (req, res) => {
  try {
    //find all TeamPlayers for this player
    const teamPlayersToRemove = await TeamPlayer.findAll({
      where: { team_id: req.params.id },
    });
    const teamPlayerIdsToRemove = teamPlayersToRemove.map(({ id }) => id);
    //remove Teams and TeamPlayers that match the provided ids
    const removedItems = await Promise.all([
      TeamPlayer.destroy({ where: { id: teamPlayerIdsToRemove } }),
      Team.destroy({ where: { id: req.params.id } }),
    ]);
    res.status(200).json({
      deletedTeams: removedItems[1],
      deletedTeamPlayers: removedItems[0],
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
