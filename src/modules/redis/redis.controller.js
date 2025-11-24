const datastore = require('../../core/datastore');
const ValidationError = require("../../common/errors/validation.error");
const redisService = require("./redis.service");

class RedisService {
    constructor() {
        this.channels = new Map();
    }

    publish(req, res) {
        const delivered = redisService.publish(req.body);
        return res.json({ delivered });
    }

    subscribe(req, res) {
        const channel = req.params.channel;

        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        const send = (msg) => {
            res.write(`data: ${JSON.stringify(msg)}\n\n`);
        };

        redisService.subscribe(channel, send);

        req.on("close", () => {
            redisService.unsubscribe(channel, send);
        });
    }


    set({ key, value, ttl }) {
        if (!key || value === undefined) throw new ValidationError('Invalid key or value');
        const ttlMs = ttl ? ttl * 1000 : undefined;
        return datastore.set(key, value, ttlMs);
    }

    get({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.get(key);
    }

    del({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.del(key);
    }

    incr({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.incr(key);
    }

    decr({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.decr(key);
    }

    expire({ key, ttl }) {
        if (!key || ttl === undefined) throw new ValidationError('Key and TTL required');
        return datastore.expire(key, ttl * 1000);
    }

    ttl({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.ttlRemaining(key);
    }
}

module.exports = new RedisService();
