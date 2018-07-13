let path = require('path')
var fs = require('fs')

var readDir = function (name) {
  return fs.readdirSync(path.join(__dirname,name))
    .filter(filename => /\.js$/.test(filename))
    .map((filename) => {
      let entry = {}
      entry[filename.replace('.js', '')] = [path.join(
        __dirname,
        name,
        filename
      )]
      return entry
    })
    .reduce((finalObject, entry) => Object.assign(finalObject, entry), {})
}

let config = {
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        // query: {
        //   plugins: ['transform-decorators-legacy', "transform-class-properties",
        //   "babel-plugin-syntax-async-functions",
        //   "babel-plugin-transform-async-to-generator" ],
        //   presets: ['es2015', 'stage-0']
        // }
        query: JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), { encoding: 'utf8' }))
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}

function build() {
  return Object.assign({}, config, {
    name: 'dynamodborm',
    entry: readDir('/src'),
    output: {
      path: path.join(__dirname, 'build'),
      library: '[name]',
      libraryTarget: 'commonjs2',
      filename: '[name].js'
    }
  })
}

module.exports = build()