const express = require('express');
const router = express.Router();
const controller = require('./postman.controller');

router.get('/', controller.getCollection);

module.exports = router;
