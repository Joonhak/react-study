# lecture-10
react router
<br />
### 느낀점
* React의 router는 눈속임이다.
  - URL을 변경하지만, 실제로 페이지를 이동하는것이 아니라 Route에 작성된 컴포넌트를 가져온다.
  - 증거로 새로고침시 에러 발생
* Route
  - React Router와 연결된 Component에는 `props.history, props.location, props.match`가 들어있다.
  - React Router와 연결되지 않은 Component를 사용하는 경우에는  
  `react-router-dom/withRouter`로 감싸면 props들을 사용할 수 있다.
  - Route의 Component속성보다는 render속성을 사용해서 component를 선택해라 (props등을 전달해줄 수 있기 때문)
  - 일치하는 Route하나에서만 render하고싶다면 Route를 Switch로 감싸라
  - `/`와 같은 범용적인(?) 앞부분이 겹칠 수 있는 URL을 사용할 때에는 `exact` 속성을 활용해라!
* BrowserRouter
  - Server설정 시 검색엔진 봇에게 적절한 데이터를 전달해줄 수 있다.
  - Browser의 URL을 조작하고 작성한 컴포넌트를 보여주도록 만든다.
* HashRouter
  - URL 중간에 `/#/`가 붙는다.
  - `/#/`뒤의 정보가 Server에 전달되지 않기 때문에 검색엔진에 노출되지 않는다.
  - 따로 설정하지 않아도 새로고침 시 원하는 페이지를 보여줄 수 있다.
* QueryString
  - 주소에 `?key=value`의 형태로 데이터를 전달할 수 있다.
  - 이 데이터는 server에도 전달할 수 있다.
  - 하지만 react-router에서 기본적으로 제공해주는 api로는 사용할 수 없고  
  `new URLSearchParams(this.props.location.search.slice(1))`이런 방식을 통해 활용해야한다.