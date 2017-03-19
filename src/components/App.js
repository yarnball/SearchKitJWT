import React, { Component } from 'react'
import Header from './Header'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object
}

export default App
