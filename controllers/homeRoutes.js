/* eslint-disable new-cap */
const router = require("express").Router();
const { Team, Player, TeamPlayer } = require("../models");
const withAuth = require("../util/auth");

// If authorization passes, render homepage
router.get("/", withAuth, async (req, res) => {
  try {
    // get all teams for this user
    const userTeamsData = await Team.findAll({
      where: { user_id: req.session.user_id || 2 },
    });
    // serialize teams
    const userTeams = userTeamsData.map((team) => team.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      userTeams,
      home: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to visit create team page
router.get("/create-team", withAuth, async (req, res) => {
  res.render("createteam", {
    logged_in: req.session.logged_in,
    createTeam: true,
  });
});

// Route to visit update team page
router.get("/update-team/:id", withAuth, async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, {
      include: { model: Player, through: TeamPlayer, as: "players" },
    });
    team = teamData.get({ plain: true });
    res.render("createteam", {
      logged_in: req.session.logged_in,
      team,
      players: team.players,
      createTeam: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to visit game page
router.get("/game", withAuth, async (req, res) => {
  try {
    let homeTeam;
    let awayTeam;
    // find all teams for this user
    const userTeamsData = await Team.findAll({
      where: { user_id: req.session.user_id },
    });
    // redirect to create a team page if no teams are available
    if (!userTeamsData) {
      res.render("createteam", {
        logged_in: req.session.logged_in,
        createTeam: true,
      });
    }
    // serialize teams
    const userTeams = userTeamsData.map((team) => team.get({ plain: true }));

    // find a home team if one is requested in the search
    if (req.query.home) {
      const homeTeamData = await Team.findByPk(req.query.home, {
        include: { model: Player, through: TeamPlayer, as: "players" },
      });
      homeTeam = homeTeamData.get({ plain: true });
    }

    // find an away team if one is request in the search
    if (req.query.away) {
      const awayTeamData = await Team.findByPk(req.query.away, {
        include: { model: Player, through: TeamPlayer, as: "players" },
      });
      awayTeam = awayTeamData.get({ plain: true });
    }

    // create a variable to describe if the game is ready
    const ready = homeTeam && awayTeam ? true : false;
    console.log(userTeams);
    // render the page with retrieved data
    res.render("game", {
      logged_in: req.session.logged_in,
      userTeams,
      homeTeam,
      awayTeam,
      ready,
      game: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to visit the login page
router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", { logged_in: req.session.logged_in });
});

// Route to visit the about page
router.get("/about", async (req, res) => {
  res.render("about", {
    logged_in: req.session.logged_in,
    about: true,
  });
});

module.exports = router;
