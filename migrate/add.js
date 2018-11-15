
const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')

function add(migrationName, { kind }) {    
    // se pasta nao existir criar pasta
    if(!fs.existsSync(path.join('src', 'migrations'))) {
        mkdirp.sync(path.join('src', 'migrations'))
    }

    // carregar template
    const content = `
// migration of kind: ${kind} TODO: add recomendations on template
module.exports.up = function(Aggregator) {
    
    
}

module.exports.down = function(Aggregator) {
    
    
}
    `
    // criar arquivo na pasta
    fs.writeFileSync(
        path.join(
            // __dirname,
            'src',
            'migrations',
            `${(new Date()).toISOString()}_${migrationName}.js`
        ),
        content,
        'utf8',
    )
}
 
module.exports = { add }