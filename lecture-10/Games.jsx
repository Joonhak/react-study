import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/game/index?query=query'>게임매쳐</Link>
        &nbsp;
        <Link to='/game/number-baseball'>숫자야구</Link>
        &nbsp;
        <Link to='/game/rock-scissors-paper'>가위바위보</Link>
        &nbsp;
        <Link to='/game/lotto-generator'>로또 생성기</Link>
      </div>
      <div>
        <Switch>
          <Route exact path='/' render={props => <GameMatcher {...props} />} />
          <Route path='/game/:name' render={props => <GameMatcher {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
