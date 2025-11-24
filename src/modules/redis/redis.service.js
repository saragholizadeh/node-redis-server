const datastore = require('../../core/datastore');
const ValidationError = require("../../common/errors/validation.error");

class RedisService {
    constructor() {
        this.channels = new Map();
    }

    publish({ channel, message }) {
        if (!channel || message === undefined)
            throw new ValidationError("Channel and message required");

        const subscribers = this.channels.get(channel);
        if (!subscribers || subscribers.size === 0) return 0;

        subscribers.forEach(cb => cb(message));
        return subscribers.size;
    }

    subscribe(channel, callback) {
        if (!this.channels.has(channel)) {
            this.channels.set(channel, new Set());
        }
        this.channels.get(channel).add(callback);
    }

    unsubscribe(channel, callback) {
        if (this.channels.has(channel)) {
            this.channels.get(channel).delete(callback);
        }
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
