import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { api } from './api'
import Spinner from '../components/Spinner'
import ErrorMsg from '../components/ErrorMsg'

class RepoDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: {},
      loading: false,
      fail: null
    }
  }

  componentWillMount () {
    this.load()
  }

  async load () {
    this.setState({
      loading: true,
      fail: null
    })

    try {
      const repo = await api.get(`repos/oscaroceguera/${this.props.repoName}`)
      this.setState({
        loading: false,
        repo
      })
    } catch (e) {
      this.setState({
        loading: false,
        fail: e.message
      })
    }
  }

  render () {
    const { loading, fail, repo } = this.state

    if (loading) {
      return <Spinner />
    }

    if (fail) {
      return <ErrorMsg msg={fail} />
    }

    return (
      <div>
        <h1 className='repository_link'>
          <a href={`https://github.com/oscaroceguera/${repo.name}`} target='_blank'>{repo.full_name}</a>
        </h1>
        <div className='return_btn' onClick={this.props.getBack}>Return</div>
      </div>
    )
  }
}

RepoDetail.propTypes = {
  getBack: PropTypes.func.isRequired,
  repoName: PropTypes.string.isRequired
}

export default RepoDetail
