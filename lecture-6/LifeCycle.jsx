import React, { PureComponent } from 'react';

class LifeCycle extends PureComponent {
  constructor(props) {
    super(props);
    console.log('LifeCycle.constructor');
    this.state = {
      number: 0,
    };
  }

  onRef = c => {
    console.log('On Ref');
    this.input = c;
  };

  onChange = e => {
    console.log('On Change Input');
  };

  componentWillMount() {
    console.log('Will Mount (deprecated)');
  }

  componentDidMount() {
    console.log('Did Mount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('Should Update');
  //     return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('Will Update');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Did Update');
  }

  componentWillUnmount() {
    console.log('Will Unmout');
  }

  handleClick = isPlus => e => {
    console.log(e.target);
    if (isPlus)
      this.setState(prevState => {
        return { number: prevState.number + 1 };
      });
    else
      this.setState(prevState => {
        return { number: prevState.number - 1 };
      });
  };

  render() {
    console.log('Render');
    const { number } = this.state;
    return (
      <>
        <input type='text' value={number} onChange={this.onChange} ref={this.onRef} />
        <button onClick={this.handleClick(true)}>+</button>
        <button onClick={this.handleClick(false)}>-</button>
      </>
    );
  }
}

export default LifeCycle;
