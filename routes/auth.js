const express = require('express')
const { register, login, getMe, getAll, logout, deleteUser, getTickets, updateUser, getQROfTicket, googleCallback, countUsers } = require('../controllers/authController')
const passport = require('passport');
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.get('/tickets', protect, getTickets)
router.get('/tickets/qr/:id', protect, getQROfTicket)
router.put('/user/:id', protect, updateUser)
router.get('/user', protect, authorize('admin'), getAll)
router.get('/user/total', protect, authorize('admin'), countUsers)
router.delete('/user/:id', protect, authorize('admin'), deleteUser)
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    googleCallback
  );

module.exports = router
