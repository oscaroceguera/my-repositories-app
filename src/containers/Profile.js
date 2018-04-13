import React, { Component } from 'react'
import { api } from './api'
import Spinner from '../components/Spinner'
import ErrorMsg from '../components/ErrorMsg'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {},
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
      const profile = await api.get('users/oscaroceguera')

      this.setState({
        loading: false,
        profile
      })
    } catch (e) {
      this.setState({
        loading: false,
        fail: e.message
      })
    }
  }

  render () {
    const { loading, fail, profile } = this.state

    if (loading) {
      return <Spinner />
    }

    if (fail) {
      return <ErrorMsg msg={fail} />
    }

    return (
      <div className='profile'>
        <div className='profile-header' >
          <img src={profile.avatar_url} width='100%' alt='avatar' />
        </div>
        <h3 className='profile-name'>{profile.name}</h3>
        <p className='profile-bio'>{profile.bio}</p>
      </div>
    )
  }
}

export default Profile
