import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 500);
    }
    setTimeout(() => {
      this.setState({
        bonus: this.state.winNumbers[6],
        redo: true,
      });
    }, 3500);
  };

  componentDidMount() {
    console.log('Did mount');
    this.runTimeouts();
  }

  componentWillUnmount() {
    console.log('will unmount');
    this.timeouts.forEach(t => {
      clearTimeout(t);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.winBalls.length) {
      console.log('Did update');
      this.runTimeouts();
    }
  }

  onClick = e => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id='result'>
          {winBalls.map(w => (
            <Ball key={w} number={w} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        <button onClick={redo ? this.onClick : () => {}}>한번 더!</button>
      </>
    );
  }
}

export default Lotto;
