const router = require("express").Router();
const { User, Team, Player, TeamPlayer } = require("../models");
const axios = require("axios");

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {

  } catch (err) {
    console.log(err)
    res.status(505).json(err);
  }
});


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
