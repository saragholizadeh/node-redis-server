const express = require("express");
const router = express.Router();

const redisPubSubController = require('./pub-sub.controller');

router.post('/publish', redisPubSubController.publish);
router.get('/subscribe/:channel', redisPubSubController.subscribe);

module.exports = router;