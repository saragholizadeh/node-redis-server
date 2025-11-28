const ValidationError = require("../../../common/errors/validation.error");
const datastore = require("../../../core/redis-datastore");

class RedisListService {
    lpush({ key, value }) {
        if (!key || value === undefined) throw new ValidationError('Key and value required');
        return datastore.lpush(key, value);
    }

    rpush({ key, value }) {
        if (!key || value === undefined) throw new ValidationError('Key and value required');
        return datastore.rpush(key, value);
    }

    lpop({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.lpop(key);
    }

    rpop({ key }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.rpop(key);
    }

    lrange({ key, start, end }) {
        if (!key) throw new ValidationError('Key required');
        return datastore.lrange(key, start, end);
    }
}

module.exports = new RedisListService();