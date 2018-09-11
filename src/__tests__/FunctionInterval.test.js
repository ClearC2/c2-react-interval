/* eslint-disable no-new */
import sinon from 'sinon'
import FunctionInterval from '../FunctionInterval'
import flushPromises from '../../test-utils/flushPromises'

jest.useFakeTimers()

describe('FunctionInterval', () => {
  test('invokes on create', async () => {
    let count = 0
    new FunctionInterval(() => { ++count }, null, 100)
    await flushPromises()
    expect(count).toBe(1)
  })

  test('invokes after interval time', async () => {
    let count = 0
    new FunctionInterval(() => { ++count }, null, 100)
    await flushPromises()
    expect(count).toBe(1)
    jest.advanceTimersByTime(100)
    expect(count).toBe(2)
  })

  test('does not invoke before interval time', async () => {
    let count = 0
    new FunctionInterval(() => { ++count }, null, 100)
    await flushPromises()
    expect(count).toBe(1)
    jest.advanceTimersByTime(50)
    expect(count).toBe(1)
  })

  test('passes arguments', async () => {
    const func = sinon.spy()
    const startArgs = {foo: 'bar'}
    const endArgs = {baz: false}
    const interval = new FunctionInterval(func, startArgs, 100)
    await flushPromises()
    interval.setArgs(endArgs)
    expect(func.getCall(0).args[0]).toBe(startArgs)
    expect(func.getCall(1).args[0]).toBe(endArgs)
  })

  test('tearDown clears interval', async () => {
    let count = 0
    const interval = new FunctionInterval(() => { ++count }, null, 100)
    await flushPromises()
    expect(count).toBe(1)
    interval.tearDown()
    jest.advanceTimersByTime(100)
    expect(count).toBe(1)
  })
})
