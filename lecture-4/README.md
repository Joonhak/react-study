# lecture-4
import와 require, props, Component의 반복 - `map`, class Component에서 화살표 없이 method 만들기
<br />
### 느낀점
* import -> ES6 방식, require -> Node의 방식 (CommonJS)
* import가 더 익숙하기도 하고 사용하기도 더 편한듯
* props는 부모 Component가 전달해주는 `유산`
* state는 render랑 연관되어서 중요하다고 하는데.. props는 왜 중요하다고 하는거지
* 아 그리고 react는 state의 `참조`가 변경되어야 변경되었다고 판단하여 `render()`를 호출한다.
* Component를 여러개 만들어야 할 때에는 `map`을 활용하여 반복시킨다.
* 아직 익숙하지 않을 때에는 이 map 구문들을 Component의 기준으로 삼아서 만들어보면 좋다.
* class Component에서 화살표 함수를 사용하지 않으려면 `constructor`를 작성해야한다.
* 또한 `constructor` 내부에서 `this.onChange = this.onChange.bind(this);`같은 해괴한 코드를 작성해야한다
* ~~그냥 화살표 함수 쓰자~~
* 그리고 기존 state를 method 내부에서 활용해야 할 때에는 함수 방식의 `setState`를 쓰자