import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Header from '@/layouts/header';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
const customStyles = {
  root: {
    margin: 7
  }
};

@connect(({ user }) => ({
  error: user.error
}))
class Login extends React.Component {
  state = {
    username: '',
    password: '',
    alertAccount: ''
  };
  componentWillReceiveProps(props) {
    console.log(props);
    var { error } = props;
    if (error) {
      if (error.alertAccount)
        this.setState({ alertAccount: error.alertAccount });
    }
  }
  onSubmit = () => {
    const { dispatch } = this.props;
    this.setState({ alertAccount: '' });
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
    var { classes } = this.props;
    var { alertAccount } = this.state;
    // console.log(alertAccount);
    return (
      <React.Fragment>
        <Header />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  onChange={this.handleChange('username')}
                  value={this.state.username}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange('password')}
                  value={this.state.password}
                />
                <Typography
                  style={{ ...customStyles.root, color: 'red' }}
                  variant="subtitle1"
                  align="center"
                >
                  {alertAccount}{' '}
                </Typography>
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                autoFocus
                fullWidth
                onClick={this.onSubmit}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Typography
                style={customStyles.root}
                variant="subtitle1"
                align="right"
              >
                Don't have account,{' '}
                <a
                  onClick={() => navigate('auth/signUp')}
                  style={{ cursor: 'pointer', color: 'green' }}
                >
                  register here
                </a>{' '}
              </Typography>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
