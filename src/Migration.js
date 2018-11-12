
import Connection from './Connection'
class Migration extends Connection {
    async createTable({ Model }) {
        return this.mapper.ensureTableExists(
            Model,
            {
                readCapacityUnits: Model.readCapacity, // TODO: add readCapactity in Model
                writeCapacityUnits: Model.writeCapacity, // TODO: add writeCapactity in Model
            }).then(() => this )
    }

    async dropTable({ Model }) {
        return this.mapper.ensureTableNotExists(Model).then(() => this)
    }

    // TODO: CHANGE
}


