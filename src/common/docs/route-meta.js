module.exports = function meta(metadata) {
    const metaMiddleware = function(req, res, next) {
        req.__routeMeta = metadata || {};
        next();
    };
    metaMiddleware.metadata = metadata || {};
    metaMiddleware._name = "metaMiddleware";
    return metaMiddleware;
};
