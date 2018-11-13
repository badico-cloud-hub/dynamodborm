module.exports.up = function(aggregator) {
    const { Model } = aggregator

    return this.createTable(Model)
    
}

module.exports.down = function(aggregator) {
    
}