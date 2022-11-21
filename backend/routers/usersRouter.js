const Router = require('express')
const router = new Router()
const controller = require('../controllers/usersController')

router.get('/getMechanics', controller.getMechanics)

module.exports = router