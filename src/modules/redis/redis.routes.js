const express = require('express');
const router = express.Router();
const redisController = require('./redis.controller');

router.post('/set', redisController.set);
router.get('/get/:key', redisController.get);
router.delete('/del/:key', redisController.del);
router.post('/incr/:key', redisController.incr);
router.post('/decr/:key', redisController.decr);
router.post('/expire', redisController.expire);
router.get('/ttl/:key', redisController.ttl);

router.post('/publish', redisController.publish);
router.get('/subscribe/:channel', redisController.subscribe);

module.exports = router;
