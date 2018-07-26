import React, {Component} from 'react';
import axios from 'axios';

export default class Private extends Component {
  componentDidMount() {
    axios.get('/api/user-data').then(res => {
      // invoke an action creator to update redux store;

    })
  }

  render() {
    return (
      <div>
        <h1>Private Route</h1>
      </div>
    )
  }
}