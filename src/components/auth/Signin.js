import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type} className='form-control' />
  </div>

class Signin extends Component {
  constructor () {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit ({ username, password }) {
    this.props.signinUser({ username, password })
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
          <label>Username:</label>
          <Field
            name='username'
            component={renderInput}
            type='text'
          />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field
            name='password'
            component={renderInput}
            type='password'
          />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign in</button>
      </form>
    )
  }
}

Signin.propTypes = {
  signinUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  handleSubmit: React.PropTypes.func
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

Signin = reduxForm({ // eslint-disable-line
  form: 'signin'
})(Signin)

export default Signin = connect(mapStateToProps, actions)(Signin) // eslint-disable-line
