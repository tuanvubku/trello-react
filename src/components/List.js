import React from 'react';

import TrelloCard from '@/components/Card';
import AddButton from '@/components/AddButton';

class List extends React.Component {
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

    const { title, cards, idList } = this.props;
    return (
      <div style={styles.container}>
        <h4 style={styles.styleHeader}>{title}</h4>
        {cards.map(card => (
          <TrelloCard key={card.id} content={card.content} />
        ))}

        <AddButton idList={idList} />
      </div>
    );
  }
}

export default List;
