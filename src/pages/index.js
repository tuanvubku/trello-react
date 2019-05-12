import React from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux'; 
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'; 
import Typography from '@material-ui/core/Typography'; 
import { withStyles } from '@material-ui/core/styles';
import Login from '@/pages/auth/login';

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
  fetchStatus: user.status
  // userLoading: loading.effects.user.fetchCurrent
}))
@withStyles(styles)
class Index extends React.Component { 
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch.user.fetchCurrentUser();
  }
  componentWillReceprops(props) {
    const { dispatch } = props; 
    dispatch.user.fetchCurrentUser();
  }
  render() {
    const { fetchStatus, user = {}, role = [], board = [] } = this.props;  
    if (!user && fetchStatus === undefined) return 'Loading...'; 
    const { classes } = this.props;
    return (
      <BasicLayout board={board}></BasicLayout>
    );
  }
}

export default Index;
