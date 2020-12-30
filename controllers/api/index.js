const router = require('express').Router();
const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const playerRoutes = require('./playerRoutes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

module.exports = router;
