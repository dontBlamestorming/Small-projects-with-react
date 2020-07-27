// Promise 기반 웹 클라이언트인 axios
// API 각각 함수화 시키면 나중에 가독성과 유지보수성이 좋다.

/*
포스트 읽기 (id : 1 ~ 100 숫자)
GET https://jsonplaceholder.typicode.com/posts/:id

모든 사용자 불러오기
GET https://jsonplaceholder.typicode.com/users
*/

import axios from "axios";

export const getPost = id =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = id =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);
