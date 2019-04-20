# lecture-2
React Hooks 학습 및 ref 학습
<br />
### 느낀점
* 구조분해할당 신기해
* this 안붙이는거 편하당
* 근데 focus같은 이벤트 사용하려면 무조건 ref를 사용해야하는건가?
* react hooks 편하긴 한거같은데 state가 많아지면..?

### 과제 - 1
* webpack 설정으로 변경해보기

### 수행 - 1
* 원래 [HTML](../lecture-1/GuGuDan.html)로 되어있었는데 webpack 설정해서 바꿔봄
* `React.useState, React.useRef`도 줄일 수 있을것 같아서 해봤는데 된다!
* 강의에서 배운 설정들은 boilerplate로 따로 가지고 있어야지

### 과제 - 2
* react-hot-loader와 webpack-dev-server 적용해보기

### 수행 - 2
* `npm i react-hot-loader webpack-dev-server`로 모듈 추가
* `package.json`의 dev script를 `'scripts': { 'dev': 'webpack-dev-server --hot' }`로 변경
* `webpack.config.js`의 `output`에 `publicPath: '/dist'` 추가
* `client.jsx`에서 코드 수정