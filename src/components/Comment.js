import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Textarea from 'react-textarea-autosize';
import Button from '@material-ui/core/Button';

@connect(({ user, card }) => ({
  currentUser: user.user,
  currentCard: card.currentCard
}))
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '', isEdit: false };
  }
  edit = e => {
    this.setState({
      isEdit: true,
      content: this.props.content
    });
  };
  onSave = e => {
    var { _id, currentUser, dispatch, currentCard } = this.props;
    var { content } = this.state;
    var body = { _id, content, idUserEdit: currentUser._id };
    this.setState({ isEdit: false });
    dispatch({
      type: 'comment/editCommentRequest',
      payload: { body }
    });
    dispatch({
      type: 'comment/fetchCommentOfCard',
      payload: { cardId: currentCard._id }
    });
  };
  handleInputChange = e => {
    this.setState({
      content: e.target.value
    });
  };
  render() {
    const styles = {
      avatar: {
        margin: 10
      },
      cardContainer: {
        marginBottom: 8
      },
      orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500]
      },
      purpleAvatar: {
        margin: 10,
        color: '#fff',
        float: 'left',
        backgroundColor: deepPurple[500]
      },
      username: {
        display: 'inline-block',
        fontColor: 'brown',
        fontWeight: 'bold'
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
        float: 'right',
        margin: '0px -10px 3px 0px'
      }
    };

    const { content } = this.props;
    const { isEdit } = this.state;
    var body = isEdit ? (
      <div>
        <Textarea
          autoFocus
          value={this.state.content}
          minRows={2}
          onChange={this.handleInputChange}
          style={{ ...styles.textarea, border: '1px solid blue' }}
          name={content}
        />
        <Button
          onClick={this.onSave}
          variant="contained"
          color="primary"
          disableRipple
          style={{ ...styles.margin, ...styles.bootstrapRoot }}
        >
          {' '}
          Lưu{' '}
        </Button>
      </div>
    ) : (
      <div>
        <Typography gutterBottom>{content}</Typography>
        <a style={{ float: 'right' }} onClick={this.edit}>
          <i className="material-icons md-18">edit</i>
        </a>
      </div>
    );

    return (
      <Fragment>
        <Avatar style={styles.purpleAvatar}>OP</Avatar>
        <Typography style={styles.username} gutterBottom>
          Nguyễn Văn A
        </Typography>
        <Card style={styles.cardContainer} onClick={this.onClick}>
          <CardContent>{body}</CardContent>
        </Card>
        <hr />
      </Fragment>
    );
  }
}

export default Comment;
