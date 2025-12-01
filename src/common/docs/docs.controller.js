module.exports.getDocs = (req, res) => {
    const routes = global.__registeredRoutes || [];

    const collection = {
        info: {
            name: "Node Redis Server - Auto Docs",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: routes.map(r => {
            const body = r.meta?.body
                ? JSON.stringify(r.meta.body, null, 2)
                : undefined;

            return {
                name: r.meta?.description || `${r.method} ${r.fullPath}`,
                request: {
                    method: r.method,
                    header: [],
                    body: body
                        ? {
                            mode: "raw",
                            raw: body
                        }
                        : undefined,
                    url: {
                        raw: `http://localhost:3000${r.fullPath}`,
                        protocol: "http",
                        host: ["localhost"],
                        port: "3000",
                        path: r.fullPath.split("/").filter(Boolean)
                    }
                }
            };
        })
    };

    res.json(collection);
};
