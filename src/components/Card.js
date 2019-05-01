import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

class TrelloCard extends React.Component {
  render() {
    const styles = {
      cardContainer: {
        marginBottom: 8
      }
    };

    const { card } = this.props;
    const { description } = card;
    return (
      <Card style={styles.cardContainer}>
        <CardContent>
          <Typography gutterBottom>{description}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default TrelloCard;
