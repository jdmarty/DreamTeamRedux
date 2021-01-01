const router = require("express").Router();
const { User, Team, Player, TeamPlayer } = require("../models");
const withAuth = require('../util/auth')

//If authorization passes, render homepage
router.get("/", withAuth, async (req, res) => {
  try {
    //find all teams for this user
    const userTeamsData = await Team.findAll({
      where: { user_id: req.session.user_id }
    })
    //serialize teams
    const userTeams = userTeamsData.map(team => team.get({ plain: true }))
    //send array of teams to handlebars
    res.render("login", {
      logged_in: req.session.logged_in,
      userTeams
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to edit an existing team
router.get("/team/:id", withAuth, async (req, res) => {
  try {
    //get data for an existing team
    const teamData = await Team.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Player, through: TeamPlayer, as: "players" },
      ],
    });
    //serialize the data
    const team = teamData.get({ plain: true })
    res.render("login", {
      logged_in: req.session.logged_in,
      team,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

//Route to create a new team
router.get("/new-team", withAuth, async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to go to the run game page
router.get("/game", withAuth, async (req, res) => {
  try {
    //find all teams for this user
    const userTeamsData = await Team.findAll({
      where: { user_id: req.session.user_id }
    })
    //serialize teams
    const userTeams = userTeamsData.map(team => team.get({ plain: true }))
    //send array of teams to handlebars
    res.render("login", {
      logged_in: req.session.logged_in,
      userTeams
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to visit testsim page
router.get("/testsim", async (req, res) => {
  try {
    let homeTeam, awayTeam
    //find all teams for this user
    const userTeamsData = await Team.findAll({
      where: { user_id: req.session.user_id || 2 },
    });
    //serialize teams
    const userTeams = userTeamsData.map((team) => team.get({ plain: true }));

    //find a home team if one is requested in the search
    if (req.query.home) {
      const homeTeamData = await Team.findByPk(req.query.home, {
        include: { model: Player, through: TeamPlayer, as: "players" },
      });
      homeTeam = homeTeamData.get({ plain: true });
    }

    //find an away team if one is request in the search
    if (req.query.away) {
      const awayTeamData = await Team.findByPk(req.query.away, {
        include: { model: Player, through: TeamPlayer, as: "players" },
      });
      awayTeam = awayTeamData.get({ plain: true });
    }

    //create a variable to describe if the game is ready
    const ready = homeTeam && awayTeam ? true : false

    //render the page with retrieved data
    res.render("testsim", {
      logged_in: req.session.logged_in,
      userTeams,
      homeTeam,
      awayTeam,
      ready,
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

//Route to visit the login page
router.get("/login", (req, res) => {
  //If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//Route to visit the about page
router.get('/about', async (req, res) => {
  res.render('about');
});

module.exports = router;
