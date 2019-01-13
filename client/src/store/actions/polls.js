import API from '../../services/api';
import { SET_POLLS, SET_CURRENT_POLL } from '../actionTypes';
import { addError, removeError } from './error';

export const setPolls = polls => ({
  type: SET_POLLS,
  polls
});

export const setCurrentPoll = poll => ({
  type: SET_CURRENT_POLL,
  poll
});

export const getPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', 'polls');
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      console.log(error)
      dispatch(addError(error.message));
    }
  }
}

export const getUserPolls = () => {
  return async dispatch => {
    try {
      const polls = await API.call('get', 'polls/user');
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }
}

export const createPoll = data => {
  return async dispatch => {
    try {
      const poll = await API.call('post', 'polls', data);
      dispatch(createPoll(poll));
      dispatch(removeError());
    } catch (err) {      
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }
}

export const getCurrentPoll = path => {
  return async dispatch => {
    try {
      const poll = await API.call('get', `polls/${path}`);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.response.data));
    }
  };
};

export const vote = (path, data) => {
  return async dispatch => {
    try {
      const poll = await API.call('post', `polss/${path}`, data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  }
}