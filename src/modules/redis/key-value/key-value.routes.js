const redisKeyValueController = require('./key-value.controller');
const meta = require('../../../common/docs/route-meta');
const createTrackedRouter = require('../../../common/docs/tracked-router');

const router = createTrackedRouter('/key-value');

router.post(
    '/set',
    meta({
        description: "Set a key with optional TTL",
        body: { key: "name", value: "alex", ttl: 10000 },
        returns: { success: true }
    }),
    redisKeyValueController.set
);

router.get(
    '/get/:key',
    meta({
        description: "Get the value of a key",
        params: { key: "username" },
        returns: { value: "alex" }
    }),
    redisKeyValueController.get
);

router.delete(
    '/del/:key',
    meta({
        description: "Delete a key",
        params: { key: "username" },
        returns: { deleted: true }
    }),
    redisKeyValueController.del
);

router.post(
    '/incr/:key',
    meta({
        description: "Increase an integer key by 1",
        params: { key: "counter" },
        returns: { value: 6 }
    }),
    redisKeyValueController.incr
);

router.post(
    '/decr/:key',
    meta({
        description: "Decrease an integer key by 1",
        params: { key: "counter" },
        returns: { value: 4 }
    }),
    redisKeyValueController.decr
);

router.post(
    '/expire',
    meta({
        description: "Set key expiration (TTL)",
        body: { key: "session", ttl: 120 },
        returns: { success: true }
    }),
    redisKeyValueController.expire
);

router.get(
    '/ttl/:key',
    meta({
        description: "Get TTL of a key",
        params: { key: "session" },
        returns: { ttl: 85 }
    }),
    redisKeyValueController.ttl
);

module.exports = router;
