const fs = require('fs');

class RedisDatastore {
  constructor() {
    this.store = new Map();
    this.ttl = new Map();
    this.lists = new Map();
    this.hashes = new Map();
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
    this.store.delete(key);
    return true;
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

  lpush(key, value) {
    if (!this.lists.has(key)) this.lists.set(key, []);
    this.lists.get(key).unshift(value);
    return this.lists.get(key).length;
  }

  rpush(key, value) {
    if (!this.lists.has(key)) this.lists.set(key, []);
    this.lists.get(key).push(value);
    return this.lists.get(key).length;
  }

  lpop(key) {
    if (!this.lists.has(key) || this.lists.get(key).length === 0) return null;
    return this.lists.get(key).shift();
  }

  rpop(key) {
    if (!this.lists.has(key) || this.lists.get(key).length === 0) return null;
    return this.lists.get(key).pop();
  }

  lrange(key, start = 0, end = -1) {
    if (!this.lists.has(key)) return [];
    const list = this.lists.get(key);
    if (end === -1) end = list.length - 1;
    return list.slice(start, end + 1);
  }

  hset(key, field, value) {
    if (!this.hashes.has(key)) this.hashes.set(key, new Map());
    const hash = this.hashes.get(key);
    hash.set(field, value);
    return true;
  }

  hget(key, field) {
    if (!this.hashes.has(key)) return null;
    return this.hashes.get(key).get(field) ?? null;
  }

  hdel(key, field) {
    if (!this.hashes.has(key)) return false;
    const result = this.hashes.get(key).delete(field);
    return result;
  }

  hgetall(key) {
    if (!this.hashes.has(key)) return {};
    const hash = this.hashes.get(key);
    return Object.fromEntries(hash.entries());
  }

  cleanup() {
    const now = Date.now();
    for (const [key, exp] of this.ttl.entries()) {
      if (now > exp) {
        this.ttl.delete(key);
        this.store.delete(key);
      }
    }
  }

  snapshot() {
    const snapshot = {
      "store": Object.fromEntries(this.store.entries()),
      "lists": Object.fromEntries(this.lists.entries()),
      "hashes": Object.fromEntries(this.hashes.entries()),
      "ttl": Object.fromEntries(this.ttl.entries()),
    }

    fs.writeFile('persistence-rdb.txt', JSON.stringify(snapshot, null, 2), (err) => {
      if (err) {
        console.error('Error writing RDB file:', err);
      }
    }); // we can improve writing file by using streams or other workers
  }
}

const datastore = new RedisDatastore();
setInterval(() => datastore.cleanup(), 1000);
setInterval(() => datastore.snapshot(), 15000);
module.exports = datastore;
