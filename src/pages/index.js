import React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BasicLayout from '@/layouts/basic';

@connect(({ loading, user }) => ({
  user: user.user,
  role: user.role,
  userLoading: loading.effects.user.fetchCurrent
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch.user.fetchCurrent({});
    // dispatch({
    //   type: 'user/fetchCurrent',
    //   payload: {}
    // });
  }

  render() {
    const {
      userLoading,
      user, // fail safe
      role // fail safe
    } = this.props;
    let userInfo;

    console.log(userLoading);
    if (userLoading) return 'Loading...';

    if (user.name) {
      userInfo = (
        <div>
          <p>Ten {user.name}</p>
          <p>Tuoi {user.age}</p>
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
