import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Profile from './Profile'
import Repos from './Repos'
import RepoDetail from './RepoDetail'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDetail: false,
      name: ''
    }
    this.getDetail = this.getDetail.bind(this)
    this.getBack = this.getBack.bind(this)
  }

  getDetail (name, e) {
    this.setState(() => ({
      name,
      showDetail: true
    }))
  }

  getBack () {
    this.setState((currentState) => ({
      showDetail: !currentState.showDetail
    }))
  }

  render () {
    const { showDetail, name: repoName } = this.state

    return (
      <div>
        <Profile />
        {showDetail
          ? <RepoDetail repoName={repoName} getBack={this.getBack} />
          : <Repos getDetail={this.getDetail} />}
      </div>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('app'))
