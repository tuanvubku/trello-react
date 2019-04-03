import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import BasicLayout from '@/layouts/basic';

@connect(({ board }) => ({
  boardName: board.name,
  boardAuthor: board.author
}))
class Home extends React.Component {
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
    dispatch({
      type: 'board/setName',
      payload: {
        name: newBoardName
      }
    });
  };

  render() {
    const { boardAuthor, boardName } = this.props;

    return (
      <BasicLayout>
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
        </div>
      </BasicLayout>
    );
  }
}

export default Home;
