import React from 'react'
import ReactDOM from 'react-dom'
import GetUserRepos from './getUserRepos'

function App() {
  return (
    <div>
      <GetUserRepos />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
