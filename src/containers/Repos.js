import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { api } from './api'
import Spinner from '../components/Spinner'
import ErrorMsg from '../components/ErrorMsg'

const Repo = ({ repo, getDetail }) => (
  <div key={repo.id} className='repo'>
    <div className='repo-name'>{repo.name}</div>
    <div className='repo-desc'>
      <b>Description:</b>
      <br /> {repo.description ? repo.description : 'No description :p'}
    </div>
    <div className='repo-desc'>
      {repo.language && (<p><i>{repo.language}</i></p>)}
    </div>
    <p className='repo-detail' onClick={name => getDetail(repo.name)}>Repo detail</p>
  </div>
)

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  getDetail: PropTypes.func.isRequired
}

class Repos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      fail: null,
      repos: []
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
      const repos = await api.get('users/oscaroceguera/repos')

      this.setState({
        loading: false,
        repos
      })
    } catch (e) {
      this.setState({
        loading: false,
        fail: e.message
      })
    }
  }

  render () {
    const { loading, fail, repos } = this.state

    if (loading) {
      return <Spinner />
    }

    if (fail) {
      return <ErrorMsg msg={fail} />
    }

    const repositories = repos.map(item => <Repo key={item.id} repo={item} getDetail={this.props.getDetail} />)

    return (
      <div>
        <h1 className='repos-title'>Repos</h1>
        <div className='repos-container'>
          {repositories}
        </div>
      </div>
    )
  }
}

Repos.propTypes = {
  getDetail: PropTypes.func.isRequired
}

export default Repos
