module.exports = {
    presets: [
      '@babel/preset-typescript',
      'vue',
    ],
    "plugins": [
      ["@babel/proposal-decorators", { "legacy": true }],
      ["@babel/proposal-class-properties", { "loose": true }]
    ]
}
