import React from 'react'
import axios from 'axios'

class GetUserRepos extends React.Component {
  state = {
    username: '',
    cache: {},
    repos: []
  }

  onChange = e =>
    this.setState({
      username: e.target.value
    })

  workWithRepos = repos => {
    console.log(repos.length)
    this.setState(prevState => ({
      repos
    }))
  }

  getRepos = () => {
    let { cache, username } = this.state
    let cacheHandle = username

    if (cache[cacheHandle]) {
      console.log('cached before')
      this.workWithRepos(cache[cacheHandle])
    } else {
      fetch(`https://api.github.com/users/${cacheHandle}/repos`)
        .then(resp => resp.json())
        .then(resp => {
          cache[cacheHandle] = resp
          this.workWithRepos(resp)
        })
        .catch(e => console.error(e))
    }
  }

  render() {
    let { username, repos } = this.state

    let mapRepos = repos.map(repo => (
      <React.Fragment key={repo.full_name}>
        <a href={`https://github/com/${repo.full_name}`}>{repo.full_name}</a>
        <br />
      </React.Fragment>
    ))

    return (
      <React.Fragment>
        <input
          type="text"
          value={username}
          onChange={this.onChange}
          placeholder="Enter username"
        />{' '}
        <button onClick={this.getRepos}>Get Repos</button>
        <div>
          <h4>{username} repos</h4>
          {mapRepos}
        </div>
      </React.Fragment>
    )
  }
}

export default GetUserRepos
