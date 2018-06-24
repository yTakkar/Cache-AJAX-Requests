import React from 'react'
import ReactDOM from 'react-dom'
import GetUserRepos from './getUserRepos'
import Note from './note'

function App() {
  return (
    <div>
      <Note />
      <GetUserRepos />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
