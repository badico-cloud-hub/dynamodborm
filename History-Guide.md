[versionNumber] / [Date]
===================

  * Type and summary
  * Type: And a list of summarys
    - Sub-type summary

Types and subtypes

  * Refac: Refactor
  * Perf: Performance
  * Fix: Fixer
  * Feat: Feature


  0.2.0 / 2019-01-09
===================
  * FIX: find error
  * FIX: fix in getItem
  * FIX: DynamodbormError fixed
  * REFACT: refactored domain errors
  * REFACT: listHelpers added
  * FEATURE: DomainError.fromArray of DomainErrors done
  * FIX: fixed broken test of save method
  * PERF: duplication on list handlers fixed
  * PERF: duplication removed from save.spec
  * REFACT: refactored connection query method
  * PERF: AggregationRoot test done
  * FIX: Repository get fix
  * FIX: fix in repository
  * FEATURE: DynamoDBORMError on Repository Get
  * PERFOR: DomainError done waiting tests
  * REFACT: save refactoring to handle updatedAt and createdAt
  * FEATURE: common schema with createdAt and updatedAt
  * FEATURE: overhide common methods done
  * PERF: methods prefix decision with code and test prepared
  * FEATURE: ci-cd with dynamodb local
  * FIX: rollback default fixed
  * FIX: fix in rollb*ack
  * FIX: fix in deploy
  * PERF: add test done, deploy and rollback to be done
  * PERF: add function covered
  * REFACT: deleted Connection query tests in favor of a most proper connection test
  * REFACT: ConnectionQuery.spec cleaned
  * PERF: AggregationRoot.spec green, skiped tests not touched
  * REFACT: Repository tests passing, not touched in skiped ones
  * FEATURE: Model tests working in localdb instance
  * PERF: Migration.do spec tests done
  * PERF: Migration.do validations tests done
  * PERF: scafolded migration do tests
  * REFACT: updated gitignore
  * PERF: tests for getMigrationsFile done
  * PERF: Migration instance test done
  * REFACT: comandDirPath injected into funcions
  * PERF: scafolding for tests
  * REFACT: removed self migration on rollback
  * FIX: find error on self-migration
  * FIX: error in selfmigration
  * FIX: fix in self migration
  * FEATURE: local dynamodb and self migration done
  * FEATURE: config for local bin
  * FEATURE: global configuration
  * FIX: fixed track for filter of migrations on deploy, after have done migrations
  * FIX: fixing list for rollback
  * FIX: fix export error
  * REFACT: removed left over
  * FEATURE: rollback implemented
  * FIX: fix list of domains to migrate
  * FIX: fixed default route
  * FIX: fix interator track of getDomains
  * REFACT: removed logs
  * FIX: fixed track of getMigraationsToBeDeployed
  * FIX: fix last log index
  * REFAC: ChangeLog schema updated
  * FEATURE: Migration.do executing the promises in serial
  * FEATURE: made indexes optinal
  * FEATURE: createTable undestanding indexes
  * FIX: fix in schema of changelog
  * FEATURE: checking table name
  * REFACT: log message refatored
  * FEATURE: binded fn
  * FIX: fix reference error
  * FEATURE: as prefix for require process.cwd()
  * FEATURE: dirname added
  * FEATURE: reference add at beginging of file
  * REFACT: logs removed and add a map to fix the fullpath
  * REFACT: packageName injected also
  * FEATURE: default migrations added
  * FEATURE: getMigrationsFiles also injected
  * FEATURE: deploy being injectedwith Aggregator and Migration dependencies
  * FEATURE: migration assets splited
  * FEATURE: package name being verified at require domain
  * REFACT: removed diname ref
  * PERF: promissified cli file
  * FEATURE: add command working
  * FEATURE: testing deploy
  * FEATURE: add comand added
  * REFACT: cli deploy writen
  * FEATURE: function that undestand the ecosystem of domains of dynamodborm
  * REFACT: migration model started
  * PERF: vulnerabilities fixed and commander added
  * PERF: Model.tableName add and tests of it passing
  

  0.1.0 / 2018-11-12
===================

  * Fix issue where `"Request aborted"` may be logged in `res.sendfile`
  * Fix JSDoc for `Router` constructor
  * Refac: Use `array-flatten` module for flattening arrays
  * Refact: Simplify `res.cookie` to call `res.append`
  * perf: skip parsing of entire `X-Forwarded-Proto` header
  * Feat: Invoke callback for sendfile when client aborts
    - Applies to `res.sendFile`, `res.sendfile`, and `res.download`
    - `err` will be populated with request aborted error
  * Support IP address host in `req.subdomains`
  * deps: body-parser@1.18.3
    - Add 70 new types for file extensions
    - Use instance methods on steam to check for listeners
    - Fix deprecation warnings on Node.js 10+
    - Fix stack trace for strict json parse error
    - deps: depd@~1.1.2
    - deps: http-errors@~1.6.3
    - deps: iconv-lite@0.4.23
    - deps: qs@6.5.2
    - deps: raw-body@2.3.3
    - deps: type-is@~1.6.16
  * deps: proxy-addr@~2.0.4
    - deps: ipaddr.js@1.8.0
  * deps: qs@6.5.2
  * deps: safe-buffer@5.1.2