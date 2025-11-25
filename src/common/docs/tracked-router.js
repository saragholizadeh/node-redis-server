const express = require("express");

if (!global.__registeredRoutes) {
    global.__registeredRoutes = [];
}

function createTrackedRouter(basePath = "") {
    const router = express.Router();

    const track = (method, path, handlers) => {
        const metaMiddleware = handlers.find(h => h.name === "metaMiddleware");

        const meta = metaMiddleware ? metaMiddleware.metadata : {};

        global.__registeredRoutes.push({
            method,
            path,
            fullPath: basePath + path,
            meta
        });
    };

    ["get", "post", "put", "delete", "patch"].forEach(method => {
        const old = router[method];

        router[method] = (path, ...handlers) => {
            track(method.toUpperCase(), path, handlers);
            return old.call(router, path, ...handlers);
        };
    });

    return router;
}

module.exports = createTrackedRouter;
