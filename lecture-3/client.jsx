const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordReply = require('./WordReply');

const Hot = hot(WordReply)

ReactDom.render(<Hot />, document.querySelector('#root'));