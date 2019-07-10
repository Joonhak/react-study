const React = require('react');
const { useState, useRef } = React;

const WordReply = () => {
  const [word, setWord] = useState('주낙');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const onRef = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      onRef.current.focus();
    } else {
      setResult('땡!');
      setValue('');
      onRef.current.focus();
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor='word-input'>글자를 입력하세요!</label>
        <input id='word-input' ref={onRef} value={value} onChange={onChange} />
        <button className='class-name'>입력!!!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordReply;
