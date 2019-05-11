import React from 'react';
import { connect } from 'react-redux';
// import { navigate } from 'gatsby';
import { Router } from '@reach/router';

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import PrivateRoute from '@/components/PrivateRoute';
import ProtectedView from '@/components/ProtectedView';
import BasicLayout from '@/layouts/basic';

import List from '@/components/List';
import CardDetail from '@/components/CardDetail';
import AddButton from '@/components/AddButton';

@connect(({ board, list }) => ({
  boardInfo: board.boardInfo,
  lists: list.lists
}))
class Board extends React.Component {
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

  render() {
    const styles = {
      boardContainer: {
        display: 'flex',
        flexDirection: 'row'
      }
    };

    const { boardInfo = {}, lists = [] } = this.props;
    const { name: title = '', _id: boardId } = boardInfo;

    // console.log(lists);
    return (
      <div>
        <h2>{title}</h2>
        <div style={styles.boardContainer}>
          {lists.map(({ name, cards, _id }) => (
            <List
              title={name}
              cards={cards}
              key={_id}
              idList={_id}
              idBoard={boardId}
            />
          ))}
          <AddButton list />
          <CardDetail />
        </div>
      </div>
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
