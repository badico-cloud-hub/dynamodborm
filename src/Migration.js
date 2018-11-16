
import fs from 'fs'
import path from 'path'
import util from 'util'
import Connection from './Connection'
// import ChangeLogAggregator from './changelog-domain'


export class Migration extends Connection {
    constructor (ChangeLogAggregator, ...args) {
        super(...args)
        this.ChangeLogAggregator = ChangeLogAggregator
    }

    async afterEach({
        operation,
        completedAt, 
        domain,
        migrationName,
        kind,
        status,
        errorMessage,
        label,
        duration,
    }) {
      const { ChangeLog } = this.ChangeLogAggregator
      const log = new ChangeLog({
        status,
        errorMessage,
        label,
        operation, completedAt, duration, domain, migrationName, kind })
      await log.save()
      return this
    }
    
    async createTable(Model) {
        return this.mapper.ensureTableExists(
            Model,
            {
                readCapacityUnits: Model.readCapacity, 
                writeCapacityUnits: Model.writeCapacity,
                ...(Model.indexes && Model.indexes.length ? { indexOptions: Model.indexes.reduce((options, index) => ({
                    ...options,
                    [index.name]: {
                        readCapacityUnits: index.readCapacity, 
                        writeCapacityUnits: index.writeCapacity,
                        projection: index.projection,
                        type: index.type,

                    }
                }),{})
             } : {})
            }).then(() => this )
    }

    async dropTable(Model) {
        return this.mapper.ensureTableNotExists(Model).then(() => this)
    }

    // TODO: CHANGE
}

Migration.do = function(operation, fnList, migration, label) {
    
    const lineupMigrations = funcs =>
        funcs.reduce((
            promise,   
            { fn, migrationName, DomainAggregator, kind, domain },
        ) => {
            // log begin here
            const start = Date.now()
            return promise
                .then((lastFnCompleted) => {
                console.log(`${migrationName}, ${domain} is about to start`)
                return fn(DomainAggregator)
                        .then((migrationHasCompleted) => {
                            const duration = Date.now() - start
                            console.log(`${migrationName}, ${domain} has completed: ${duration} seconds`)
                        
                            return migration.afterEach({ 
                                operation,
                                kind,
                                completedAt: (new Date()).toISOString(), 
                                duration, 
                                domain,
                                label,
                                migrationName,
                                status: 1, // 'success'
                            })
                        })
                        .catch(err => {
                            const duration = Date.now() - start
                            console.log(`${migrationName}, ${domain} has throw: ${duration} seconds`)
                            console.log('ERROR::::', err)
                            return migration.afterEach({
                                operation,
                                completedAt: (new Date()).toISOString(), 
                                duration,
                                kind,
                                domain,
                                label,
                                migrationName,
                                status: 0, // error 
                                errorMessage: err
                            }).then(() => {
                                throw new Error('A error has being occured, check migration logs for more information')
                            })
                        })
                })
        },
        Promise.resolve([]),
    )
    const bindedFns = fnList.map(({ fn, ...args } ) => ({ fn: fn.bind(migration), ...args }))
    try {
        console.log(`${operation} about to start`)
        const start = Date.now()
        return lineupMigrations(bindedFns).then(lastFnCompleted =>
            console.log(`${operation} has being completed, duration: ${Date.now() - start} seconds`)
        )
    } catch (err) {
        console.log(`Error has being catch and has interrupted ${operation}, duration: ${Date.now() - start} seconds`)
    }
}


export function getMigrationsFiles(domain) {
    const { comandDirPath } = this
    function validateDomainName(name) {
        const isDomain = !!name.match(/domain-/g)
        return isDomain
    }
    function checkValidDynamodbORMDomain(_package) {
        const isDomain = validateDomainName(_package.name)
        const hasDynamodbORM = !!_package.dependencies['@spark/dynamodborm'] || !!_package.dependencies['dynamodborm']
        return isDomain && hasDynamodbORM
    }
    function findDomainDeps(_package) {
        const deps = _package.dependencies
        const depsNames = Object.keys(deps)
        const depsVersions = Object.values(deps)
        const getDomains = (domains = [], index = 0) => {
            let this_iteration_domain
            if (depsNames[index].match(/domain-/g)) {
                const atualized_domains = [
                    ...domains,
                    {
                        domain: depsNames[index],
                        reference: depsVersions[index]
                    }
                ]
                this_iteration_domain = atualized_domains
            }
            const atualized_index = index + 1
            if (atualized_index < depsNames.length) {
                return getDomains(
                    this_iteration_domain || domains,
                    atualized_index,
                )
            }

            return this_iteration_domain || domains


        }
       return getDomains()
    }
    function getCustomOrDefaultList(domainName) {
        if (domainName) {
            if (!validateDomainName(domainName)) {
                throw new Error('Not a valid domain name')
            }
        }
        const fullpath = path.join(...[
            comandDirPath,
            'src',
            ...(domainName ? domainName.split('/') : []),
            'migrations'
        ])


        if (fs.existsSync(fullpath)) {
            const migrationsfile = fs.readdirSync(fullpath)
            if (migrationsfile.length) {
                return migrationsfile.map(filepath => `${path.join(fullpath, filepath)}`)
            }
        }

        const defaultPath = path.join(
            // __dirname,
            comandDirPath,
            // ...(domainName ? domainName.split('/') : []),
            'node_modules',
            '@spark',
            'dynamodborm',
            'migrate',
            'default-migrations'
        )
        // default create-table
        console.log('DEFAULT PATH ::::', defaultPath)
        return fs.readdirSync(
            defaultPath
        ).map(filepath => (`${path.join(defaultPath, filepath)}`))
    }

    if (!domain) {
        const _package = JSON.parse(fs.readFileSync('package.json'))
        if (checkValidDynamodbORMDomain(_package)) {
            // procceed with reading on the actual package
            return { [_package.name]: getCustomOrDefaultList() }
        }

        // look for domain packages in dependencies
        const domains = findDomainDeps(_package)
        if (domains.length) {
            // go to domain packages
           return domains.map(
                ({ domain }) => getCustomOrDefaultList(domain)
            ).reduce((finalList, list, i) => (
                {
                ...finalList,
                [domains[i].domain]: list,
            }), {})

        }
        throw new Error('Not found a valid dynamodborm domain')
    }
    return { [domain]: getCustomOrDefaultList(domain) }
}

