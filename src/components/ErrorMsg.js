import React from 'react'
import PropTypes from 'prop-types'

const ErrorMsg = (props) => <div className='failHero'>Error: {props.msg}</div>

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired
}

export default ErrorMsg
