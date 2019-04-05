import React from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PrivateRoute from '@/components/PrivateRoute';
import ProtectedView from '@/components/ProtectedView';
import BasicLayout from '@/layouts/basic';

@connect(({ board, loading }) => ({
  boardName: board.name,
  boardAuthor: board.author,
  loading: loading.models.board
}))
class Board extends React.Component {
  state = {
    newBoardName: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const { newBoardName } = this.state;
    dispatch.board.changeBoardName({
      name: newBoardName
    });
  };

  toIndex = () => {
    navigate('/');
  };

  componentDidMount() {
    const { dispatch, board } = this.props;
    dispatch.board.fetchBoard({
      name: board
    });
  }

  render() {
    const { boardAuthor, boardName, loading } = this.props;
    console.log(loading);
    if (loading) {
      return 'Loading';
    }

    return (
      <div>
        <p>Current board name: {boardName}</p>
        <p>Board author: {boardAuthor}</p>
        <TextField
          id="outlined-name"
          label="Name"
          value={this.state.newBoardName}
          onChange={this.handleChange('newBoardName')}
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          Change name
        </Button>
        <Button variant="contained" color="primary" onClick={this.toIndex}>
          To index
        </Button>
      </div>
    );
  }
}

// board is pass through props,
// by PrivateRoute from Router
const BoardContainer = ({ board }) => (
  <ProtectedView allowedRole={['admin']}>
    <Board board={board} />
  </ProtectedView>
);

export default () => (
  <BasicLayout>
    <Router>
      <PrivateRoute path="/board/:board" component={BoardContainer} />
    </Router>
  </BasicLayout>
);
