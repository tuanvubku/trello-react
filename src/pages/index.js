import React from 'react';
import { navigate } from 'gatsby';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BasicLayout from '@/layouts/basic';

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

  render() {
    return (
      <BasicLayout>
        <Button variant="contained" color="primary" onClick={this.toLogin}>
          To Login
        </Button>
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
