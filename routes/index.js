const router = require('express').Router();
const authRoutes = require('./auth.route');
const userRoutes = require('./users.route');
const photoRoutes = require('./photo.route');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/photos', photoRoutes);

module.exports = router;