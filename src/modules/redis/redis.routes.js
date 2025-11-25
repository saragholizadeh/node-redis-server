const express = require('express');
const router = express.Router();

const path = require("path");
const fs = require("fs");

const submodules = ["pub-sub", "key-value", "lists"];

submodules.forEach((name) => {
    const routePath = path.join(__dirname, name, `${name}.routes.js`);
    if (fs.existsSync(routePath)) {
        const subRouter = require(routePath);
        router.use(`/${name}`, subRouter);
        console.log(`↳ Redis loaded: /api/redis/${name}`);
    } else {
        console.warn(`⚠️ Route not found for redis submodule: ${name}`);
    }
});

module.exports = router;
