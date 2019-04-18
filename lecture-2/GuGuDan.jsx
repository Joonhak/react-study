const React = require('react');
// functional component
// 단점: render 시 함수 자체가 다시 실행된다.
const GuGuDan = () => {
    // state 
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    const inputRef = React.useRef(null);
    
    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
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

    }

    return (
        // class, label - for 사용 불가
        // className, htmlFor 로 교체 사용해야함
        <React.Fragment>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} onChange={onChange} value={value}/>
                <button type="submit">입력!</button>
            </form>
            <div>{result}</div>
        </React.Fragment>
    )
}

module.exports = GuGuDan;