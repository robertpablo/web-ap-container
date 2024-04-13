const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
    const orgName = "ropabajoContainerApp";
    const defaultConfig = singleSpaDefaults({
        orgName,
        projectName: "web-ap-container",
        webpackConfigEnv,
        argv,
        disableHtmlGeneration: true,
    });

    return merge(defaultConfig, {
        plugins: [
            new HtmlWebpackPlugin({
                baseUrl: "/ropabajocontainer/",
                inject: false,
                template: "src/index.ejs",
                templateParameters: {
                    isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
                    orgName,
                },
            }),
        ],
    });
};
