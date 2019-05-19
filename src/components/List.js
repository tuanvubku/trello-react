import React from 'react';
import { connect } from 'react-redux';

import TrelloCard from '@/components/Card';
import AddButton from '@/components/AddButton';
import { Droppable } from 'react-beautiful-dnd';

@connect(({ card }) => ({
  globalCards: card.cards
}))
class TrelloList extends React.Component {
  state = {
    globalCards: []
  };

  componentWillReceiveProps(props) {
    this.setState({ globalCards: props.globalCards });
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
    const { globalCards } = this.state;
    const cards = globalCards[idList] ? globalCards[idList] : [];
    cards.sort((x, y) => (x.order > y.order ? 1 : -1));

    return (
      <Droppable droppableId={String(idList)}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={styles.container}
          >
            <h4 style={styles.styleHeader}>{title}</h4>
            {cards.map((card, index) => (
              <TrelloCard key={card._id} card={card} index={index} />
            ))}
            <AddButton idList={idList} />
          </div>
        )}
      </Droppable>
    );
  }
}

export default TrelloList;
