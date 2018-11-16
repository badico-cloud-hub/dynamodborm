import path from 'path'
import util from 'util'
import fs from 'fs'
import { getMigrationsFiles } from '../src/Migration'

jest.mock('domain-with-migrations')
jest.mock('domain-without-migrations')


const getMockCommandPath = (mockFolder) => {
  const realcommandpath = process.cwd()  
  return ({
    _package: JSON.parse(fs.readFileSync(path.join(realcommandpath, '__mocks__', mockFolder, 'package.json'))),
    comandDirPath: path.join(realcommandpath, '__mocks__', mockFolder)
  })
}
describe('getMigrationsFiles function', () => {
  it('should return the default list of migrations calling in a domain with no migrations - no domain arg', () => {
    const mockComandPath = getMockCommandPath('domain-without-migrations')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func()
    expect(files).toHaveProperty('domain-without-migrations')
    expect(files['domain-without-migrations'][0]).toMatch('default')
  })

  it('should return the default list of migrations calling in a domain with no migrations - domain arg', () => {
    const mockComandPath = getMockCommandPath('domain-without-migrations')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func('domain-without-migrations')
    expect(files).toHaveProperty('domain-without-migrations')
    expect(files['domain-without-migrations'][0]).toMatch('default')
  })

  it('should return the custom list of migrations calling in a domain with migrations - no domain arg', () => {
    const mockComandPath = getMockCommandPath('domain-with-migrations')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func()
    expect(files).toHaveProperty('domain-with-migrations')
    expect(files['domain-with-migrations'][0]).not.toMatch('default')
    expect(files['domain-with-migrations']).toHaveLength(2)
    expect(files['domain-with-migrations'][0]).toMatch('create')

  })

  it('should return the custom list of migrations calling in a domain with migrations - domain arg', () => {
    const mockComandPath = getMockCommandPath('domain-with-migrations')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func('domain-with-migrations')
    expect(files).toHaveProperty('domain-with-migrations')
    expect(files['domain-with-migrations'][0]).not.toMatch('default')
    expect(files['domain-with-migrations']).toHaveLength(2)
    expect(files['domain-with-migrations'][0]).toMatch('create')
  })

  it('should return a list of migrations for each domain as dependence of a project - no domain arg', () => {
    const mockComandPath = getMockCommandPath('api-with-domains')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func()
    console.log(util.inspect(files))
    expect(files).toHaveProperty('domain-with-migrations')
    expect(files).toHaveProperty('domain-without-migrations')

    expect(files['domain-with-migrations']).toHaveLength(2)
    expect(files['domain-with-migrations'][0]).toMatch('create')

    expect(files['domain-without-migrations'][0]).toMatch('default')
    expect(files['domain-without-migrations']).toHaveLength(1)
  })

  it('should return a custom list of migrations for a domain in dependence of a project - domain arg', () => {
    const mockComandPath = getMockCommandPath('api-with-domains')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func('domain-with-migrations')
    expect(files).toHaveProperty('domain-with-migrations')
    expect(files).not.toHaveProperty('domain-without-migrations')

    expect(files['domain-with-migrations']).toHaveLength(2)
    expect(files['domain-with-migrations'][0]).toMatch('create')

  })

  it('should return a default list of migrations for a domain in dependence of a project - domain arg', () => {
    const mockComandPath = getMockCommandPath('api-with-domains')
    const func = getMigrationsFiles.bind(mockComandPath)
    const files = func('domain-without-migrations')
    expect(files).not.toHaveProperty('domain-with-migrations')
    expect(files).toHaveProperty('domain-without-migrations')

    expect(files['domain-without-migrations'][0]).toMatch('default')
    expect(files['domain-without-migrations']).toHaveLength(1)
  })
})