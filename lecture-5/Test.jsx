import React, { Component } from 'react';
// PureComponent: shouldComponentUpdate가 구현되어있는 Component?
// Object or Array는 참조가 변경되어야 탐지할 수 있다!

class RenderTest extends Component {
  state = {
    counter: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({}); // setState만 호출해도 render가 실행된다.
  };

  render() {
    console.log('랜더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

export default RenderTest;
