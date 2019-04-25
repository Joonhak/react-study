import React, { useState, useRef, useEffect } from 'react';
import LifeCycle from './LifeCycle';

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

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find( v => v[1] === imgCoord )[0];
}

// class: constructor => render => ref => componentDidMount 
// => ( state / props 바뀔때 ) => shouldComponentUpdate ( return true; ) => render => componentDidUpdate
// 부모가 없앴을 때: componentWillUnmount => 소멸

// class RSP extends Component {
//     state = {
//         result: '',
//         imgCoord: 0,
//         score: 0,
//     }
//
//     interval;
//
//     componentDidMount() { // 처음 랜더링 된 후 실행, 주로 비동기 요청 실행
//         console.log('DidMount');
//         // const { imgCoord } = this.state; 비동기함수 밖에서 이렇게 작성하면 안된다 !!!
//         this.interval = setInterval(this.changeHand, 500);
//     }
//
//     componentDidUpdate(prevProps, prevState) { // 다시 랜더링 된 후
//      
//     }
//  
//     componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리 (?) 완료되지 않은 비동기 요청 정리..
//         console.log('clearInterval');
//         clearInterval(this.interval);
//     }
//  
//     changeHand = () => {
//         const { imgCoord } = this.state;
//         if (imgCoord === rspCoords.rock) {
//             this.setState({
//                 imgCoord: rspCoords.scissor,
//             });
//         } else if (imgCoord === rspCoords.scissor) {
//             this.setState({
//                 imgCoord: rspCoords.paper,
//             });
//         } else {
//             this.setState({
//                 imgCoord: rspCoords.rock,
//             });
//         }
//     };
//
//     onClickBtn = (choice) => (e) => { // method 안에서 함수를 호출하는 경우 이렇게 쓸 수 있음
//         clearInterval(this.interval);
//         const { imgCoord } = this.state;
//         const myScore = scores[choice];
//         const cpuScore = scores[computerChoice(imgCoord)];
//         const diff = myScore - cpuScore;
//         if ( diff === 0 ) {
//             this.setState({
//                 result: '비겼습니다!',
//             });
//         } else if ([-1, 2].includes(diff)) {
//             this.setState((prevState) => {
//                 return {
//                     result: '이겼습니다!',
//                     score: prevState.score + 1,
//                 };
//             });
//         } else {
//             this.setState((prevState) => {
//                 return {
//                     result: '졌습니다 ㅠㅠ',
//                     score: prevState.score - 1,
//                 };
//             });
//         }
//         setTimeout(() => {
//             this.interval = setInterval(this.changeHand, 500)
//         }, 1000);
//     }
//
//     render() {
//         const { result, imgCoord, score } = this.state
//         return (
//             <>
//                 <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//                 <div>
//                     <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
//                     <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
//                     <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
//                 </div>
//                 <div>{result}</div>
//                 <div>현재 {score}점</div>
//             </>
//         );
//     }
// }
//                          hooks(useEffct) ↓
//              class ->        ...state
//  componentDidMount    
//  componentDidUpdate
//  componentWillUnmount


const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);

    const interval = useRef(null);

    useEffect( () => { // cdm, cdu 역할이 가능 ( 1:1 대응은 아님 )
        interval.current = setInterval(changeHand, 200);
        return () => { // cwu
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

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if ( diff === 0 ) {
            setResult('비겼습니다!');
            
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore( prevScore => {
                return prevScore + 1;
            });
        } else {
            setResult('졌습니다 ㅠㅠ');
            setScore( prevScore => {
                return prevScore - 1;
            });
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 200)
        }, 1000);
    };

    return (
        <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            {
                score < 5 && <LifeCycle />
            }
        </>
    );
};

export default RSP;