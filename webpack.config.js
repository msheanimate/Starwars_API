module.exports = {
    context: __dirname + '/',
    entry: {
        app: [
                "./client/app.ts", 
                "./client/controllers/product.ts",
                "./client/controllers/productListCtrl.ts",
                "./client/services/common.services.ts",
                "./client/services/dataAccessService.ts",
                "./client/services/productResourceMock.ts"
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