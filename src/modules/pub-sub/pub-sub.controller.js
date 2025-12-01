const ValidationError = require("../../common/errors/validation.error");
const redisPubSubService = require("./pub-sub.service");

class RedisPubSubController {
    publish(req, res) {
        try {
            const delivered = redisPubSubService.publish(req.body);
            return res.json({ delivered });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    subscribe(req, res) {
        try {
            const channel = req.params.channel;

            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            });

            const send = (msg) => {
                res.write(`data: ${JSON.stringify(msg)}\n\n`);
            };

            redisPubSubService.subscribe(channel, send);

            req.on("close", () => {
                redisPubSubService.unsubscribe(channel, send);
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RedisPubSubController();
