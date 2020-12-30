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
router.get("/", withAuth, async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
})


router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get('/about', async (req, res) => {
  res.render('about');
});

module.exports = router;
