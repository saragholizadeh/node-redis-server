const fs = require('fs');
const path = require('path');

class AOF {
    constructor(datastore, fileName = 'appendonly.aof') {
        this.datastore = datastore;
        this.filePath = path.join(__dirname, fileName);
        this.queue = [];

        setInterval(() => this.flush(), 1000);
        this.load();
    }

    append(command, args) {
        // command: "SET", "DEL", "LPUSH", "RPOP", ...
        this.queue.push({ command, args, timestamp: Date.now() });
    }

    flush() {
        if (this.queue.length === 0) return;

        const lines = this.queue.map(item => JSON.stringify(item)).join('\n') + '\n';
        fs.appendFileSync(this.filePath, lines, 'utf8');
        this.queue = [];
    }

    load() {
        if (!fs.existsSync(this.filePath)) return;

        const lines = fs.readFileSync(this.filePath, 'utf8').split('\n').filter(Boolean);

        for (const line of lines) {
            try {
                const { command, args } = JSON.parse(line);
                this.apply(command, args);
            } catch (err) {
                console.error('Failed to parse AOF line:', line);
            }
        }
    }

    apply(command, args) {
        // key-value and lists
        switch (command) {
            case 'SET':
                this.datastore.set(args.key, args.value, args.ttl ? args.ttl * 1000 : undefined);
                break;
            case 'DEL':
                this.datastore.del(args.key);
                break;
            case 'LPUSH':
                this.datastore.lpush(args.key, args.value);
                break;
            case 'RPUSH':
                this.datastore.rpush(args.key, args.value);
                break;
            case 'LPOP':
            case 'RPOP':
                break;
            default:
                console.warn('Unknown AOF command:', command);
        }
    }
}

module.exports = AOF;
