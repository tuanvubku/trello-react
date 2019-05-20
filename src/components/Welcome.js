import React, { Component } from 'react'; 
import { navigate } from 'gatsby'; 
import Button from '@material-ui/core/Button'; 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'; 

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});
class Welcome extends Component {
  toLogin = () => {
    navigate(`/auth/login`);
  };
  toSignUp = () => {
    navigate(`/auth/signUp`);
  };
  render() {
    var { classes } = this.props;
    return (
      <Grid container spacing={24} justify="center" style={{background:'linear-gradient(135deg, green, #5067C5)'}}>
        <Grid item xs={12} sm={6}> 
        <br/>
        <br/>
          <Typography variant="h3" align="center" color="textSecondary" style={{color:'white'}} paragraph>
            Trello giúp bạn làm việc có tính hợp tác hơn và làm được nhiều hơn.
        </Typography>
          <Typography variant="h5" align="center" color="textSecondary"  style={{color:'white'}}  paragraph>
            Các bảng, danh sách, và thẻ của Trello cho phép bạn tổ chức và ưu tiên các dự án của bạn một cách vui vẻ, linh hoạt và xứng đáng.
        </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button
                  onClick={this.toLogin}
                  variant="contained"
                  color="primary"
                >
                  Đăng nhập sử dụng ngay
              </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.toSignUp}
                  variant="outlined"
                  style={{color:'white',backgroundColor:'brown'}}  
                >
                  Đăng kí tài khoản
              </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}> 
          <img style={{ width: '95%',height: 'auto',marginLeft:'2%'}}
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" />
        </Grid>
      </Grid>



    );
  };
}
export default withStyles(styles)(Welcome);
