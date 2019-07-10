import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  // 함수 실행한 `결과`가 저장된다. 두번째 배열의 인자가 변하는 시점에 다시 실행된다.
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect - function');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevWinBalls => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 500);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 3500);
    return () => {
      console.log('useEffect - return');
      timeouts.current.forEach(t => {
        clearTimeout(t);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount랑 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행 ( return에서 componentDidUpdate )

  const onClick = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  }, []); // 빈 배열이면 `함수`를 저장한다.
  // 배열안의 요소가 변해야 함수가 새로 생성된다.
  // 자식 component에 props로 함수를 전달할 때에는 꼭 useCallback()을 써야한다!

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
      <button onClick={redo ? onClick : () => {}}>한번 더!</button>
    </>
  );
};

export default Lotto;
