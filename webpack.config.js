const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals');
const readDir = function (name) {
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

const config = {
  target: 'node',
  // externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
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
      path: path.join(__dirname, 'lib'),
      library: '[name]',
      libraryTarget: 'commonjs2',
      filename: '[name].js'
    }
  })
}

module.exports = build()