import React from 'react';
import { connect } from 'react-redux';

import TrelloCard from '@/components/Card';
import AddButton from '@/components/AddButton';

@connect(({ card }) => ({
  globalCards: card.cards
}))
class List extends React.Component {
  componentDidMount() {
    const { dispatch, idList, idBoard } = this.props;
    dispatch({
      type: 'card/fetchCardOfListFromBoard',
      payload: {
        boardId: idBoard,
        listId: idList
      }
    });
  }

  render() {
    const styles = {
      container: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 300,
        padding: 8,
        marginRight: 8,
        height: '100%'
      },
      styleHeader: {
        margin: 5,
        marginBottom: 10
      }
    };

    const { title, idList } = this.props;
    const { globalCards } = this.props;
    const cards = globalCards[idList] ? globalCards[idList] : [];

    return (
      <div style={styles.container}>
        <h4 style={styles.styleHeader}>{title}</h4>
        {cards.map(card => (
          <TrelloCard key={card._id} card={card} />
        ))}
        <AddButton idList={idList} />
      </div>
    );
  }
}

export default List;
