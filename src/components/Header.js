import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ButtonGroup, MenuItem, DropdownButton, Button} from 'react-bootstrap';

// 8 Weeks, 7:30am to 6pm (fox studios & nights). Has a son.

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      return (
null
)
    } else {
      return (
        <nav className='navbar navbar-light'>
          <Link to='/' className='navbar-brand'>Tasks List</Link>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <Link to='/signin' className='nav-link'>Sign In</Link>
            </li>
            <li className='nav-item'>
              <Link to='/signup' className='nav-link'>Sign UP</Link>
            </li>
          </ul>
        </nav>
      )
    }
  }

  render () {
    return this.renderLinks()
  }
}

Header.propTypes = {
  authenticated: React.PropTypes.bool
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
