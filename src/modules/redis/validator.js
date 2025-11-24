function validateSet(req, res, next) {
    const { key, value, ttl } = req.body;

    if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Key must be a non-empty string' });
    }

    if (value === undefined) {
        return res.status(400).json({ error: 'Value is required' });
    }

    if (ttl !== undefined && (typeof ttl !== 'number' || ttl < 0)) {
        return res.status(400).json({ error: 'TTL must be a positive number in seconds' });
    }

    next();
}

function validateExpire(req, res, next) {
    const { key, ttl } = req.body;

    if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'Key must be a non-empty string' });
    }

    if (ttl === undefined || typeof ttl !== 'number' || ttl < 0) {
        return res.status(400).json({ error: 'TTL must be a positive number in seconds' });
    }

    next();
}

module.exports = { validateSet, validateExpire };
