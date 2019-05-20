import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';

import PopupState, {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/index';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

const customStyle = {
  root: {
    flexGrow: 1
  },
  title: {
    color: 'brown'
  },

  textField: {
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10
  },
  margin: { width: 130, marginLeft: 9, marginTop: -15 }
};

@connect(({ user }) => ({
  currentUser: user.user
}))
class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    background: 'white',
    boardName: '',
    isPublic: true,
    isLogin:this.props.currentUser.username!==undefined
  };
  componentWillReceiveProps(props)
  {
    if(props.currentUser.username)this.setState({isLogin:true});
    else this.setState({isLogin:false}); 
  }
  toLogout = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logout',
      payload: {}
    });
    navigate('/');
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  clickLabel = e => {
    var btn = document.getElementsByName('label');
    for (var x of btn) x.innerHTML = '';
    e.target.innerHTML = `<i style={{float:'right'}}>✔</i>`;
    this.setState({ background: e.target.style.backgroundColor });
  };
  handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    var name = e.target.name;
    this.setState({ [name]: value });
  };
  createBoard = () => {
    var { dispatch, currentUser } = this.props;
    var { boardName, background, isPublic } = this.state;
    if (!boardName) return false;
    var body = {
      name: boardName,
      background,
      modeView: isPublic,
      ownerId: currentUser._id
    };
    dispatch({
      type: 'board/addBoardRequest',
      payload: body
    });
    this.setState({
      anchorEl: null,
      mobileMoreAnchorEl: null,
      background: 'white',
      boardName: '',
      isPublic: true
    });
  };
  toLogin = () => {
    navigate(`/auth/login`);
  };
  toSignUp = () => {
    navigate(`/auth/signUp`);
  };
  render() {
    const { anchorEl, mobileMoreAnchorEl,isLogin } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Tài khoản</MenuItem>
        <MenuItem onClick={this.toLogout}>Đăng xuất</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* form add board */}
        <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>
              {' '}
              <MenuItem {...bindTrigger(popupState)}>
                <IconButton color="inherit">
                  <Icon
                    className={classes.icon}
                    color="disabled"
                    fontSize="large"
                  >
                    {' '}
                    add_circle{' '}
                  </Icon>
                </IconButton>
                <p>Thêm bảng</p>
              </MenuItem>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <div style={customStyle.textField}>
                  <TextField
                    margin="dense"
                    label="Tên bảng"
                    style={styles.textField}
                    value={this.state.boardName}
                    fullWidth
                    onChange={this.handleChange}
                    variant="outlined"
                    name="boardName"
                  />
                  <br />
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={customStyle.title}
                  >
                    <Checkbox
                      checked={this.state.isPublic}
                      name="isPublic"
                      onChange={this.handleChange}
                    />
                    Công khai
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={customStyle.title}
                  >
                    Màu nền
                  </Typography>
                  <br />
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'red',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'yellow',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'orange',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>{' '}
                  <br />
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'blue',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'green',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: '#d27af4',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>{' '}
                  <br />
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: '#1eedab',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'gray',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    {' '}
                  </Button>
                  <Button
                    onClick={this.clickLabel}
                    name="label"
                    variant="contained"
                    style={{
                      backgroundColor: 'white',
                      height: 35,
                      width: 100
                    }}
                    className={classes.button}
                  >
                    <i style={{ float: 'right' }}>✔</i>
                  </Button>
                  <br />
                  <Button
                    style={customStyle.button}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (this.state.boardName !== '') {
                        popupState.close();
                        this.createBoard();
                      }
                    }}
                  >
                    Tạo bảng
                  </Button>
                </div>
              </Popover>
            </div>
          )}
        </PopupState>

        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Thông báo</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Tài khoản</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{  background:'linear-gradient(135deg, green, #5067C5)'}}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
              onClick={() => {
                navigate('/');
              }}
            >
              Trello 2019
            </Typography>

            <div className={classes.grow} />
            {isLogin===true?
            <div className={classes.sectionDesktop}>
              {/* form add board */}
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                  <div>
                    <IconButton color="inherit" {...bindTrigger(popupState)}>
                      <Icon
                        className={classes.icon}
                        color="error"
                        style={{ fontSize: 40 }}
                      >
                        {' '}
                        add_circle{' '}
                      </Icon>
                    </IconButton>

                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                    >
                      <div style={customStyle.textField}>
                        <TextField
                          margin="dense"
                          label="Tên bảng"
                          style={styles.textField}
                          value={this.state.boardName}
                          fullWidth
                          onChange={this.handleChange}
                          variant="outlined"
                          name="boardName"
                        />
                        <br />
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          style={customStyle.title}
                        >
                          <Checkbox
                            checked={this.state.isPublic}
                            name="isPublic"
                            onChange={this.handleChange}
                          />
                          Công khai
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          style={customStyle.title}
                        >
                          Màu nền
                        </Typography>
                        <br />
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'red',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'yellow',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'orange',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>{' '}
                        <br />
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'blue',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'green',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: '#d27af4',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>{' '}
                        <br />
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: '#1eedab',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'gray',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          {' '}
                        </Button>
                        <Button
                          onClick={this.clickLabel}
                          name="label"
                          variant="contained"
                          style={{
                            backgroundColor: 'white',
                            height: 35,
                            width: 100
                          }}
                          className={classes.button}
                        >
                          <i style={{ float: 'right' }}>✔</i>
                        </Button>
                        <br />
                        <Button
                          style={customStyle.button}
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (this.state.boardName !== '') {
                              popupState.close();
                              this.createBoard();
                            }
                          }}
                        >
                          Tạo bảng
                        </Button>
                      </div>
                    </Popover>
                  </div>
                )}
              </PopupState>

              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>:null}
            {isLogin===true?
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>:null}
            {isLogin===true?null:
            <div>
            <Button variant="contained" style={{marginTop:-10,backgroundColor:'green'}}
                  color="primary" onClick={this.toLogin}>Đăng nhập</Button>
            <Button style={{marginTop:-10,backgroundColor:'transparent',color:'white'}}   variant="outlined" onClick={this.toSignUp}>Đăng kí</Button></div>}
          </Toolbar>
        </AppBar>
        
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
