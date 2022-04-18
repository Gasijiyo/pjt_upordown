const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware(["/", "/stock"], {
            target: "http://localhost:8011",
            changeOrigin: true,
        })
    );
};