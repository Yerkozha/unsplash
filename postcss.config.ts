module.exports = function ({ options }){
    return {
        plugins: [
            {
                'postcss-import': {},
                cssnano: options.production === true ? {} : false,
            },
            require('autoprefixer')
        ]
    }
}