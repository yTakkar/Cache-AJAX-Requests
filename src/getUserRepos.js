import React from 'react'

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
    this.setState(prevState => ({
      repos
    }))
  }

  fetch = () => {
    let { cache, username } = this.state
    let cacheHandle = username

    fetch(`https://api.github.com/users/${cacheHandle}/repos`)
      .then(resp => resp.json())
      .then(resp => {
        if (Array.isArray(resp)) {
          cache[cacheHandle] = resp
          this.workWithRepos(resp)
        }
      })
      .catch(e => console.error(e))
  }

  getRepos = () => {
    let { cache, username } = this.state
    let cacheHandle = username

    // If request is already cached, don't request repos
    if (cache[cacheHandle]) {
      console.log(`${cacheHandle} cached before!!`)
      this.workWithRepos(cache[cacheHandle])
    } else {
      // else request repos
      this.fetch()
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
          placeholder="Enter username"
          value={username}
          onChange={this.onChange}
          autoFocus
        />{' '}
        <button onClick={this.getRepos}>Get Repos</button>
        <div>
          <h4>{username && `${username}'s repos`}</h4>
          {mapRepos}
        </div>
      </React.Fragment>
    )
  }
}

export default GetUserRepos
