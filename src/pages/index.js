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
    boardId: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = () => {
    const { boardId } = this.state;
    navigate(`/board/${boardId}`);
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
    const { userLoading, user = {}, role = [] } = this.props;
    let userInfo;

    if (userLoading) return 'Loading...';

    if (user.username) {
      userInfo = (
        <div>
          <p>Ten {user.username}</p>
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
        <p>Enter board id</p>
        <TextField
          id="outlined-name"
          label="Name"
          value={this.state.boardId}
          onChange={this.handleChange('boardId')}
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
