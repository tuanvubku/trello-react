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
import AddButton from '@/components/AddButton';

@connect(state => ({}))
class Board extends React.Component {
  render() {
    const styles = {
      boardContainer: {
        display: 'flex',
        flexDirection: 'row'
      }
    };

    // const { title, lists } = this.props;
    const title = 'Board no name';
    const lists = [
      {
        id: 1,
        title: 'List 1',
        cards: [
          {
            id: 1,
            content: 'Ha ha ha'
          },
          {
            id: 2,
            content: 'A ha ha'
          }
        ]
      },
      {
        id: 2,
        title: 'List 2',
        cards: [
          {
            id: 3,
            content: 'Co mot con vit'
          },
          {
            id: 4,
            content: 'Co hai con vit'
          }
        ]
      }
    ];

    return (
      <div>
        <h2>{title}</h2>
        <div style={styles.boardContainer}>
          {lists.map(({ title, cards, id }) => (
            <List title={title} cards={cards} key={id} idList={id} />
          ))}
          <AddButton list />
        </div>
      </div>
    );
  }
}

// board is pass through props,
// by PrivateRoute from Router
const BoardContainer = ({ board }) => (
  <ProtectedView allowedRole={['user', 'admin']}>
    <Board board={board} />
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
