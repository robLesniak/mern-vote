import React, { Component } from 'react';
import {connect} from 'react-redux';

import { getPolls, getUserPolls, getCurrentPoll} from '../store/actions';

class Polls extends Component {

  componentDidMount() {
    const {getPolls} = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { getCurrentPoll } = this.props;
    getCurrentPoll(id)
  }

  render() {
    const polls = this.props.polls.map(poll => (
    <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
      {poll.question}
    </li>))

    return (
      <div>
        <ul>
          {polls}
        </ul>
      </div>
    )
  }
}

export default connect(store => ({
  auth: store.auth,
  polls: store.polls
}), { getPolls, getUserPolls, getCurrentPoll})(Polls);