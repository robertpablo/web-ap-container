const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = (webpackConfigEnv, argv) => {
    const orgName = "containerApp";
    const { URL_UI, URL_HEADER_UI, URL_BULK_LOAD_UI } = process.env;

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
                baseUrl: "/container/",
                inject: false,
                template: "src/index.ejs",
                favicon: './src/favicon.ico',
                templateParameters: {
                    isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
                    orgName,
                    URL_UI,
                    URL_HEADER_UI,
                    URL_BULK_LOAD_UI,
                },
            }),
        ],
    });
};
