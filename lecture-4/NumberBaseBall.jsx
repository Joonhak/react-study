import React, { Component } from 'react';
import Try from './Try';

function getNumbers() {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    for (let i = 0; i < 4; i ++) {
        const randomNumber = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        result.push(randomNumber);
    }
    console.log(result);
    return result;
}

class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '정답!',
                    // 리액트는 참조가 변경되어야 스테이트가 변경되었다고 판단한다.
                    tries: [...prevState.tries, { try: this.state.value, result: '홈런!'}],
                }
            });
            alert('정답입니다! 게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else {
            const answerArray = this.state.value.split('').map( v => parseInt(v) );
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `실패!! 답은 ${this.state.answer.join(',')}(이)었습니다!`
                });
                alert('실패... 게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) =>{
                    return {
                        value: '',
                        tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]
                    };
                });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmit}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChange}/>
                    <button type="submit">입력</button>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {
                        this.state.tries.map( (v, i) => {
                            return (
                                <Try key={`${i + 1}차 시도:`} tryInfo={v}/>
                            );
                        })
                    }
                </ul>
            </>
        )
    }
}

export default NumberBaseBall;