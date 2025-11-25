const ValidationError = require("../../../common/errors/validation.error");
const redisKeyValueService = require('./key-value.service');

class RedisKeyValueController {
    set(req, res) {
        try {
            const { key, value, ttl } = req.body;
            const result = redisKeyValueService.set({ key, value, ttl });
            return res.json({ key, value, result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    get(req, res) {
        try {
            const { key } = req.params;
            const value = redisKeyValueService.get({ key });
            return res.json({ key, value });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    del(req, res) {
        try {
            const { key } = req.params;
            const result = redisKeyValueService.del({ key });
            return res.json({ key, deleted: result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    incr(req, res) {
        try {
            const { key } = req.params;
            const value = redisKeyValueService.incr({ key });
            return res.json({ key, value });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    decr(req, res) {
        try {
            const { key } = req.params;
            const value = redisKeyValueService.decr({ key });
            return res.json({ key, value });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    expire(req, res) {
        try {
            const { key, ttl } = req.body;
            const result = redisKeyValueService.expire({ key, ttl });
            return res.json({ key, ttl, result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    ttl(req, res) {
        try {
            const { key } = req.params;
            const remaining = redisKeyValueService.ttl({ key });
            return res.json({ key, ttl: remaining });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RedisKeyValueController();