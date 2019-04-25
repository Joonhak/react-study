import React, { PureComponent, useState, memo, useRef } from 'react';

// class ResponseCheck extends PureComponent {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요!',
//         result: [],
//     };

//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = (e) => {
//         const { state } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요!'
//             });
//             this.timeout = setTimeout( () => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭!',
//                 });
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000) + 2000);
//         } else if (state === 'ready') {
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하셨어요!',
//             });
//             clearTimeout(this.timeout);
//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요!',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 }
//             });
//         }
//     };

//     onReset = (e) => {
//         this.setState({
//             result: [],
//         });
//     }

//     renderAverage = () => {
//         const { result } = this.state;
//         return (
//             result.length === 0 ? null :
//             <div>
//                 <div>평균시간: {result.reduce((a, c) => {return (a + c) / result.length;})}ms</div>
//                 <button onClick={this.onReset}>RESET</button>
//             </div>
//         );
//     }

//     render() {
//         const { state, message } = this.state;
//         return (
//             <>
//                 <div id="screen" className={state} onClick={this.onClickScreen}>
//                     {message}
//                 </div>
//                 {this.renderAverage()}
//             </>
//         );
//     }
// }

const ResponseCheck = memo(() => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요!');
    const [result, setResult] = useState([]);

    const timeout = useRef();
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = (e) => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요!')
            
            timeout.current = setTimeout( () => {
                setState('now');
                setMessage('지금 클릭!');
                
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
            
        } else if (state === 'ready') {
            setState('waiting');
            setMessage('너무 성급하셨어요!')
            
            clearTimeout(timeout.current);

        } else if (state === 'now') {
            endTime.current = new Date();
            console.log(startTime);
            console.log(endTime);
            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult( prevResult => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (
            result.length ? 
                <div>
                    <div>평균시간: {result.reduce((a, c) => {return (a + c) / result.length;})}ms</div>
                    <button onClick={onReset}>RESET</button>
                </div>
                : null
        );
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    );
});

export default ResponseCheck;