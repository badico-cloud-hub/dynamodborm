import { save } from '../../../src/helpers/commonMethods/save'

describe('save commom method', () => {
    let mock

    beforeEach(() => {
        mock = {
            get: function() {
                return this
            },
            connection: {
                update: jest.fn((obj) => Promise.resolve(obj))
            }
        }
    })
    it('should use the connection update method', async(done) => {
        expect.assertions(1)
        const func = save.bind(mock)
        await func()
        expect(mock.connection.update).toHaveBeenCalled()
        return done()
    })

    it('should handle createdAt and updatedAt fields in a object without id', async(done) => {
        expect.assertions(3)

        const func = save.bind(mock)
        await func()
        expect(mock).toHaveProperty('createdAt')
        expect(mock).toHaveProperty('updatedAt')
        expect(mock.createdAt).toBe(mock.updatedAt)
        return done()
    })

    it('should handle updatedAt field in a object with id', async(done) => {
        expect.assertions(3)
        Object.assign(mock, {
            createdAt: '2018-11-18T16:13:52.863Z',
            updatedAt: '2018-11-18T16:13:52.863Z',
        })
        const func = save.bind(mock)
        await func()
        expect(mock).toHaveProperty('createdAt')
        expect(mock).toHaveProperty('updatedAt')
        expect(mock.createdAt).not.toBe(mock.updatedAt)
        return done()
    })

    it('should return the same instance of the object', async(done) => {
        expect.assertions(1)
        Object.assign(mock, {
            createdAt: '2018-11-18T16:13:52.863Z',
            updatedAt: '2018-11-18T16:13:52.863Z',
        })
        const func = save.bind(mock)
        const sameAsMock = await func()
        expect(sameAsMock).toBe(mock)
        return done()
    })
})