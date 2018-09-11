# c2-react-interval [![CircleCI](https://circleci.com/gh/ClearC2/c2-react-interval.svg?style=svg)](https://circleci.com/gh/ClearC2/c2-react-interval)

A react component to call a function in a recurring interval.

## Install

```
yarn add ClearC2/c2-react-interval#^1.0.0
```

## Usage

```jsx
import React from 'react'
import Interval from 'c2-react-interval'

class Counter extends React.Component {
  state = {
    count: 0
  }
  increment = () => {
    this.setState({count: this.state.count + 1})
  }
  render () {
    return (
      <div>
        <Interval func={this.increment} ms={1000} />
        Count: {this.state.count}
      </div>
    )
  }
}
```

### Passing arguments

Arguments can be passed via the `args` prop.

```jsx
import React from 'react'
import Interval from 'c2-react-interval'

class Counter extends React.Component {
  state = {
    value: null,
    count: 0
  }
  increment = (foo) => {
    this.setState({
      count: this.state.count + 1,
      value: foo
    })
  }
  render () {
    return (
      <div>
        <Interval
          func={this.increment}
          ms={1000}
          args={this.props.foo}
        />
        Count: {this.state.count}
      </div>
    )
  }
}
```

If new `args` get passed to the `<Interval />`, the `func` will be immediately executed.

### Promises

The really useful part of `<Interval />` is that you can return an array of promises and the it will wait until all of the promises
resolve until the next execution is scheduled.

```jsx
import React from 'react'
import Interval from 'c2-react-interval'

class Counter extends React.Component {
  fetchData = (loginId) => [
    this.props.fetchProjects(loginId),
    this.props.fetchTickets(loginId),
    this.props.fetchTasks(loginId)
  ]
  render () {
    return (
      <div>
        <Interval
          func={this.fetchData}
          ms={300000} // 5 minutes
          args={this.props.loginId}
        />
        <Table data={this.props.data) />
      </div>
    )
  }
}
```

## Props

### `func: func`
The function to be called. If a promise or array of promises are returned, the interval will wait until all are resolved until
scheduling the next execution.

### `args: any`
Arguments to pass to the `func`. If the `<Interval />` receives new `args`, the `func` will be immediately executed.

### `ms: number`
The millisecond time interval