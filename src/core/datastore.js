class DataStore {
    constructor() {
        this.store = new Map();
        this.ttl = new Map();
    }

    set(key, value, ttlMs) {
        this.store.set(key, value);
        if (ttlMs) this.ttl.set(key, Date.now() + ttlMs);
        else this.ttl.delete(key);
        return true;
    }

    get(key) {
        if (this.ttl.has(key) && Date.now() > this.ttl.get(key)) {
            this.del(key);
            return null;
        }
        return this.store.get(key) ?? null;
    }

    del(key) {
        this.ttl.delete(key);
        return this.store.delete(key);
    }

    incr(key) {
        let val = parseInt(this.get(key)) || 0;
        val++;
        this.set(key, val);
        return val;
    }

    decr(key) {
        let val = parseInt(this.get(key)) || 0;
        val--;
        this.set(key, val);
        return val;
    }

    expire(key, ttlMs) {
        if (!this.store.has(key)) return false;
        this.ttl.set(key, Date.now() + ttlMs);
        return true;
    }

    ttlRemaining(key) {
        if (!this.ttl.has(key)) return -1;
        const rem = this.ttl.get(key) - Date.now();
        return rem > 0 ? Math.ceil(rem / 1000) : -2;
    }

    cleanup() {
        const now = Date.now();
        for (const [key, exp] of this.ttl.entries()) {
            if (now > exp) this.del(key);
        }
    }
}

const datastore = new DataStore();
setInterval(() => datastore.cleanup(), 1000);
module.exports = datastore;
