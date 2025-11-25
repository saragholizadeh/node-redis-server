const express = require("express");
const router = express.Router();
const redisListController = require("./lists.controller");

router.post("/lpush", redisListController.lpush);
router.post("/rpush", redisListController.rpush);
router.get("/lpop/:key", redisListController.lpop);
router.get("/rpop/:key", redisListController.rpop);
router.get("/lrange/:key", redisListController.lrange);

module.exports = router;
