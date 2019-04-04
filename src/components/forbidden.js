import React from 'react';
import { Link } from 'gatsby';
import Button from '@material-ui/core/Button';

class Forbidden extends React.Component {
  render() {
    return (
      <div>
        <p>403 Forbidden</p>
        <Button variant="contained" color="secondary">
          <Link to="/">To index page</Link>
        </Button>
      </div>
    );
  }
}

export default Forbidden;
