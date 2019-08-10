import React, { Component } from 'react';

import NumberBaseBall from '../lecture-4/NumberBaseBall-class';
import RSP from '../lecture-6/RSP-class';
import Lotto from '../lecture-7/Lotto-class';

export default class GameMatcher extends Component {
  render() {
    const urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('query'));
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseBall />;
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />;
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />;
    } else {
      return <div>일치하는 게임이 없습니다.</div>;
    }
  }
}
