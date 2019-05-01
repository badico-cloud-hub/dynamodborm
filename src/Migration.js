
import fs from 'fs'
import path from 'path'
import util from 'util'
import Connection from './Connection'

class MigrationError extends Error {
    constructor(genericMessage, errorsList,...args) {
        super(genericMessage, errorsList, ...args)
        this.errors = errorsList
    }
}
export class Migration extends Connection {
    constructor (ChangeLogAggregator, ...args) {
        super(...args)
        this.ChangeLogAggregator = ChangeLogAggregator
    }

    async log({
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
        operation,
        completedAt,
        duration,
        domain,
        migrationName,
        kind,
     })
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
    // https://github.com/awslabs/dynamodb-data-mapper-js/issues/58
    async updateItems(fn) {
        // get bunch of items,

        // delete bunch of items

        // update bunch of items

        // save bunch of items

        // keep track repeat until the end

    }
    // https://github.com/awslabs/dynamodb-data-mapper-js/issues/113
    async changeIndexes(index) {
        // test for index exist in table

        // get all items

        // save into a s3

        // delete table

        // 
    }
}

Migration.do = function(operation, fnList, migration, label) {
    function isPromise(obj) {
        return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
    }
    const validationErrors = []
    if (operation !== 'deploy' && operation !== 'rollback') {
        validationErrors.push({
            message: 'Not received a valid operation to perform',
            identifier: '1st argument, operation'
        })
    }
    if (!(fnList instanceof Array) && !(fnList.fn instanceof Function)){
        validationErrors.push({
            message: 'Not received a valid task to perform',
            identifier: '2nd argument, fnList'
        })
    }

    if (!(migration instanceof Migration)) {
        validationErrors.push({
            message: 'Not received a valid migration instance',
            identifier: '3rd argument, migration'
        })
    }

   if(fnList instanceof Array) {
    fnList.forEach((i, index) => {  
        // console.log(util.inspect(i), typeof fn)
         if (typeof i.fn !== 'function')  {
             validationErrors.push({
                 message: 'A Task inside the list was not a valid function',
                 identifier: `2nd argument, fnList item in position ${index} [zeroBasedIndex]`
             })
         }
     })
   } else {
       const { fn } = fnList
       if (typeof fn !== 'function')  {
        validationErrors.push({
            message: 'The Task sended is not a valid function',
            identifier: `2nd argument, fnList as a unique item`
        })
    }
   }
   

    fnList instanceof Object 

    if (validationErrors.length) {
        return Promise.reject(
            new MigrationError(
                'A validation error has being catch... operation not performed',
                validationErrors,
            )
        )
    }

    const labelToBeloged = label || `${operation}.${(Date.now())}`

    const lineupMigrations = funcs =>
        funcs.reduce((
            promise,   
            { fn, migrationName, DomainAggregator, kind, domain },
            index,
        ) => {
            // log begin here
            const start = Date.now()
            return promise
                .then((lastFnCompleted) => {
                    console.log(`${migrationName}, ${domain} is about to start`)
                    if (isPromise(fn)) {
                        return fn
                    }

                    return (...args) => new Promise((resolve, reject) => {
                        try {
                            return resolve(fn(...args))
                        } catch (err) {
                            return reject(err)
                        }
                    })
                })
                .then(fnPromissed => {
                    return fnPromissed(DomainAggregator)
                        .then((migrationHasCompleted) => {
                            const duration = Date.now() - start
                            console.log(`${migrationName}, ${domain} has completed: ${duration} seconds`)
                        
                            return migration.log({ 
                                operation,
                                kind,
                                completedAt: (new Date()).toISOString(), 
                                duration, 
                                domain,
                                label: labelToBeloged,
                                migrationName,
                                status: 1, // 'success'
                            })
                        })
                        .catch(err => {
                            const duration = Date.now() - start
                            console.log(`${migrationName}, ${domain} has throw: ${duration} seconds`)
                            console.log('ERROR::::', err)
                            return migration.log({
                                operation,
                                completedAt: (new Date()).toISOString(), 
                                duration,
                                kind,
                                domain,
                                label: labelToBeloged,
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
    const bindedFns = (fnList instanceof Array ? fnList : [fnList]).map(
        ({ fn, ...args } ) => ({ fn: fn.bind(migration), ...args }),
    )

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

function validateDomainName(name) {
    const isDomain = !!name.match(/domain-/g)
    return isDomain
}
function checkValidDynamodbORMDomain(_package) {
    const isDomain = validateDomainName(_package.name)
    const hasDynamodbORM = !!_package.dependencies['@spark/dynamodborm'] || !!_package.dependencies['dynamodborm']
    console.log('###isDomain', isDomain)
    console.log('###hasDynamodbORM', hasDynamodbORM)
    return isDomain && hasDynamodbORM
}

export function findDomainDeps(_package) {
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
export function getMigrationsFiles(domain) {
    const {
        comandDirPath,
        _package,
    } = this
    
    function getCustomOrDefaultList(domainName) {
        if (domainName) {
            if (!validateDomainName(domainName)) {
                throw new Error('Not a valid domain name')
            }
        }
        const fullpath = path.join(...[
            comandDirPath,
            // ('src'),
            ...(domainName && domainName !== _package.name ? [ 'node_modules', ...domainName.split('/'), 'src' ] : ['src']),
            'migrations'
        ])

        console.log(fullpath)


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
        return fs.readdirSync(
            defaultPath
        ).map(filepath => (`${path.join(defaultPath, filepath)}`))
    }

    if (!domain) {
        const selfMigration = checkValidDynamodbORMDomain(_package) ?
             { [_package.name]: getCustomOrDefaultList() } :
             {}

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
            }), selfMigration)

        }
        throw new Error('Not found a valid dynamodborm domain')
    }
    return { [domain]: getCustomOrDefaultList(domain) }
}

