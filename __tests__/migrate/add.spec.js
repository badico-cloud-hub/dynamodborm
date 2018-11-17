import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import rmdir from 'rimraf'
import { add } from '../../migrate/add'
import { resolve } from 'url';

const getMockCommandPath = (mockFolder) => {
    const realcommandpath = process.cwd()  
    return ({
      commandDirPath: path.join(realcommandpath, '__mocks__', mockFolder)
    })
  }

const mockcommandpath = getMockCommandPath('domain-without-migrations')
const migrationspath = path.join(mockcommandpath.commandDirPath, 'src', 'migrations')
describe('add (migration) function', () => {
    afterAll(async() => {
        if (fs.existsSync(migrationspath)) {
         await new Promise((resolve, reject) => {
            rmdir(migrationspath, (err, success) => {
                if (err) return reject(err)
                resolve(success)
            });
         })
        }
    })
    it('should throw if no migrationName is given', () => {
        const func = () => add.bind(mockcommandpath, fs, path, mkdirp)()
        expect(func).toThrow()
    })

    it('should throw if no migrationName is not a string', () => {
        const func = () => add.bind(mockcommandpath, fs, path, mkdirp)({})
        expect(func).toThrow()
    })
    
    it('should create a migration dir, if no dir exist, and add the migration file', () => {
        expect(fs.existsSync(migrationspath)).toBe(false)
        const func = () => add.bind(mockcommandpath, fs, path, mkdirp)('mockmigration', { kind: 'mockkind' })
        func()
        expect(fs.existsSync(migrationspath)).toBe(true)
    })

    it('should accept a kind as option', () => {
        const func = () => add.bind(mockcommandpath, fs, path, mkdirp)('mockmigration', { kind: 'mockkind' })
        expect(func).not.toThrow()
    })

   

    it('migration file name should be named with [timestamp in isostring]_migrationName', () => {
        const files = fs.readdirSync(migrationspath)
        const func = () => files.forEach(filename => {
            const shouldbeisostring = filename.split('_')[0]
            console.log(filename)
            console.log(shouldbeisostring)
            if (!shouldbeisostring.match(
                /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
            )){
                throw new Error('Wrong file name')
            }
        })
        expect(func).not.toThrow()
    })

    it('should just add the new migration file if dir migration already exist', () => {
        let hasWritedFile = false
        let hasSearchedDir = false
        let hasCreatedDir = false
        
        const fs = {
            existsSync: () => (hasSearchedDir = true, true),
            writeFileSync: () => (hasWritedFile = true, true),
        }

        const mkdirp ={
            sync: () => (hasCreatedDir = true, true)
        }
        const func = () => add.bind(mockcommandpath, fs, path, mkdirp)('mockmigration', { kind: 'mockkind' })
        func()
        expect(func).not.toThrow()
        expect(hasWritedFile).toBe(true)
        expect(hasSearchedDir).toBe(true)
        expect(hasCreatedDir).toBe(false)
    })
})