const express = require('express')
const router = express.Router()
const { Login, Register } = require('../controllers/user_controller')
const { LoginGoogle, LoginGithub, Loginfb, LoginSteam } = require('../controllers/socmed_controller')
const steam = require('../middlewares/steam_auth')

router.get('/', (req, res) => {
  console.log('getter')
})

router.post('/login', Login)

router.post('/register', Register )

router.post('/loginfb', Loginfb)

router.post('/loginGithub', LoginGithub)

router.post('/loginGoogle', LoginGoogle)

// router.get('/steam/authenticate', steam.authenticate(), function(req, res) {
// 	console.log('steam login');
// });

// router.get('/verify', steam.verify(), LoginSteam)

module.exports = router
