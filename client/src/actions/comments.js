import axios from 'axios';
import { reset } from 'redux-form';

import { 
  FETCH_COMMENTS,
  COMMENT_ERROR
} from './types';

export function createComment(props) {
  return function(dispatch) {
    axios.post(`/api/comments`, props, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch(reset('EventDetails'));
        dispatch(fetchComments(props.id))
      })
      .catch(err => {
        dispatch(commentError(err))
      })
  }
}

export function fetchComments(id) {
  return function(dispatch) {
    axios.get(`/api/comments/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: response
        });
      })
      .catch(err => {
        dispatch(commentError(err))
      })
  }
}

export function deleteComment(id) {
  return function(dispatch) {
    return axios.delete(`/api/comments/${id}`, {
      headers: { auth: localStorage.getItem('token')}
    })
    .catch(err => {
      dispatch(commentError(err))
    })
  }
}

export function commentError(error) {
  return {
    type: COMMENT_ERROR,
    payload: error
  }
}