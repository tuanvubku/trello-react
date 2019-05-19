import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import dateFormat from 'dateformat';
import deepPurple from '@material-ui/core/colors/deepPurple';
@connect(null)
class LogCard extends React.Component {
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
        margin: '5px 10px 10px 10px',
        color: '#fff',
        backgroundColor: deepPurple[500]
      },
      username: {
        margin: '-40px 0px 0px 55px',
        fontColor: 'brown'
      }
    };
    const { action, imageUrl, username, dateCreated } = this.props;
    return (
      <Fragment>
        <hr />
        <Avatar src={imageUrl} style={styles.purpleAvatar}>
          {username.substring(0, 2)}
        </Avatar>
        <Typography style={styles.username} gutterBottom>
          <span style={{ fontWeight: 'bold' }}>{username} </span> {action}{' '}
        </Typography>
        <Typography align="right">
          {dateFormat(new Date(dateCreated), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
        </Typography>
      </Fragment>
    );
  }
}

export default LogCard;
