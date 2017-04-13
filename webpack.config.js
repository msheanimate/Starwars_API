module.exports = {
    context: __dirname + '/',
    entry: {
        app: [
                "./client/app.ts", 
                "./client/controllers/graphOptions.ts",
                "./client/controllers/movieListCtrl.ts",
                "./client/services/common.services.ts",
                "./client/services/dataAccessService.ts"
            ],
    },
    output: {
        path: __dirname + '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}