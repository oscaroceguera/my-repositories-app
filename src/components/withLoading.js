import React from 'react'
import Spinner from './Spinner'
import ErrorMsg from './ErrorMsg'

const withLoading = Component => (props) => {
  if (props.isLoading) {
    return <Spinner />
  }

  if (props.error) {
    return <ErrorMsg msg={props.error} />
  }

  return <Component {...props} />
}

export default withLoading
