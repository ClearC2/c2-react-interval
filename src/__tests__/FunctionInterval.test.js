import React from 'react'
import sinon from 'sinon'
import FunctionInterval from '../FunctionInterval'
import Interval from '../FunctionIntervalComponent'
import {render, cleanup} from 'react-testing-library'

jest.useFakeTimers()

function flushPromises () {
  return new Promise(resolve => setImmediate(resolve))
}

describe('FunctionIntervalComponent', () => {
  afterEach(cleanup)

  test('renders', () => {
    render(<Interval func={() => {}} ms={1000} />)
  })

  test('it immediately invokes', () => {
    let count = 0
    render((
      <Interval
        func={() => { ++count }}
        ms={1000} />
    ))
    expect(count).toBe(1)
  })

  test('it invokes after timeout', async () => {
    let count = 0
    render((
      <Interval
        func={() => { ++count }}
        ms={1000}
      />
    ))

    expect(count).toBe(1)
    await flushPromises()
    jest.advanceTimersByTime(1500)
    expect(count).toBe(2)
  })

  test('it invokes with args', () => {
    let arg = null
    const args = {foo: 'foo'}
    render((
      <Interval
        func={(value) => { arg = value }}
        args={args}
        ms={1000}
      />
    ))

    expect(arg).toBe(args)
  })

  test('it invokes with new args', async () => {
    let latestArgs = null
    const func = (args) => { latestArgs = args }
    const {rerender} = render((
      <Interval
        func={func}
        args='foo'
        ms={1000}
      />
    ))

    expect(latestArgs).toBe('foo')
    rerender((
      <Interval
        func={func}
        args='bar'
        ms={1000}
      />
    ))
    expect(latestArgs).toBe('bar')
  })

  test('it calls tearDown on unmount', () => {
    sinon.spy(FunctionInterval.prototype, 'tearDown')
    const {unmount} = render((
      <Interval
        func={() => {}}
        ms={1000} />
    ))
    unmount()
    expect(FunctionInterval.prototype.tearDown.calledOnce).toBe(true)
    FunctionInterval.prototype.tearDown.restore()
  })
})
