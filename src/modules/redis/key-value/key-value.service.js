const ValidationError = require("../../../common/errors/validation.error");
const datastore = require("../../../core/redis-datastore");

class RedisKeyValueService {
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

module.exports = new RedisKeyValueService();
