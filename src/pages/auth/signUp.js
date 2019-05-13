
import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';  
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';  
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
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
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
const customStyles = {
  root: {
    marginTop:7
  },
 
};
@connect(({ user }) => ({
  error: user.error
}))
class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    repPassword: '',
    email: '',
    alertPassword:'',
    alertUsername:'',
    alertEmail:'',
  }
  componentWillReceiveProps(props)
  {
    var {error}=props;
    if(error)
    {
      if(error.alertUsername) this.setState({alertUsername:error.alertUsername})
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ alertPassword:'',  alertUsername:'', alertEmail:'',})
    const { dispatch } = this.props;
    const { username, password, email,repPassword } = this.state; 
    if(password!==repPassword)
    {
      this.setState({alertPassword:'Password not match'});
      return false;
    }  
    dispatch({
      type: 'user/signUp',
      payload: {username, password, email  }
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render()
  { var {classes}=this.props;
  var {alertPassword, alertUsername, alertEmail }=this.state;
    return (<React.Fragment>
      <Header/>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input type="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
              <Typography  style={{...customStyles.root,color:'red' }} variant="subtitle1" align="center" > 
              {alertEmail} </Typography>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" onChange={this.handleChange} />
              <Typography  style={{...customStyles.root,color:'red' }} variant="subtitle1" align="center" > 
              {alertUsername} </Typography>
            </FormControl>


            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.handleChange} 
              autoComplete="current-password" />
             
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Repead password</InputLabel>
              <Input name="repPassword" type="password" id="repPassword" onChange={this.handleChange}
              autoComplete="repPassword" />
              <Typography  style={{...customStyles.root,color:'red' }} variant="subtitle1" align="center" > 
              {alertPassword} </Typography>
          
            </FormControl>

            
            <Button 
              fullWidth type="submit"
              variant="contained"
              color="primary" Sign up 
              className={classes.submit}  >
              Register
            </Button>
            <Typography style={customStyles.root} variant="subtitle1" align="right" > 
            Have account, <a onClick={()=>navigate('auth/login')} style={{cursor:'pointer',color:'green'}}>login here</a> </Typography>
          </form>

        </Paper>
      </main></React.Fragment>
    );
  }
  
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);