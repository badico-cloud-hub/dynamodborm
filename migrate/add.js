function add(fs, path, mkdirp, migrationName, { kind }) {
    if (!migrationName || typeof migrationName !== 'string') {
        throw new Error('migration name not given')
    }
    const { commandDirPath } = this
    if(!fs.existsSync(path.join(commandDirPath, 'src', 'migrations'))) {
        mkdirp.sync(path.join(commandDirPath, 'src', 'migrations'))
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
            commandDirPath,
            'src',
            'migrations',
            `${(new Date()).toISOString()}_${migrationName}.js`
        ),
        content,
        'utf8',
    )
}
 
module.exports = { add }