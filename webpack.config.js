const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" 
    },
    watch: true,
    plugins: [
        new Dotenv()
    ]
}