import React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BasicLayout from '@/layouts/basic';

@connect(({ user }) => ({
  user: user.user,
  role: user.role
}))
class Index extends React.Component {
  state = {
    boardName: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = () => {
    const { boardName } = this.state;
    navigate(`/board/${boardName}`);
  };

  toLogin = () => {
    navigate(`/auth/login`);
  };

  toLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logout',
      payload: {}
    });
  };

  render() {
    const {
      user: { name, age },
      role
    } = this.props;
    let userInfo;

    if (name) {
      userInfo = (
        <div>
          <p>Ten {name}</p>
          <p>Tuoi {age}</p>
          <p>role: {role}</p>
          <Button variant="contained" color="primary" onClick={this.toLogout}>
            Logout
          </Button>
        </div>
      );
    } else {
      userInfo = (
        <Button variant="contained" color="primary" onClick={this.toLogin}>
          To Login
        </Button>
      );
    }
    return (
      <BasicLayout>
        {userInfo}
        <p>Enter board name</p>
        <TextField
          id="outlined-name"
          label="Name"
          value={this.state.boardName}
          onChange={this.handleChange('boardName')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          To board
        </Button>
      </BasicLayout>
    );
  }
}

export default Index;
