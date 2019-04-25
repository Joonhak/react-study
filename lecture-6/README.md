# lecture-6
useRef, `return`안에서 조건문과 반복문, 가위바위보, `life cycle`
<br />
### 느낀점
* hooks에서 `useRef()`는 변경되어도 다시 render되지 않길 원하는 데이터들을 위해 사용한다.
* `return`문 안에서 조건문 또는 반복문을 사용하려면 즉시실행함수를 활용해서 ~~사용하지 말자.~~
* React Component의 life cycle..
  * constructor ( class component )
  * render()
  * ref 실행
  * componentDidMount()
  * --- 첫 render 끝 ---
  * componentShouldUpdate()
  * componentWillUpdate()
  * render()
  * componentDidUpdate()
  * --- update 끝 ---
  * componentWillUnmount() 
  * => 컴포넌트 사라질 때, `setInterval()`등의 작업을 중지(정리) 해야한다.