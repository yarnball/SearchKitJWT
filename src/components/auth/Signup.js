import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type} className='form-control' />
    {
      field.meta.touched &&
      field.meta.error &&
        <div className='error'>{field.meta.error}</div>
    }
  </div>

class Signup extends Component {
  constructor () {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (formProps) {
    this.props.signupUser(formProps)
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
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <Field
            name='passwordConfirm'
            component={renderInput}
            type='password'
          />
        </fieldset>
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    )
  }
}

Signup.propTypes = {
  signupUser: React.PropTypes.func,
  fields: React.PropTypes.array,
  errorMessage: React.PropTypes.string,
  handleSubmit: React.PropTypes.func
}

function validate (formProps) {
  const errors = {}

  if (!formProps.username) {
    errors.username = 'Please enter an username'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

Signup = reduxForm({ // eslint-disable-line
  form: 'signup',
  validate
})(Signup)

export default Signup = connect(mapStateToProps, actions)(Signup) // eslint-disable-line
