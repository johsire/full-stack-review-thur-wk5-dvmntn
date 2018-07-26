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

  logout() {
    axios.get('/api/logout').then(res => {
      this.props.history.push('/');
    })
  }

  render() {
    let {user} = this.props
    return (
      <div>

        <h1>Account Information</h1>
        {
          user.user_name ? (
            <div>
              <p>Account Holder: {user.user_name} </p>
              <p>Account Email: {user.email} </p>
              <p>Account Number: {user.auth_id} </p>
              <img src={user.picture} alt="" />
              <a href="http://localhost:3005/api/logout">
              <button> Logout </button>
              </a>
            </div>

          ) : (<p>Please login</p>)
        }

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
export default connect(mapStateToProps, {updateUserData})(Private);
