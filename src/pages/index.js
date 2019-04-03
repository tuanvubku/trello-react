import React from 'react';
import { connect } from 'react-redux';

import BasicLayout from '@/layouts/basic';

@connect(({ sample }) => ({
  text: sample
}))
class Home extends React.Component {
  render() {
    const { text } = this.props;

    return (
      <BasicLayout>
        <p>{text}</p>
      </BasicLayout>
    );
  }
}

export default Home;
