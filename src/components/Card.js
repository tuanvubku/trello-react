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

    const { content } = this.props;
    return (
      <Card style={styles.cardContainer}>
        <CardContent>
          <Typography gutterBottom>{content}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default TrelloCard;
