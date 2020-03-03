//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import querystring from 'querystring';

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      city: '',
      state: '',
      zipcode: '',
      modalIsOpen: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.HandleTextChange.bind(this);
    this.insertNewDestination = this.insertNewDestination.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  
  closeModal() {
    this.setState({
      modalIsOpen: false,
      address: '',
      city: 'Tallahassee',
      state: 'FL',
      zipcode: '',
      messageFromServer: ''
    });
  }
  
  componentDidMount() {
    this.setState({
      city: this.props.selectedCity
    });
    
    this.setState({
      state: this.props.selectedState
    });
  }
  
  handleSelectedChange(e) {
    if (e.target.name == 'city') {
      this.setState({
        city: e.target.value
      });
    }
    
    if (e.target.name == 'state') {
      this.setState({
        state: e.target.value
      });
    }
  }
  
  onClick(e) {
    this.insertNewDestination(this);
  }
  
  insertNewDestination(e) {
    axios.post('/insert',
      querystring.stringify({
        address: e.state.address,
        city: e.state.city,
        state: e.state.city,
        zipcode: e.state.zipcode
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        e.setState({
          messageFromServer: response.data
        });
      });
  }
  
  handleTextChange(e) {
    if (e.target.name == 'address') {
      this.setState({
        address: e.target.value
      });
    }
    if (e.target.name == 'zipcode') {
      this.setState({
        zipcode: e.target.value
      });
    }
  }
  
  render() {
    if (this.state.messageFromServer == '') {
      return (
        <div>
          <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
            <span className="glyphicon glyphicon-plus"></span>
          </Button>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Destination" className="Modal">
          <Link to={{pathname: '/', search: ''}} style={{ textDecoration: 'none' }}>
          
          //finish later
