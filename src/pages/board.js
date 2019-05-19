import React from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PrivateRoute from '@/components/PrivateRoute';
import ProtectedView from '@/components/ProtectedView';
import BasicLayout from '@/layouts/basic';
import TrelloList from '@/components/List';
import List from '@material-ui/core/List';
import CardDetail from '@/components/CardDetail';
import AddButton from '@/components/AddButton';
import { DragDropContext } from 'react-beautiful-dnd';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import AutoCompleteTextField from '@/components/AutoCompleteTextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PopupState, {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/index';
const styles = {
  button: {
    margin: 1
  },
  input: {
    display: 'none'
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    float: 'left',
    backgroundColor: deepPurple[500]
  },
  openFormButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center'
  },
  root: {
    flexGrow: 1,
    width: 1000
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `1px`
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }
  },
  margin: {
    margin: 1
  },
  username: {
    fontColor: 'brown',
    fontWeight: 'bold'
  }
};
const customStyle = {
  root: {
    flexGrow: 1
  },
  title: {
    color: 'brown'
  },
  boardContainer: {
    display: 'flex',
    flexDirection: 'row'
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
  margin: { width: 130, marginLeft: 9, marginTop: -15 },
  purpleAvatar: {
    margin: 1,
    color: '#fff',
    float: 'left',
    backgroundColor: deepPurple[500]
  }
};
@connect(({ board, list, user, card }) => ({
  boardInfo: board.boardInfo,
  lists: list.lists,
  currentUser: user.user,
  showFormAddMem: board.showFormAddMem,
  cards: card.cards
}))
class Board extends React.Component {
  constructor(props) {
    super(props);
    const { boardInfo = {} } = props;
    var { modeView, name, background } = boardInfo;
    this.state = {
      boardName: name,
      background,
      modeView,
      isBackgroundEdit: false,
      isNameEdit: false,
      isMemEdit: false,
      isModeViewEdit: false,
      showFormAddMem: true
    };
  }
  componentWillReceiveProps(props) {
    const { boardInfo = {}, showFormAddMem } = props;
    var { modeView, name, background } = boardInfo;
    document.body.style.backgroundColor = background;
    this.setState({ boardName: name, background, modeView, showFormAddMem });
  }
  componentWillUnmount() {
    // reset defaut
    document.body.style.backgroundColor = 'white';
  }
  componentDidMount() {
    const { boardId, dispatch } = this.props;
    dispatch({
      type: 'board/fetchBoard',
      payload: {
        id: boardId
      }
    });
    dispatch.user.fetchCurrentUser();
  }
  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const { droppableId: sourceList } = source;
    const { droppableId: destList, index: order } = destination;
    this.props.dispatch({
      type: 'card/moveCardRequest',
      payload: {
        _id: draggableId,
        newListId: destList,
        oldListId: sourceList,
        idUserMove: this.props.currentUser._id,
        order
      }
    });
  };
  changeState = kind => {
    if (kind === 'background')
      this.setState({
        isBackgroundEdit: true,
        isNameEdit: false,
        isMemEdit: false,
        isModeViewEdit: false,
        showFormAddMem: true
      });
    if (kind === 'name')
      this.setState({
        isBackgroundEdit: false,
        isNameEdit: true,
        isMemEdit: false,
        isModeViewEdit: false,
        showFormAddMem: true
      });
    if (kind === 'mem')
      this.setState({
        isBackgroundEdit: false,
        isNameEdit: false,
        isMemEdit: true,
        isModeViewEdit: false,
        showFormAddMem: true
      });
    if (kind === 'mode')
      this.setState({
        isBackgroundEdit: false,
        isNameEdit: false,
        isMemEdit: false,
        isModeViewEdit: true,
        showFormAddMem: true
      });
    console.log(this.state);
  };
  clickLabel = e => {
    var btn = document.getElementsByName('label');
    for (var x of btn) x.innerHTML = '';
    e.target.innerHTML = `<i style={{float:'right'}}>✔</i>`;
    this.setState({ background: e.target.style.backgroundColor });
    document.body.style.backgroundColor = e.target.style.backgroundColor;
  };
  saveChange = kind => {
    var { boardInfo, currentUser, dispatch } = this.props;
    var { boardName, background } = this.state;
    var body = {
      _id: boardInfo._id,
      ownerId: currentUser._id
    };
    if (kind === 'name') body.name = boardName;
    if (kind === 'background') body.background = background;
    if (kind === 'modeViewTrue') {
      body.modeView = true;
      this.setState({ modeView: true });
    }
    if (kind === 'modeViewFalse') {
      body.modeView = false;
      this.setState({ modeView: false });
    }
    dispatch({
      type: 'board/editBoardRequest',
      payload: body
    });
  };
  handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    var name = e.target.name;
    this.setState({ [name]: value });
  };
  deleteMember = memberName => {
    var { boardInfo, currentUser, dispatch } = this.props;
    var body = {
      _id: boardInfo._id,
      memberName,
      idUserRemove: currentUser._id
    };
    dispatch({
      type: 'board/removeMemberRequest',
      payload: { body }
    });
  };
  render() {
    var mapColor = {
      white: 'blue',
      red: 'white',
      orange: 'green',
      yellow: 'blue',
      blue: 'white',
      green: 'white',
      gray: 'white'
    };
    const { lists = [], boardInfo = {} } = this.props;
    const { _id: boardId } = boardInfo;
    var members = boardInfo.members || [];
    return (
      <React.Fragment>
        <div>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <div>
                <div>
                  <Button
                    style={{
                      color: mapColor[this.state.background]
                        ? mapColor[this.state.background]
                        : 'white'
                    }}
                    onMouseUp={() => this.changeState('name')}
                    className={styles.button}
                    {...bindTrigger(popupState)}
                  >
                    <i className="material-icons"> table_chart </i>
                    <span style={{ fontSize: 25, marginLeft: 3 }}>
                      {' ' + this.state.boardName}
                    </span>
                  </Button>
                  <Button
                    onMouseUp={() => this.changeState('mode')}
                    style={{
                      color: mapColor[this.state.background]
                        ? mapColor[this.state.background]
                        : 'white'
                    }}
                    className={styles.button}
                    {...bindTrigger(popupState)}
                  >
                    <i className="material-icons"> lock </i>{' '}
                    {this.state.modeView === true ? ' Công khai' : ' Riêng tư'}
                  </Button>
                  <Button
                    style={{
                      color: mapColor[this.state.background]
                        ? mapColor[this.state.background]
                        : 'white'
                    }}
                    onMouseUp={() => this.changeState('background')}
                    className={styles.button}
                    {...bindTrigger(popupState)}
                  >
                    <i className="material-icons"> format_color_fill </i>{' '}
                    {' Màu nền'}{' '}
                  </Button>
                  <Button
                    style={{
                      color: mapColor[this.state.background]
                        ? mapColor[this.state.background]
                        : 'white'
                    }}
                    onMouseUp={() => this.changeState('mem')}
                    className={styles.button}
                    {...bindTrigger(popupState)}
                  >
                    <i className="material-icons"> people_outline </i> {' Mời'}
                  </Button>
                  <Button>
                    {members.map(
                      ({
                        _id,
                        username,
                        imageUrl = 'http://tinyurl.com/y34hpqbr'
                      }) => {
                        return (
                          <PopupState variant="popover" key={username}>
                            {popupState => (
                              <div>
                                <Tooltip title={username} placement="bottom">
                                  <Avatar
                                    {...bindTrigger(popupState)}
                                    key={username}
                                    src={imageUrl}
                                    style={customStyle.purpleAvatar}
                                  >
                                    {username.substring(0, 2)}
                                  </Avatar>
                                </Tooltip>
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
                                  <Card
                                    style={{
                                      ...styles.cardContainer,
                                      width: 200
                                    }}
                                  >
                                    <CardContent>
                                      <Avatar
                                        src={imageUrl}
                                        style={customStyle.purpleAvatar}
                                      >
                                        {username.substring(0, 2)}
                                      </Avatar>
                                      <Typography style={customStyle.title}>
                                        {' '}
                                        {username}
                                      </Typography>
                                      <Button
                                        style={customStyle.button}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                          this.deleteMember(username)
                                        }
                                        id={_id}
                                      >
                                        Gỡ
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </Popover>
                              </div>
                            )}
                          </PopupState>
                        );
                      }
                    )}
                  </Button>
                </div>
                {this.state.showFormAddMem === false ? null : (
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
                      {this.state.isNameEdit === false ? null : (
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
                      )}
                      {this.state.isMemEdit === false ? null : (
                        <AutoCompleteTextField kind="board" />
                      )}

                      {this.state.isModeViewEdit === false ? null : (
                        <List>
                          <ListItem
                            button
                            onClick={() => {
                              this.saveChange('modeViewTrue');
                              popupState.close();
                            }}
                          >
                            <ListItemText inset primary="Công khai" />
                            <ListItemIcon>
                              {' '}
                              {this.state.modeView === true ? (
                                <DoneIcon />
                              ) : (
                                ' '
                              )}{' '}
                            </ListItemIcon>
                          </ListItem>
                          <ListItem
                            button
                            onClick={() => {
                              this.saveChange('modeViewFalse');
                              popupState.close();
                            }}
                          >
                            <ListItemText inset primary="Riêng tư" />
                            <ListItemIcon>
                              {' '}
                              {this.state.modeView === false ? (
                                <DoneIcon />
                              ) : (
                                ' '
                              )}{' '}
                            </ListItemIcon>
                          </ListItem>{' '}
                        </List>
                      )}
                      {this.state.isBackgroundEdit === false ? null : (
                        <div>
                          <Button
                            onClick={this.clickLabel}
                            name="label"
                            variant="contained"
                            style={{
                              backgroundColor: 'red',
                              height: 35,
                              width: 100
                            }}
                          >
                            {this.state.background === 'red' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'yellow' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'orange' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'blue' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'green' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === '#d27af4' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === '#1eedab' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'gray' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
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
                          >
                            {this.state.background === 'white' ? (
                              <i style={{ float: 'right' }}>✔</i>
                            ) : (
                              ' '
                            )}
                          </Button>
                        </div>
                      )}
                      {(this.state.isMemEdit || this.state.isModeViewEdit) ===
                      true ? null : (
                        <Button
                          style={customStyle.button}
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (
                              this.state.isNameEdit &&
                              this.state.boardName !== ''
                            ) {
                              popupState.close();
                              this.saveChange('name');
                            } else if (this.state.isBackgroundEdit) {
                              this.saveChange('background');
                              popupState.close();
                            }
                          }}
                        >
                          Lưu
                        </Button>
                      )}
                    </div>
                  </Popover>
                )}
              </div>
            )}
          </PopupState>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <div style={customStyle.boardContainer}>
              {lists.map(({ name, cards, _id }) => (
                <TrelloList
                  title={name}
                  cards={cards}
                  key={_id}
                  idList={_id}
                  idBoard={boardId}
                />
              ))}
              <AddButton
                list
                color={
                  mapColor[this.state.background]
                    ? mapColor[this.state.background]
                    : 'white'
                }
              />
              <CardDetail />
            </div>
          </div>
        </DragDropContext>
      </React.Fragment>
    );
  }
}

// board is pass through props,
// by PrivateRoute from Router
const BoardContainer = ({ board }) => (
  <ProtectedView allowedRole={['user', 'admin']}>
    <Board boardId={board} />
  </ProtectedView>
);

const BoardView = () => (
  <BasicLayout>
    <Router>
      <PrivateRoute path="/board/:board" component={BoardContainer} />
    </Router>
  </BasicLayout>
);

export default BoardView;
