const express = require('express');
const router = express.Router();

const indexController = require("../controllers/IndexController")

/* GET home page. */
router.get('/', indexController.index);

/* POST sendemail route */
router.post('/sendemail', indexController.sendemail);

module.exports = router;
