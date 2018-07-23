var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');
const { registerOrLogin } = require('../controllers/user_controller');
const { LoginSteam } = require('../controllers/socmed_controller')
const steam = require('../middlewares/steam_auth')


/* GET home page. */
router.get('/', (req, res) => {
  console.log('index');
});

router.post('/fblogin', registerOrLogin)

// router.get('/verify', steam.verify(), LoginSteam)

module.exports = router;
