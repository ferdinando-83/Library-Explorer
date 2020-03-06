//client/components/App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import '../css/App.css';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {selectedCity: 'Tallahassee', selectedState: 'FL', data: []};
    this.getData = this.getData.bind(this);
  }
  
  componentDidMount() {
    this.getData(this, 'FL');
  }
  
  componentWillReceiveProps(nextProps) {
    this.getData(this, 'FL');
  }
  
  getData(ev, state) {
    axios.get('/getAll?city=All&state=' + state)
      .then((response) => {
        ev.setState({data: response.data});
        ev.setState({selectedState: parseString(state)});
    });
  }
  
  render() {
    return (
      <div>
        <Add selectedCity={this.state.selectedCity} selectedState={this.state.selectedState} />
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='desc-col'>Address</th>
              <th className='button-col'>City</th>
              <th className='button-col'>State</th>
              <th className='button-col'>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((dest) => {
                return (
                  <tr>
                    <td className='counterCell'></td>
                    <td className='desc-col'>{dest.address}</td>
                    <td className='button-col'>{dest.city}</td>
                    <td className='button-col'>{dest.state}</td>
                    <td className='button-col'>{dest.zipcode}</td>
                    <td className='button-col'>
                      <Update destination={dest} />
                    </td>
                  </tr>
                )
              }
            }
          </tbody>
        </table>
      </div>
    );
  }
}
      
export default App;
