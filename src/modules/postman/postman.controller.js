const fs = require('fs');
const path = require('path');

module.exports.getCollection = (req, res) => {
    const modulesPath = path.join(__dirname, '..');
    const moduleFolders = fs.readdirSync(modulesPath)
        .filter(f => fs.statSync(path.join(modulesPath, f)).isDirectory());

    const items = [];

    moduleFolders.forEach(folder => {
        const metadataPath = path.join(modulesPath, folder, `${folder}.metadata.js`);
        if (fs.existsSync(metadataPath)) {
            const routesMetadata = require(metadataPath);
            routesMetadata.forEach(r => {
                items.push({
                    name: `${r.method} ${folder} ${r.path}`,
                    request: {
                        method: r.method,
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: r.body ? { mode: "raw", raw: JSON.stringify(r.body, null, 2) } : undefined,
                        url: {
                            raw: `http://localhost:3000/api/${folder}${r.path}`,
                            protocol: "http",
                            host: ["localhost"],
                            port: "3000",
                            path: ["api", folder, ...r.path.split('/').filter(Boolean)]
                        },
                        description: r.description
                    }
                });
            });
        }
    });

    const collection = {
        info: {
            name: "Node Redis Server",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: items
    };

    res.json(collection);
};
