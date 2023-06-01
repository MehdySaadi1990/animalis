const express =require('express')
const router = express.Router()
const app = express()

const userCtrl = require('../controllers/users')

router.post('/', userCtrl.signup);
router.get('/verify/:id/:token', userCtrl.confirm)
router.post('/login', userCtrl.login);
router.post('/forgotPassword', userCtrl.sendEmailForPassword)
router.put('/:id/:token/resetPassword', userCtrl.resetPassword)

module.exports = router;