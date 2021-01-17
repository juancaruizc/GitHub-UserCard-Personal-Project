import React from 'react'
import axios from 'axios'
import GitHubCalendar from "react-github-calendar";


class App extends React.Component {
  state = {
    user: '',
    followers: []
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/juancaruizc')
    .then((res) => {
      this.setState({
        user: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
    axios.get('https://api.github.com/users/juancaruizc/followers')
    .then((res) => {
      this.setState({
        followers: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  
  handleClick = (e) => {
    e.preventDefault()
      axios.get(`https://api.github.com/users/${this.state.user}`)
      .then((res) => {
        this.setState({
          user: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
      axios.get(`https://api.github.com/users/${this.state.user}/followers`)
      .then((res) => {
        this.setState({
          followers: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      user: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <h1>What GitHub User Do You Want? 🤔</h1>
        <form>
          <input
          onChange = {this.handleChange}
            type = 'text'
          >
          </input>
          <button onClick = {this.handleClick}>GET IT!</button>
        </form>
        <div>
            <img src = {this.state.user.avatar_url} alt = '' />
            <h2>{this.state.user.name}</h2>
            <h3>Username: {this.state.user.login}</h3>
            <p>Bio: {this.state.user.bio}</p>
            <p>Location: {this.state.user.location}</p>
          <div>
            <p>Followers: {this.state.user.followers}</p>
            <p>Following: {this.state.user.following}</p>
          </div>
            <p>Repos: {this.state.user.public_repos}</p>
            <GitHubCalendar
              blockSize={11}
              blockMargin={3}
              fontSize={14}
              textAlign='center'
              username = 'juancaruizc'
              >
            </GitHubCalendar>
          {
            this.state.followers.map(follower => (
              <div key = {follower.id}>
                <img src = {follower.avatar_url} alt = ''/>
                <p>{follower.login}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
 
}

export default App;
