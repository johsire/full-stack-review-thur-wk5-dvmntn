import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { updateUserData } from '../../ducks/users';


class Private extends Component {
  componentDidMount() {
    axios.get('/api/user-data').then(res => {
      // invoke an action creator to update redux store;
      this.props.updateUserData(res.data);
    });
  };

  render() {
    return (
      <div>
        <h1>Private Route</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
};


// local component obj to redux store state object + the second one is our action creator which is optional and always goes in a the second argument;
export default connect(mapStateToProps, updateUserData)(Private);
