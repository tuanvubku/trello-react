import React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import BasicLayout from '@/layouts/basic';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140,
    objectFit: 'cover'
  }
};

@connect(({ loading, user }) => ({
  user: user.user,
  role: user.role,
  board: user.board,
  userLoading: loading.effects.user.fetchCurrent
}))
@withStyles(styles)
class Index extends React.Component {
  onSubmit = boardId => {
    navigate(`/board/${boardId}`);
  };

  toLogin = () => {
    navigate(`/auth/login`);
  };

  toLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/logout',
      payload: {}
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch.user.fetchCurrentUser();
    dispatch.user.fetchUserBoard();
    // dispatch({
    //   type: 'user/fetchCurrent',
    //   payload: {}
    // });
  }

  render() {
    const { userLoading, user = {}, role = [], board = [] } = this.props;
    let userInfo;

    if (userLoading) return 'Loading...';

    if (user.username) {
      userInfo = (
        <div>
          <p>Ten {user.username}</p>
          <p>role: {role}</p>
          <Button variant="contained" color="primary" onClick={this.toLogout}>
            Logout
          </Button>
        </div>
      );
    } else {
      userInfo = (
        <Button variant="contained" color="primary" onClick={this.toLogin}>
          To Login
        </Button>
      );
    }

    console.log(board);
    const { classes } = this.props;
    return (
      <BasicLayout>
        {userInfo}
        {board.map(
          ({
            _id,
            background,
            dateCreated,
            list,
            member,
            name,
            modelView,
            ownerId
          }) => (
            <Card key={_id} className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={name}
                  src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  // src={background}
                  title={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography component="p">
                    Member: {member.map(m => `${m} `)}
                  </Typography>
                  <Typography component="p">{dateCreated}</Typography>
                  <Typography component="p">{modelView}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  {ownerId === user._id ? 'Setting' : 'Not owner'}
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.onSubmit(_id)}
                >
                  {'Go in'}
                </Button>
              </CardActions>
            </Card>
          )
        )}
      </BasicLayout>
    );
  }
}

export default Index;
