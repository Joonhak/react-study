import React, { Component } from 'react';

// class: constructor => render => ref => componentDidMount
// => ( state / props 바뀔때 ) => shouldComponentUpdate ( return true; ) => render => componentDidUpdate
// 부모가 없앴을 때: componentWillUnmount => 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = imgCoord => Object.entries(rspCoords).find(v => v[1] === imgCoord)[0];

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  componentDidMount() {
    // 처음 랜더링 된 후 실행, 주로 비동기 요청 실행
    console.log('DidMount');
    // const { imgCoord } = this.state; 비동기함수 밖에서 이렇게 작성하면 안된다 !!!
    this.interval = setInterval(this.changeHand, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    // 다시 랜더링 된 후
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 비동기 요청 정리 (?) 완료되지 않은 비동기 요청 정리..
    console.log('clearInterval');
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    }
  };

  onClickBtn = choice => e => {
    // method 안에서 함수를 호출하는 경우 이렇게 쓸 수 있음
    clearInterval(this.interval);
    const { imgCoord } = this.state;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState(prevState => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          result: '졌습니다 ㅠㅠ',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 500);
    }, 1000);
  };

  render() {
    const { result, imgCoord, score } = this.state;
    return (
      <>
        <div
          id='computer'
          style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
        />
        <div>
          <button id='rock' className='btn' onClick={this.onClickBtn('rock')}>
            바위
          </button>
          <button id='scissor' className='btn' onClick={this.onClickBtn('scissor')}>
            가위
          </button>
          <button id='paper' className='btn' onClick={this.onClickBtn('paper')}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;

//                          hooks(useEffct) ↓
//              class ->        ...state
//  componentDidMount
//  componentDidUpdate
//  componentWillUnmount
