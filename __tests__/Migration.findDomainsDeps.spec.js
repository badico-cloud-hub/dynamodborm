import path from 'path'
import util from 'util'
import fs from 'fs'
import { findDomainDeps } from '../src/Migration'

jest.mock('domain-with-migrations')
jest.mock('domain-without-migrations')


const getMockCommandPath = (mockFolder) => {
  const realcommandpath = process.cwd()  
  return ({
    _package: JSON.parse(fs.readFileSync(path.join(realcommandpath, '__mocks__', mockFolder, 'package.json'))),
    comandDirPath: path.join(realcommandpath, '__mocks__', mockFolder)
  })
}
describe('findDomainsDeps function', () => {
  it('should return a list with domains object', () => {
    const mockComandPath = getMockCommandPath('api-with-domains')    
    const files = findDomainDeps(mockComandPath._package)
    expect(files[0]).toHaveProperty('domain')
  })
})