const redisPubSubController = require("./pub-sub.controller");
const meta = require("../../common/docs/route-meta");
const createTrackedRouter = require("../../common/docs/tracked-router");

const router = createTrackedRouter("/pub-sub");

router.post(
    "/publish",
    meta({
        description: "Publish a message to a specific channel",
        body: { channel: "news", message: "Hello World" },
        returns: { published: true }
    }),
    redisPubSubController.publish
);

router.get(
    "/subscribe/:channel",
    meta({
        description: "Subscribe to a Redis channel and receive streaming messages",
        params: { channel: "news" },
        returns: { stream: "Server-Sent Events stream" }
    }),
    redisPubSubController.subscribe
);

module.exports = router;
