const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    console.log('here');
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const newUser = User.create(req.body)

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      
      res.json({ user: newUser, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
