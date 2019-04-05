import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

@connect()
class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch({
      type: 'user/login',
      payload: {
        username,
        password
      }
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <TextField
          id="outlined-name"
          label="Username"
          value={this.state.username}
          onChange={this.handleChange('username')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-name"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="secondary" onClick={this.onSubmit}>
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
