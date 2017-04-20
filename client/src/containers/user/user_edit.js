import React, { Component } from 'react';
import { connect } from 'redux';
import { fetchUser } from '../../actions/users';
import validator from 'validator';
import { Field, reduxForm } from 'redux-form';
import {
  Card, CardBlock, CardTitle,
  ListGroupItem, ListGroup, Col,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deletedComments: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    
  }

  onDelete() {
    const id = this.props.user.id
    this.props.deleteUser(id)
  }

  onSubmit(props) {

  };

  renderDelete(){
    return (
      <div>
      <Button color="danger" className="mx-3" onClick={this.toggle}>Delete</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Delete Account</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your account?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onDelete.bind(this)}>Delete Account</Button>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }

  renderField({input, label, type, value, meta: {touched, error}}) {
    return (
      <div className={ (touched && error) ? 'form-group has-danger' : 'form-group'}>
        <label>{label}</label>
        <div>
          <input {...input}
            className={ (touched && error) ? 'form-control form-control-danger' : 'form-control'}
            placeholder={label}
            type={type} />
          {touched && error && <div className="form-control-feedback">{error}</div>}
        </div>
      </div>
    );
  }

  renderEvent() {
    const { handleSubmit } = this.props;
    return (
      <Col lg="6">
      <Card>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Button type="submit" color="primary">Save</Button>
        <CardBlock>
            <Field
            name="username"
            type="text"
            label="Name"
            component={this.renderField}
            />
          <Field
            name="email"
            type="text"
            lable="Email"
            component={this.renderField}
             />
        <p>Enter your password to confirm changes</p>
            <Field
              name="password"
              component={this.renderField}
              type="password"
              className="form-control"
              />
        </CardBlock>
        </form>
        <CardBlock>
          <CardTitle>
            Comments
          </CardTitle>
        </CardBlock>
        <ListGroup className="list-group-flush">
          {this.renderComments()}
        </ListGroup>
        {this.renderDelete()}
      </Card>
      </Col>
    );
  }

  renderComments() {
    return this.props.comments.sort((a, b) => {
      return +(a.posted < b.posted) || +(a.posted === b.posted) -1;
    }).map((comment) => {
      return(
        <ListGroupItem
          color={this.state.deletedComments.includes(comment.id) ? 'danger' : ''}
          className="justify-content-between"
          key={comment.posted}>
          <div>
            <div className="csstooltip"><strong>{comment.username}:&nbsp;</strong>
              <span className="csstooltiptext">{moment(comment.posted).format('DD.MM.YY HH:mm')}</span>
            </div>
            <span>{comment.content}</span>
          </div>
          <Button
            color={this.state.deletedComments.includes(comment.id) ? 'secondary' : 'danger'}
            size="sm"
            className="float-right"
            onClick={()=>this.deleteComment(comment.id)}>
            {this.state.deletedComments.includes(comment.id) ? 'Cancel' : 'Delete'}
            </Button>
        </ListGroupItem>
      )
    });
  }

  render() {
    if(!this.props.event) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    )
    }
    return (
      <div className="row justify-content-md-center">
        {this.renderEvent()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if(!values.name) {
    errors.name = 'Required'
  } else if(validator.isByteLength(values.name, {min:51})){
    errors.name = 'Maximum length is 50 characters'
  }
  if(!values.starttime) {
    errors.starttime = 'Required'
  }
  if(!values.endtime) {
    errors.endtime = 'Required'
  }
  if(values.starttime>values.endtime) {
    errors.endtime = 'Ending time has to be after starting time'
  }
  return errors
}

function mapStateToProps(state) {
  return { 
    event: state.events.event,
    comments: state.comments,
    initialValues: state.events.event
  };
}

EditEvent = reduxForm({
  form: 'EditEvent',
  validate
})(EditEvent);

export default connect(mapStateToProps, actions)(EditEvent);