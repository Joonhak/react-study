import React, { useState } from 'react';
import Try from './Try';

function getNumbers() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    result.push(randomNumber);
  }
  console.log(result); // Hooks는 render가 호출될 때 전체 코드를 호출한다!! < - > class Component는 render() 만 실행
  return result;
}

const NumberBaseBall = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmit = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('정답!');
      setTries(prevTries => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('정답입니다! 게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`실패!! 답은 ${answer.join(',')}(이)었습니다!`);
        alert('실패... 게임을 다시 시작합니다.');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }

        setValue('');
        setTries(prevTries => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }];
        });
      }
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength={4} value={value} onChange={onChange} />
      </form>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i}차 시도`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseBall;
