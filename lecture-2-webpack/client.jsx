const React = require('react')
const ReactDom = require('react-dom')

const Webpack = require('./Webpack');

ReactDom.render(<Webpack />, document.querySelector('#root'));