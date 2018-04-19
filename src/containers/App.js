import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { api } from './api'

import List from '../components/List'
import Search from '../components/Search'
import Detail from '../components/Detail'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      repositories: [],
      issues: [],
      repositorySelected: '',
      loading: false,
      fail: null,
      loadingIssue: false,
      failIssue: null,
      showDetail: false
    }

    this.onChange = this.onChange.bind(this)
    this.HandleSearch = this.HandleSearch.bind(this)
    this.search = this.search.bind(this)
    this.handleDetail = this.handleDetail.bind(this)
  }

  HandleSearch (e) {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  async search () {
    const { username } = this.state
    this.setState({
      loading: true,
      fail: null,
      issues: [],
      repositorySelected: '',
      showDetail: false
    })

    try {
      const body = await api.get(`users/${username}/repos`, {
        params: {
          page: 0,
          per_page: 200
        }
      })
      this.setState({
        loading: false,
        repositories: body,
        username: ''
      })
    } catch (e) {
      this.setState({
        loading: false,
        fail: e.message,
        repositories: []
      })
    }
  }

  onChange (e) {
    this.setState({username: e.target.value})
  }

  async handleDetail (reponame) {
    this.setState({
      loadingIssue: true,
      failIssue: null
    })

    try {
      const body = await api.get(`repos/${reponame}/issues`)
      this.setState({
        loadingIssue: false,
        issues: body,
        showDetail: true,
        repositorySelected: reponame.split('/')[1]
      })
    } catch (e) {
      this.setState({
        loadingIssue: false,
        failIssue: e.message
      })
    }
  }

  render () {
    return (
      <div>
        <Search
          value={this.state.username}
          onKeyPress={this.HandleSearch}
          onChange={this.onChange}
        />
        {this.state.showDetail
          ? (<Detail
            repository={this.state.repositorySelected}
            isLoading={this.state.loadingIssue}
            error={this.state.failIssue}
            data={this.state.issues}
          />)
          : (<List
            isLoading={this.state.loading}
            error={this.state.fail}
            data={this.state.repositories}
            handleDetail={this.handleDetail}
          />)
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
