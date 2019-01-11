import React, { Component } from 'react'
import {connect} from 'react-redux';

import { authUser, logout } from '../store/actions'

class Auth extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    const {username, password} = this.state;
    const {authType} = this.props;
    event.preventDefault();
    
    this.props.authUser(authType || 'login', { username, password });
  }

  render() {
    const {username, password} = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Login:</label>
          <input 
            type="text" 
            value={username} 
            name="username" 
            autoComplete="off"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            value={password} 
            name="password" 
            autoComplete="off"
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(
  () => ({}), 
  { authUser, logout }
  )(Auth);