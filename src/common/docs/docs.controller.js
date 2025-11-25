module.exports.getDocs = (req, res) => {
    const routes = global.__registeredRoutes || [];

    res.json({
        name: "Node Redis Server - Auto Docs",
        total: routes.length,
        routes
    });
};
