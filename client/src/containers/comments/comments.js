import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments, createComment, deleteComment, clearComments } from '../../actions/comments';
import { Field, reduxForm } from 'redux-form'
import moment from 'moment';
import {
  Alert, CardBlock, CardTitle,
  ListGroupItem, ListGroup, InputGroupButton,
  Button
} from 'reactstrap'
import FontAwesome from 'react-fontawesome';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Comments extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.fetchComments(this.props.event);
    }
  }

  componentWillMount() {
    this.props.fetchComments(this.props.event);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  onSubmit(props) {
    props.id = this.props.event;
    this.props.createComment(props)
  };

  deleteComment(id) {
    this.props.deleteComment(id)
      .then(() => {
        this.props.fetchComments(this.props.event)
      })
  }

  renderComments() {
    if(this.props.commentError) {
      return (
        <CardBlock>
          <Alert color="danger">
            <strong>Error fetching comments</strong> 
          </Alert>
        </CardBlock>
      )
    }
    return this.props.comments.sort((a, b) => {
      return +(a.posted < b.posted) || +(a.posted === b.posted) -1;
    }).map((comment) => {
      return(
        <ListGroupItem key={comment.posted} className="comment justify-content-between">
          <div>
          <Link to={"/user/" + comment.author}>
          <div className="csstooltip"><strong>{comment.username}:&nbsp;</strong>
            <span className="csstooltiptext">{moment(comment.posted).format('DD.MM.YY HH:mm')}</span>
          </div>
          </Link>
          <span>{comment.content}</span>
          </div>
          {this.props.user.id === comment.author ?
            <div className="comment-delete">
            <FontAwesome
              name="trash"
              tag="a"
              onClick={()=>this.deleteComment(comment.id)} /></div> : ''}
          </ListGroupItem>
      )
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
      <CardBlock>
        <CardTitle>Comments</CardTitle>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="input-group">
          <Field
            name="content"
            component="input"
            type="text"
            className="form-control"
            />
          <InputGroupButton>
            <Button type="submit" color="secondary">Send</Button>
          </InputGroupButton>
        </div>
        </form>
      </CardBlock>
      <ListGroup className="list-group-flush">
      <CSSTransitionGroup
        transitionName="comment"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {this.renderComments()}
      </CSSTransitionGroup>
      </ListGroup>
      </div>
    )
  }

}

function validate(values) {
  const errors = {}
  if(!values.content) {
    errors.content = true;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    commentsready: state.comments.commentsready,
    comments: state.comments.all,
    user: state.auth.currentuser,
    commentError: state.comments.error
  };
}

const actions = {
  fetchComments, createComment, deleteComment, clearComments
}

Comments = reduxForm({
  form: 'Comments',
  validate
})(Comments);

export default connect(mapStateToProps, actions)(Comments);