const express = require('express'),
    router = express.Router()
    users = require('../controllers/users.controller')

//authentication routing
router.route('/register')
    .post(users.create)

module.exports = router