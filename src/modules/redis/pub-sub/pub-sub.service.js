const ValidationError = require("../../../common/errors/validation.error");

class RedisPubSubService {
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
}

module.exports = new RedisPubSubService();
