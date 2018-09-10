import React, {Component} from 'react'
import Interval from 'c2-react-interval'

class App extends Component {
  state = {
    counter: 0,
    play: true
  }
  render () {
    return (
      <div className='text-center mt-5'>
        <h1>C2 React Interval</h1>
        <p>Open the console</p>
        <h4>{this.state.counter}</h4>
        <button
          className='btn btn-primary mt-2'
          onClick={() => this.setState({play: !this.state.play})}
        >
          {this.state.play ? 'Pause' : 'Play'}
        </button>
        <Interval
          func={(args) => {
            if (!this.state.play) return
            this.setState({counter: this.state.counter + 1})
            console.log(args) // eslint-disable-line
            return [
              new Promise(resolve => setTimeout(resolve, 1000)),
              new Promise(resolve => setTimeout(resolve, 500)),
              new Promise(resolve => setTimeout(resolve, 10))
            ]
          }}
          args={{foo: 'bar'}}
          ms={1000}
        />
        <p className='mt-4'>
          <small>
            The counter updates every 2 seconds. The interval func returns 3 promises <br />
            that take 1 second to complete and the interval is set to 1 second.
          </small>
        </p>
      </div>
    )
  }
}

export default App
