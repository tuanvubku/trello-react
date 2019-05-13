import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

@connect(null)
class TrelloCard extends React.Component {
  onClick = e => {
    var { dispatch, card } = this.props;
    dispatch({
      type: 'card/getCardRequest', // toggle modal detail card
      payload: { _id: card._id }
    });
    dispatch({
      type: 'logCard/fetchLogOfCard',
      payload: { cardId: card._id }
    });
    dispatch({
      type: 'comment/fetchCommentOfCard',
      payload: { cardId: card._id }
    });
  };
  render() {
    const styles = {
      cardContainer: {
        marginBottom: 8
      },
      title: {
        color: 'brown',
        fontSize: 18,
        fontWeight: 'bold'
      },
      margin: {
        margin: 2,
        marginRight: 3
      }
    };

    const { card, index } = this.props;
    const {
      title = '',
      members = [],
      comments = [],
      labels = [],
      archived = false,
      order
    } = card;
    return (
      <Draggable draggableId={String(card._id)} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card style={styles.cardContainer} onClick={this.onClick}>
              <CardContent>
                <Typography gutterBottom style={styles.title}>
                  {order}
                  {'. '}
                  {title}
                  {archived ? (
                    <i className="material-icons" style={{ fontSize: 20 }}>
                      {' '}
                      done{' '}
                    </i>
                  ) : null}
                </Typography>

                <Typography gutterBottom>
                  <i className="material-icons" style={{ fontSize: 20 }}>
                    {' '}
                    person_outline{' '}
                  </i>{' '}
                  {members.length}{' '}
                  <i className="material-icons" style={{ fontSize: 20 }}>
                    {' '}
                    chat_bubble_outline{' '}
                  </i>{' '}
                  {comments.length}
                </Typography>
                {labels.map(lb => {
                  return (
                    <Button
                      key={lb.labelColor}
                      style={{ backgroundColor: lb.labelColor, width: 10 }}
                    >
                      {' '}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

export default TrelloCard;
