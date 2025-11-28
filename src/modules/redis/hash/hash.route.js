const express = require("express");
const createTrackedRouter = require("../../../common/docs/tracked-router");
const meta = require("../../../common/docs/route-meta");
const redisHashController = require("./hash.controller");

const router = createTrackedRouter("/hash");

router.post(
    "/hset",
    meta({ description: "Set a field in a hash", body: { key: "user:1", field: "name", value: "Alex" } }),
    redisHashController.hset
);

router.get(
    "/hget/:key/:field",
    meta({ description: "Get a field from a hash", params: { key: "user:1", field: "name" } }),
    redisHashController.hget
);

router.delete(
    "/hdel/:key/:field",
    meta({ description: "Remove a field from a hash", params: { key: "user:1", field: "name" } }),
    redisHashController.hdel
);

router.get(
    "/hgetall/:key",
    meta({ description: "Get all fields from a hash", params: { key: "user:1" } }),
    redisHashController.hgetall
);

module.exports = router;
