const redisListController = require("./lists.controller");
const meta = require("../../../common/docs/route-meta");
const createTrackedRouter = require("../../../common/docs/tracked-router");

const router = createTrackedRouter('/lists');

router.post(
    "/lpush",
    meta({
        description: "Push a value to the left side of a list",
        body: { key: "mylist", value: "item1" },
        returns: { length: 4 }
    }),
    redisListController.lpush
);

router.post(
    "/rpush",
    meta({
        description: "Push a value to the right side of a list",
        body: { key: "mylist", value: "item1" },
        returns: { length: 5 }
    }),
    redisListController.rpush
);

router.get(
    "/lpop/:key",
    meta({
        description: "Pop a value from the left side of a list",
        params: { key: "mylist" },
        returns: { value: "item1" }
    }),
    redisListController.lpop
);

router.get(
    "/rpop/:key",
    meta({
        description: "Pop a value from the right side of a list",
        params: { key: "mylist" },
        returns: { value: "item_last" }
    }),
    redisListController.rpop
);

router.get(
    "/lrange/:key",
    meta({
        description: "Return a list of values within a given range",
        params: { key: "mylist" },
        query: { start: 0, end: 5 },
        returns: ["item1", "item2", "item3"]
    }),
    redisListController.lrange
);

module.exports = router;
