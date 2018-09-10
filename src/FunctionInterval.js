function isPromise (subject) {
  return typeof subject === 'object' && typeof subject.then === 'function'
}

class FunctionInterval {
  constructor (func, args, ms, invoke = true) {
    this.func = func
    this.args = args
    this.ms = ms
    this.timeoutId = null
    if (invoke) {
      this.invoke()
    }
  }

  setArgs = (newArgs) => {
    const oldArgs = this.args
    this.args = newArgs
    if (!this._argsAreSame(oldArgs, newArgs)) {
      this.invoke()
    }
  }

  tearDown () {
    this._clearTimeout()
  }

  invoke = () => {
    this._clearTimeout()
    const result = this.func(this.args) || []
    // coalesce the result to an array
    const resultArray = Array.isArray(result) ? result : [result]
    // coalesce the result array to array of promises
    const promises = resultArray.map((item) => {
      return isPromise(item) ? item : Promise.resolve(item)
    })
    return Promise.all(promises).finally(this._schedule)
  }

  _schedule = () => {
    this._clearTimeout()
    this.timeoutId = setTimeout(this.invoke, this.ms)
  }

  _clearTimeout = () => {
    clearTimeout(this.timeoutId)
  }

  _argsAreSame = (args1, args2) => {
    return JSON.stringify(args1) === JSON.stringify(args2)
  }
}

export default FunctionInterval
