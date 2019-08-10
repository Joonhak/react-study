import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import NumberBaseBall from '../lecture-4/NumberBaseBall-class';
import RSP from '../lecture-6/RSP-class';
import Lotto from '../lecture-7/Lotto-class';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/number-baseball'>숫자야구</Link>
        &nbsp;
        <Link to='/rock-scissors-paper'>가위바위보</Link>
        &nbsp;
        <Link to='/lotto-generator'>로또 생성기</Link>
      </div>
      <div>
        <Route path='/number-baseball' component={NumberBaseBall} />
        <Route path='/rock-scissors-paper' component={RSP} />
        <Route path='/lotto-generator' component={Lotto} />
      </div>
    </BrowserRouter>
  );
};

export default Games;
