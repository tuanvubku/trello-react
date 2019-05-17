import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Header from '@/layouts/header';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dateFormat from 'dateformat';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
@connect(({ user }) => ({
  user: user.user,
  board: user.board
}))

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDiaglogRemove: false }
  }
  toLogin = () => {
    navigate(`/auth/login`);
  };
  toSignUp = () => {
    navigate(`/auth/signUp`);
  };
  onSubmit = boardId => {
    navigate(`/board/${boardId}`);
  };
  handleClickOpen = (_id) => { 
    this.setState({ openDiaglogRemove: true,idPrepareRemove:_id });
  };
  handleClose = () => {
    this.setState({ openDiaglogRemove: false });
  };
  onDelete = (_id) => {
    console.log(_id);
    var {  dispatch, user } = this.props;
    var body = { ownerId: user._id };
    dispatch({
      type: 'board/deleteBoardRequest',
      payload: { _id, body }
    });
    this.setState({ openDiaglogRemove: false });
  };
  render() {
    const { user, classes, board = [] } = this.props;
    var welcome = (
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Trello React
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Sản phẩm dựa trên ý tưởng của trello, chào mừng bạn đến với trello
          clone :))
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
                color="primary"
              >
                Đăng kí tài khoản
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
    if (user.username) welcome = null;
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <main>
          <div className={classes.heroUnit}>{welcome} </div>
          {this.props.children !== undefined ? (
            this.props.children
          ) : (
              <div className={classNames(classes.layout, classes.cardGrid)}>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                  <Grid container spacing={40}>
                    {board.map(
                      ({
                        _id,
                        background,
                        dateCreated,
                        list,
                        members,
                        name,
                        modelView,
                        ownerId
                      }) => (
                          <Grid item key={_id} sm={6} md={4} lg={3}>
                            <Card
                              className={classes.card}
                            >
                              <CardHeader
                                action={
                                  <IconButton onClick={()=>this.handleClickOpen(_id)}>
                                    <DeleteForeverIcon />
                                  </IconButton>
                                }
                                title={name}
                                subheader={dateFormat(new Date(dateCreated), "dddd, mmmm dS, yyyy")}
                                style={{ backgroundColor: '#e0ddd0' }}
                              >


                              </CardHeader>
                              <CardMedia
                                className={classes.cardMedia}
                                image="https://design.trello.com/img/mascots/mascots-graphic-1@2x.png"
                                title="Image title"
                                onClick={() => this.onSubmit(_id)}
                              />
                              <CardContent className={classes.cardContent} style={{ backgroundColor: '#e0ddd0' }}>
                                <Typography style={{ fontSize: 30 }}>
                                  <i className="material-icons" style={{ fontSize: 40 }}>
                                    person_outline</i> {members.length}  </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                    )}
                  </Grid>
                </div>
              </div>
            )}
          <Dialog
            open={this.state.openDiaglogRemove}
            onClose={this.handleClose} 
          >
            <DialogTitle  >Remove board</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to remove this board pernamently?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
             </Button>
              <Button onClick={() => { this.onDelete(this.state.idPrepareRemove) }} color="primary">
                Delete
               </Button>
            </DialogActions>
          </Dialog>
        </main>

        {/* Footer */}
        {/* <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Tháng 5 - 2019
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Thực tập công nghệ phần mềm
          </Typography>
        </footer> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}

BasicLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicLayout);
