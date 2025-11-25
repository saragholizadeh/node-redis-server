const ValidationError = require("../../../common/errors/validation.error");
const redisListService = require("./lists.service");

class RedisListController {
    lpush(req, res) {
        try {
            const { key, value } = req.body;
            const length = redisListService.lpush({ key, value });
            res.json({ key, length });
        } catch (err) {
            if (err instanceof ValidationError)
                return res.status(400).json({ error: err.message });

            res.status(500).json({ error: err.message });
        }
    }

    rpush(req, res) {
        try {
            const { key, value } = req.body;
            const length = redisListService.rpush({ key, value });
            res.json({ key, length });
        } catch (err) {
            if (err instanceof ValidationError)
                return res.status(400).json({ error: err.message });

            res.status(500).json({ error: err.message });
        }
    }

    lpop(req, res) {
        try {
            const { key } = req.params;
            const value = redisListService.lpop({ key });
            res.json({ key, value });
        } catch (err) {
            if (err instanceof ValidationError)
                return res.status(400).json({ error: err.message });

            res.status(500).json({ error: err.message });
        }
    }

    rpop(req, res) {
        try {
            const { key } = req.params;
            const value = redisListService.rpop({ key });
            res.json({ key, value });
        } catch (err) {
            if (err instanceof ValidationError)
                return res.status(400).json({ error: err.message });

            res.status(500).json({ error: err.message });
        }
    }

    lrange(req, res) {
        try {
            const { key } = req.params;
            const { start, end } = req.query;

            const list = redisListService.lrange({
                key,
                start: parseInt(start) || 0,
                end: parseInt(end) || -1
            });

            res.json({ key, list });
        } catch (err) {
            if (err instanceof ValidationError)
                return res.status(400).json({ error: err.message });

            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RedisListController();
