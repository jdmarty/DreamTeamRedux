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




router.get("/runGame", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id },
    });
    if (!userData) {
      res.status(404).json({ message: "No user with this id" });
    }
    const user = userData.get({ plain: true });
    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
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

module.exports = router;
