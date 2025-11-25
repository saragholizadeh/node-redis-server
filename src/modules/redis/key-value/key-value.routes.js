const express = require('express');
const router = express.Router();
const redisKeyValueController = require('./key-value.controller');

router.post('/set', redisKeyValueController.set);
router.get('/get/:key', redisKeyValueController.get);
router.delete('/del/:key', redisKeyValueController.del);
router.post('/incr/:key', redisKeyValueController.incr);
router.post('/decr/:key', redisKeyValueController.decr);
router.post('/expire', redisKeyValueController.expire);
router.get('/ttl/:key', redisKeyValueController.ttl);

module.exports = router;
