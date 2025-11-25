module.exports = function meta(metadata) {
    return function (req, res, next) {
        req.__routeMeta = metadata || {};
        next();
    };
};
