const fs = require('fs');
const path = require('path');

function loadModules(app, modulesPath) {
    const folders = fs.readdirSync(modulesPath).filter(f =>
        fs.statSync(path.join(modulesPath, f)).isDirectory()
    );

    folders.forEach(folder => {
        const routeFile = path.join(modulesPath, folder, `${folder}.routes.js`);

        if (fs.existsSync(routeFile)) {
            const router = require(routeFile);

            router.__baseFolder = folder;

            app.use(`/api/${folder}`, router);
            console.log(`Loaded module routes: /api/${folder}`);
        }
    });
}

module.exports = loadModules;
