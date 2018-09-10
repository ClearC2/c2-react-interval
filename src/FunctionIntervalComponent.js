import {Component} from 'react'
import PropTypes from 'prop-types'
import FunctionInterval from './FunctionInterval'

class FunctionIntervalComponent extends Component {
  static propTypes = {
    func: PropTypes.func.isRequired,
    ms: PropTypes.number.isRequired,
    args: PropTypes.any,
    children: PropTypes.node
  }
  componentDidMount () {
    const {func, ms, args} = this.props
    this.interval = new FunctionInterval(func, args, ms)
  }
  componentDidUpdate () {
    const {args} = this.props
    this.interval.setArgs(args)
  }
  componentWillUnmount () {
    this.interval.tearDown()
  }
  render () {
    return this.props.children || null
  }
}

export default FunctionIntervalComponent
