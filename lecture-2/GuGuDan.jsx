const React = require('react');
const { useState, useRef } = React;
// functional component
// 단점: render 시 함수 자체가 다시 실행된다.
const GuGuDan = () => {
  // state
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(value + ' 정답!');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡!');
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    // class, label - for 사용 불가
    // className, htmlFor 로 교체 사용해야함
    <>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} onChange={onChange} value={value} />
        <button type='submit'>입력!!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
