module.exports = {
    plugins: [
        // require("precss"),
        require("postcss-preset-env")({
            autoprefixer: {
                flexbox: "no-2009"
            },
            stage: 3
        }),
        require("cssnano")
    ]
};
