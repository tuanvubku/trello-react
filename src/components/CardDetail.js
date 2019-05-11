import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import Grid from '@material-ui/core/Grid';
import Comment from '@/components/Comment';
import LogCard from '@/components/LogCard';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import PopupState, {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/index';
import CustomForm from '@/components/CustomForm';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography align="center" variant="h5">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const styles = theme => ({
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
    gridGap: `${theme.spacing.unit * 3}px`
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
    margin: theme.spacing.unit
  },
  username: {
    fontColor: 'brown',
    fontWeight: 'bold'
  }
});
const customStyle = {
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 2,
    color: '#fff',
    float: 'left',
    backgroundColor: deepPurple[500]
  },
  root: {
    flexGrow: 1,
    width: 1000
  },
  textarea: {
    resize: 'none',
    width: '100%',
    height: '200px',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
    borderRadius: '5px',
    padding: '5px'
  },
  title: {
    fontWeight: 'bold',
    fortSize: 30,
    color: 'brown'
  },
  saveBtn: {
    color: 'white',
    backgroundColor: '#5aac44',
    float: 'left'
  },
  myFont: {
    fontSize: 24,
    color: 'black',
    marginRight: 2
  },
  tiny: {
    cursor: 'pointer',
    fontSize: 17,
    marginLeft: 9,
    color: 'blue',
    border: '1px solid blue',
    borderRadius: 3,
    padding: 2
  }
};

@connect(({ card, comment, logCard, user, board }) => ({
  showDetail: card.showDetail,
  currentCard: card.currentCard,
  logCards: logCard.logCards,
  comments: comment.comments,
  currentUser: user.user,
  boardInfo: board.boardInfo
}))
class CardDetail extends React.Component {
  state = {
    open: false,
    commentText: '',
    title: '',
    description: '',
    dateCreated: '',
    isEditTitle: false,
    labelColor: '',
    archived: false,
    isEditDescription: false,
    memberName: '' // member name is clicked avatar
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentCard) {
      var {
        description,
        title,
        deadline,
        labels,
        fileUrl,
        _id,
        dateCreated,
        ownerId,
        archived,
        members
      } = nextProps.currentCard;
      this.setState({
        open: nextProps.showDetail,
        description,
        title,
        deadline,
        labels,
        fileUrl,
        dateCreated,
        _id,
        ownerId,
        archived,
        members
      });
    } else this.setState({ open: nextProps.showDetail });
  }
  deleteLabel = labelColor => {
    var { currentCard, currentUser, dispatch } = this.props;
    var body = {
      _id: currentCard._id,
      labelColor,
      idUserRemove: currentUser._id
    };
    dispatch({
      type: 'card/deleteLabelCardRequest',
      payload: { body }
    });
  };
  deleteMember = memberName => {
    var { currentCard, currentUser, dispatch } = this.props;
    var body = {
      _id: currentCard._id,
      memberName,
      idUserRemove: currentUser._id
    };
    dispatch({
      type: 'card/removeMemberRequest',
      payload: { body }
    });
  };
  onSave = name => {
    var { currentCard, currentUser, dispatch } = this.props;
    var body =
      name === 'title'
        ? { title: this.state.title }
        : { description: this.state.description };

    body._id = currentCard._id;
    body.idUserEdit = currentUser._id;
    dispatch({
      type: 'card/editCardRequest',
      payload: { body }
    });
    if (name === 'title') this.setState({ isEditTitle: false });
    else this.setState({ isEditDescription: false });

    dispatch({
      type: 'card/fetchCommentOfCard',
      payload: { cardId: currentCard._id }
    });
  };
  onClickAddComment = () => {
    var { currentCard, currentUser, dispatch } = this.props;
    var comment = {
      content: this.state.commentText,
      cardId: currentCard._id,
      ownerId: currentUser._id,
      fileUrl: ''
    };
    dispatch({
      type: 'comment/addCommentRequest',
      payload: { body: comment }
    });
    dispatch({
      type: 'comment/fetchCommentOfCard',
      payload: { cardId: currentCard._id }
    });
    this.setState({ commentText: '' });
  };

  handleClose = () => {
    this.setState({ open: false });
    var { dispatch } = this.props;
    dispatch({
      type: 'card/toggleModal', // toggle modal detail card
      payload: {}
    });
    // update is done on save
    // after close detail modal => update card of list
    // dispatch({
    //   // reload list
    //   type: 'card/fetchCardOfListFromBoard',
    //   payload: {
    //     boardId: boardInfo._id,
    //     listId: currentCard.listId
    //   }
    // });
  };
  formEdit = (name, value) => {
    const { classes } = this.props;
    var state =
      name === 'title' ? { isEditTitle: false } : { isEditDescription: false };
    return (
      <div>
        <Textarea
          onBlur={this.closeForm}
          value={value}
          minRows={2}
          onChange={this.handleInputChange}
          style={{ ...customStyle.textarea, width: 250 }}
          name={name}
        />
        <Button
          onClick={() => this.onSave(name)}
          variant="contained"
          color="primary"
          disableRipple
          className={classNames(classes.margin, classes.bootstrapRoot)}
          style={{ marginTop: -23 }}
        >
          {' '}
          Lưu{' '}
        </Button>
        <Button
          onClick={() => this.setState(state)}
          variant="contained"
          color="primary"
          disableRipple
          className={classNames(classes.margin, classes.bootstrapRoot)}
          style={{ marginTop: -23, backgroundColor: 'brown' }}
        >
          {' '}
          Hủy{' '}
        </Button>
      </div>
    );
  };
  handleInputChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });

    if (e.target.type === 'checkbox') {
      // edit arrchived
      var { currentCard, currentUser, dispatch } = this.props;
      var body = {
        _id: currentCard._id,
        idUserEdit: currentUser._id,
        archived: value
      };
      dispatch({
        type: 'card/editCardRequest',
        payload: { body }
      });
    }
  };
  showForm = kind => {
    var { dispatch } = this.props;
    dispatch({
      type: 'card/toggleSubForm',
      payload: { kind, open: true }
    });
  };
  render() {
    const { classes, comments = [], logCards = [] } = this.props;
    var {
      commentText,
      description,
      title,
      deadline,
      labels = [],
      // fileUrl = [],
      // dateCreated,
      // _id,
      // ownerId,
      archived,
      members = [],
      isEditDescription,
      isEditTitle
    } = this.state;
    var formEditTitle = isEditTitle ? this.formEdit('title', title) : null;
    var formEditDescription = isEditDescription
      ? this.formEdit('description', description)
      : null;
    return (
      <div>
        <Dialog
          maxWidth="md"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          style={styles.root}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Chi tiết công việc
          </DialogTitle>
          <DialogContent
            style={{ backgroundColor: '#d6d4cb' }}
            container
            spacing={24}
          >
            <Grid container="true" spacing={8}>
              <Grid item xs={9}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    title
                  </i>
                  {title}
                  <i
                    style={customStyle.tiny}
                    onClick={() => this.setState({ isEditTitle: true })}
                    className="material-icons"
                  >
                    edit
                  </i>
                </Typography>

                {formEditTitle}
                <br />
                <hr />

                <div>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={customStyle.title}
                  >
                    <i className="material-icons" style={customStyle.myFont}>
                      person
                    </i>
                    Thành viên
                  </Typography>
                  {members.map(mem => {
                    // TODO: Fetch member info from id
                    // members is not fetched, populated from id
                    mem = {
                      username: mem,
                      imageUrl:
                        'https://i2.wp.com/www.bemanistyle.com/wp-content/uploads/2018/01/Linux-Avatar-300px.png?fit=300%2C300&ssl=1'
                    };
                    return (
                      <PopupState variant="popover" key={mem.username}>
                        {popupState => (
                          <div>
                            <Tooltip title={mem.username} placement="bottom">
                              <Avatar
                                {...bindTrigger(popupState)}
                                key={mem.username}
                                src={mem.imageUrl}
                                style={customStyle.purpleAvatar}
                              >
                                {mem.username.substring(0, 2)}
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
                                style={{ ...styles.cardContainer, width: 200 }}
                              >
                                <CardContent>
                                  <Avatar
                                    src={mem.imageUrl}
                                    style={customStyle.purpleAvatar}
                                  >
                                    {mem.username.substring(0, 2)}
                                  </Avatar>
                                  <Typography style={customStyle.title}>
                                    {' '}
                                    {mem.username}
                                  </Typography>
                                  <Button
                                    onClick={() =>
                                      this.deleteMember(mem.username)
                                    }
                                    id={mem.username}
                                    variant="contained"
                                    color="primary"
                                    disableRipple
                                    className={classNames(
                                      classes.margin,
                                      classes.bootstrapRoot
                                    )}
                                  >
                                    {' '}
                                    Gỡ{' '}
                                  </Button>
                                </CardContent>
                              </Card>
                            </Popover>
                          </div>
                        )}
                      </PopupState>
                    );
                  })}
                </div>

                <hr style={{ clear: 'both' }} />
                <br />
                <div>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={{ ...customStyle.title, clear: 'both' }}
                  >
                    <i className="material-icons" style={customStyle.myFont}>
                      label
                    </i>
                    Nhãn
                  </Typography>

                  {labels.map(lb => {
                    return (
                      <PopupState variant="popover" key={lb.labelColor}>
                        {popupState => (
                          <Fragment>
                            <Button
                              {...bindTrigger(popupState)}
                              key={lb.labelColor}
                              variant="contained"
                              style={{
                                backgroundColor: lb.labelColor,
                                height: 35,
                                minWidth: 70
                              }}
                              className={classes.button}
                            >
                              {lb.labelText}
                            </Button>
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
                                style={{ ...styles.cardContainer, width: 140 }}
                              >
                                <CardContent>
                                  <Typography style={customStyle.title}>
                                    Xóa nhãn này
                                  </Typography>
                                  <Button
                                    onClick={() =>
                                      this.deleteLabel(lb.labelColor)
                                    }
                                    variant="contained"
                                    color="primary"
                                    disableRipple
                                    className={classNames(
                                      classes.margin,
                                      classes.bootstrapRoot
                                    )}
                                  >
                                    {' '}
                                    Đồng ý{' '}
                                  </Button>
                                </CardContent>
                              </Card>
                            </Popover>
                          </Fragment>
                        )}
                      </PopupState>
                    );
                  })}
                </div>

                <hr />
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    {' '}
                    access_time{' '}
                  </i>
                  Deadline: {deadline}
                </Typography>
                <hr />
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    notes
                  </i>
                  Mô tả
                  <i
                    style={customStyle.tiny}
                    onClick={() => this.setState({ isEditDescription: true })}
                    className="material-icons md-18"
                  >
                    edit
                  </i>
                </Typography>

                <Typography gutterBottom>{description}</Typography>

                {formEditDescription}

                <br />
                <hr />
                <div>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={customStyle.title}
                  >
                    <i className="material-icons" style={customStyle.myFont}>
                      add_comment
                    </i>{' '}
                    Thêm bình luận{' '}
                  </Typography>

                  <Textarea
                    placeholder="Viết bình luận"
                    minRows={4}
                    onBlur={this.closeForm}
                    value={commentText}
                    onChange={this.handleInputChange}
                    style={customStyle.textarea}
                    name="commentText"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disableRipple
                    className={classNames(
                      classes.margin,
                      classes.bootstrapRoot
                    )}
                    style={{ margin: 2 }}
                    onClick={this.onClickAddComment}
                  >
                    {' '}
                    Bình luận{' '}
                  </Button>
                </div>
                <hr />
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    comment
                  </i>{' '}
                  Các bình luận{' '}
                </Typography>

                {comments.map(({ content, cardId, _id }) => (
                  <Comment
                    content={content}
                    cardId={cardId}
                    key={_id}
                    _id={_id}
                  />
                ))}
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    history
                  </i>{' '}
                  Hoạt động{' '}
                </Typography>
                {logCards.map(({ action, cardId, _id }) => (
                  <LogCard action={action} cardId={cardId} key={_id} />
                ))}
              </Grid>
              <Grid item xs={3}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <i className="material-icons" style={customStyle.myFont}>
                    {' '}
                    add{' '}
                  </i>{' '}
                  THÊM VÀO THẺ{' '}
                </Typography>

                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={customStyle.title}
                >
                  <hr />
                  <Checkbox
                    checked={archived}
                    name="archived"
                    onChange={this.handleInputChange}
                    value={archived}
                  />
                  Đánh dấu hoàn tất
                </Typography>
                <Button
                  onClick={() => this.showForm('ADD_MEMBER_FORM')}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableRipple
                  className={classNames(classes.margin, classes.bootstrapRoot)}
                >
                  {' '}
                  Thành viên{' '}
                </Button>
                <Button
                  onClick={() => this.showForm('ADD_LABEL_FORM')}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableRipple
                  className={classNames(classes.margin, classes.bootstrapRoot)}
                >
                  {' '}
                  Nhãn{' '}
                </Button>
                <Button
                  onClick={() => this.showForm('ADD_DEADLINE_FORM')}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableRipple
                  className={classNames(classes.margin, classes.bootstrapRoot)}
                >
                  {' '}
                  Deadline{' '}
                </Button>
                <Button
                  onClick={() => this.showForm('MOVE_FORM')}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableRipple
                  className={classNames(classes.margin, classes.bootstrapRoot)}
                >
                  {' '}
                  Di chuyển{' '}
                </Button>
                <Button
                  onClick={() => this.showForm('DELETE_FORM')}
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: 'brown' }}
                  disableRipple
                  className={classNames(classes.margin, classes.bootstrapRoot)}
                >
                  {' '}
                  Xóa thẻ{' '}
                </Button>
                <CustomForm />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CardDetail);
