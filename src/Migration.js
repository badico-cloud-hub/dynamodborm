
import fs from 'fs'
import path from 'path'
import Connection from './Connection'
import ChangeLogAggregator from './changelog-domain'
class Migration extends Connection {
    constructor (...args) {
        super(...args)
        this.ChangeLogAggregator = ChangeLogAggregator
    }

    async afterEach({ operation, completedAt, duration, tableName, migrationName }) {
      const { ChangeLog } = this.ChangeLogAggregator
      const log = new ChangeLog({ operation, completedAt, duration, tableName, migrationName })
      await log.save()
      return this
    }
    
    async createTable( Model ) {
        return this.mapper.ensureTableExists(
            Model,
            {
                readCapacityUnits: Model.readCapacity, 
                writeCapacityUnits: Model.writeCapacity, 
            }).then(() => this )
    }

    async dropTable(Model) {
        return this.mapper.ensureTableNotExists(Model).then(() => this)
    }

    // TODO: CHANGE
}

Migration.do = function(operation, fnList, migration, label) {
    console.log('deploy about to start')
    const bindedFns = fnList.map(({ fn, migrationName, DomainAggregator, kind, domain } ) => {
        const start = Date.now()
        console.log(`${migrationName}, ${domain} is about to start`)
        fn.bind(migration, DomainAggregator)
        .then( () => {
            const duration = Date.now() - start
            console.log(`${migrationName}, ${domain} has ended: ${duration} seconds`)
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
        }).catch( (err) => {
            const duration = Date.now() - start 
            console.log(`${migrationName}, ${domain} has ended: ${duration} seconds`)
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
            })    
        } )
    })
    return Promise.all(bindedFns) 
}


export function getMigrationsFiles(domain) {
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

            if (index < depsNames.length) {
                const atualized_index = index + 1
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
        const fullpath = path.join(__dirname, [
            ...(domainName ? domainName.split('/') : []),
            'migrations'
        ])

        if (fs.existsSync(fullpath)) {
            const migrationsfile = fs.readdirSync(fullpath)
            if (migrationsfile.length) {
                return migrationsfile
            }
        }

        // default create-table
        return fs.readdirSync(
            path.join(
                __dirname,
                ...(domainName ? domainName.split('/') : []),
                'node_modules',
                '@spark',
                'dynamodborm',
                'src',
                'default-migrations'
            )
        )
    }

    if (!domain) {
        const _package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json') ))
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
            ).reduce((finalList, list, i) => ({
                ...finalList,
                [domains[i]]: list,
            }), {})

        }
        throw new Error('Not found a valid dynamodborm domain')
    }
    return { [domain]: getCustomOrDefaultList(domain) }
}

export default Migration
