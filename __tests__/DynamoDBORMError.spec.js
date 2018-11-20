import util from 'util'
import { DynamoDBORMError } from '../src/DynamoDBORMError'
describe('DynamoDBORMError class spec', () => {
    it('should be able to be instantiated, as single error', () => {
        const error = new DynamoDBORMError(
            {
              error: new Error('mock error'),
              method: 'test',
              args: [  ],
              className: 'Model'
            },
            'TESTEERROR',
          )

          expect(error).toBeInstanceOf(Error)
          expect(error).toHaveProperty('code', 'TESTEERROR')
          expect(error).toHaveProperty('message', `TESTEERROR has being catch in Model on method test`)
          expect(error).not.toHaveProperty('errors')
    })

    it('should the instance have get and pushError method', () => {
        const error = new DynamoDBORMError(
            {
              error: new Error('mock error'),
              method: 'test',
              args: [  ],
              className: 'Model'
            },
            'TESTEERROR',
          )
          console.log(util.inspect(error))
          const { 
              message,
              code
          } = error

          const response = {message, code}
          expect(response).not.toBeInstanceOf(Error)
    })

    it('should be able to be instantiated, as container to a list of errors', () => {
        const error1 = new DynamoDBORMError(
            {
              error: new Error('mock error1'),
              method: 'test',
              args: [  ],
              className: 'Model'
            },
            'cpf',
            'a cpf was bla bla'
          )

          const erro2 = new DynamoDBORMError(
            {
              error: new Error('mock error1'),
              method: 'test',
              args: [  ],
              className: 'Model'
            },
            'email',
            'a email was bla bla'
          )
          const errors = DynamoDBORMError.fromArray([error1, erro2], 'AnotherCodeHere', 'BLa Vlas avlas')
          console.log(util.inspect(errors))

          const response = {
              message: errors.message,
              code: errors.code,
              errors: errors.errors.map(
                  ({identifier, message}) => ({identifier, message}),
              )
          }

          expect(response).toHaveProperty('code')
          expect(response).toHaveProperty('message')
          expect(response).toHaveProperty('errors')
    })
})