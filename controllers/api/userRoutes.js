/* eslint-disable new-cap */
const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    // look for a user with the target email
    const userData = await User.findOne({ where: { email: req.body.email } });
    // if one is not found alert an error
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // check password validity
    const validPassword = await userData.checkPassword(req.body.password);
    // if passwords do not match, alert an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // save session details with user id and name
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.user_name = newUser.name;
      req.session.logged_in = true;
      res.json({ user: newUser, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
