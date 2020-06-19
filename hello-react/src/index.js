import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')     // -> public/index.html
);

/*
  ReactDom.render()의 첫번 째 인자로는 페이지에 렌더링할 내용을 JSX 형태로 작성
  두번 째 인자로는 첫번 째 인자를 렌더링할 document 내부요소를 설정
*/
serviceWorker.unregister();
