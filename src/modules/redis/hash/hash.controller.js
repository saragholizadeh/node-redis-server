const redisHashService = require("./hash.service");
const ValidationError = require("../../../common/errors/validation.error");

class RedisHashController {
    hset(req, res) {
        try {
            const { key, field, value } = req.body;
            const result = redisHashService.hset({ key, field, value });
            return res.json({ key, field, value, result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    hget(req, res) {
        try {
            const { key, field } = req.params;
            const value = redisHashService.hget({ key, field });
            return res.json({ key, field, value });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    hdel(req, res) {
        try {
            const { key, field } = req.params;
            const result = redisHashService.hdel({ key, field });
            return res.json({ key, field, deleted: result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }

    hgetall(req, res) {
        try {
            const { key } = req.params;
            const result = redisHashService.hgetall({ key });
            return res.json({ key, fields: result });
        } catch (err) {
            if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RedisHashController();
