import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px',
};

const scores = {
  rock: 0,
  scissor: 1,
  paper: 2,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(v => v[1] === imgCoord)[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);

  const interval = useRef(null);

  useEffect(() => {
    // cdm, cdu 역할이 가능 ( 1:1 대응은 아님 )
    interval.current = setInterval(changeHand, 200);
    return () => {
      // cwu
      clearInterval(interval.current);
    };
  }, [imgCoord]); // closure 문제 해결하기 위한 인수 전달, imgCoord가 변경될 때 마다 실행된다.
  // useEffect를 여러번 사용할 수 있다 (여러 state에 대한 효과를 주고 싶을때!)

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickBtn = choice => () => {
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore(prevScore => {
        return prevScore + 1;
      });
    } else {
      setResult('졌습니다 ㅠㅠ');
      setScore(prevScore => {
        return prevScore - 1;
      });
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 200);
    }, 1000);
  };

  return (
    <>
      <div
        id='computer'
        style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      />
      <div>
        <button id='rock' className='btn' onClick={onClickBtn('rock')}>
          바위
        </button>
        <button id='scissor' className='btn' onClick={onClickBtn('scissor')}>
          가위
        </button>
        <button id='paper' className='btn' onClick={onClickBtn('paper')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
