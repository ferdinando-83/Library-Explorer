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
            <Button bsStyle="danger" bsSize="mini" onClick="{this.closeModal}>
              <span className="closebtn glyphicon glyphicon-remove"></span>
            </Button>
          </Link><br/>
          <fieldset>
            <label for="address"">Address:</label>
            <input type="text" id="address" name="address" value={this.state.address} onChange={this.handleTextChange}></input>
            
            <label for="city">City:</label>
            <select id="city" name="city" value={this.state.city} onChange={this.handleSelectChange}>
              <option value="database cities go here" id="database cities go here">Database Cities Go Here</option>
            </select>
        
            <label for="state">State:</label>
            <select id="state" name="state" value={this.state.state} onChange={this.handleSelectChange}>
              <option value="database states go here" id="database states go here">Database States Go Here</option>
            </select>
        
            <label for="zipcode"">Zip Code:</label>
            <input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleTextChange}></input>
          </fieldset>
          <div className='button-center'>
            <br/>
            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Destination</Button>
          </div>
          </Modal>
        </div>
      )
    } else {
        return (
          <div>
            <Button bsStyle="success" bsSize="small" onClick={this.openModal>
              <span className="glyphicon glyphicon-plus"></span>
            </Button>
            <Modal isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              contentLabel="Add Destination"
              className="Modal">
            <div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: ''}} style={{textDecoration: 'none'}}>
                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
            </Modal>
          </div>
        )
    }
  }
}

export default Add;
