const router = require("express").Router();
const { Team, Player, TeamPlayer, User } = require("../../models");

//GET ROUTES====================================================================
// get all teams
router.get("/", async (req, res) => {
  try {
    //find all teams
    const teamData = await Team.findAll({
      include: [
        //join with User on matching user_id
        { model: User, attributes: ['id', 'name'] },
        //join with Player after finding matching id in TeamPlayer named 'players'
        { model: Player, through: TeamPlayer, as: "players" },
      ],
      limit: 25,
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
        { model: User, attributes: ["id", "name"] },
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

// get one team by ID
router.get("/team/:id", async (req, res) => {
  try {
    //find one team by the associated id
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name"] },
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
//===========================================================================

//POST ROUTES================================================================
//create a new team
router.post("/", async (req, res) => {
  //request should contain a team name, user_id, and array of playerIds
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

    //if players were sent in the request
    if (req.body.playerIds.length) {
      //map out an array of objects to create teamPlayer links
      const teamPlayerArr = req.body.playerIds.map((player_id) => {
        return { 
          team_id: newTeam.id,
          player_id 
        }
      })
      //create teamPlayer links for each object
      const newTeamPlayers = await TeamPlayer.bulkCreate(teamPlayerArr)
      res.status(200).json({
        newTeam,
        newTeamPlayers,
      });
    } else {
      res.status(200).json(newTeam);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//==========================================================================

//PUT ROUTES================================================================
//update a team name
router.put("/:id", async (req, res) => {
  //request should contain a team name, user_id, and array of playerIds
  try {
    //update the team at the supplied id
    const updatedTeam = await Team.update(req.body, {
      where: { id: req.params.id },
    });
    //get all TeamPlayer link associated with this team
    const teamPlayers = await TeamPlayer.findAll({ where: { team_id: req.params.id }})
    //get a list of all playerIds on this team
    const currentPlayerIds = teamPlayers.map(({ player_id }) => player_id)
    //find all players not currently on this team and create new tags
    const newTeamPlayers = req.body.playerIds
      .filter(player_id => !currentPlayerIds.includes(player_id))
      .map(player_id => {
        return {
          team_id: req.params.id,
          player_id
        }
      })
    //find the ids for all TeamPlayer links that need removed
    const teamPlayersToRemove = teamPlayers
      .filter(({ player_id }) => !req.body.playerIds.includes(player_id))
      .map(({ id }) => id)
    //destroy teamPlayers that need removed and create ones that need added
    const updatedData = await Promise.all([
      TeamPlayer.destroy({ where: { id: teamPlayersToRemove } }),
      TeamPlayer.bulkCreate(newTeamPlayers)
    ]);
    res.status(200).json({
      teamUpdates: updatedTeam[0],
      removedTeamPlayers: updatedData[0],
      newTeamPlayers: updatedData[1]
    })
  } catch (err) {
    res.status(500).json(err);
  }
})
//==========================================================================

//DELETE ROUTES=============================================================
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
//==========================================================================

module.exports = router;
