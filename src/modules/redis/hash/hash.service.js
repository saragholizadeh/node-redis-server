const ValidationError = require("../../../common/errors/validation.error");
const datastore = require("../../../core/redis-datastore");

class RedisHashService {
    hset({ key, field, value }) {
        if (!key || !field || value === undefined) throw new ValidationError("Key, field, and value required");
        return datastore.hset(key, field, value);
    }

    hget({ key, field }) {
        if (!key || !field) throw new ValidationError("Key and field required");
        return datastore.hget(key, field);
    }

    hdel({ key, field }) {
        if (!key || !field) throw new ValidationError("Key and field required");
        return datastore.hdel(key, field);
    }

    hgetall({ key }) {
        if (!key) throw new ValidationError("Key required");
        return datastore.hgetall(key);
    }
}

module.exports = new RedisHashService();
