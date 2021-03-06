import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
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
    const { action } = this.props;
    return (
      <Fragment>
        <hr />
        <Avatar style={styles.purpleAvatar}>OP</Avatar>
        <Typography style={styles.username} gutterBottom>
          <span style={{ fontWeight: 'bold' }}>Nguyễn Văn A: </span> {action}{' '}
        </Typography>
      </Fragment>
    );
  }
}

export default LogCard;
