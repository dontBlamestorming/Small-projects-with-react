import React, { Component, useDebugValue } from 'react';
import './App.css';
import Customer from './components/Customer';
import { silver } from 'color-name';

const customers = [
{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '박상균',
  'birthday' : '961222',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '홍길동',
  'birthday' : '960124',
  'gender' : '남자',
  'job' : '프로그래머'
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '김단아',
  'birthday' : '910419',
  'gender' : '남자',
  'job' : '디자이너'
},
]

class App extends Component {
  render() {
    return (
      <div>
        <Customer
          id = {customers[0].id}
          image = {customers[0].image}
          name = {customers[0].name}
          birthday = {customers[0].birthday}
          gender = {customers[0].gender}
          job = {customers[0].job}
        />
        <Customer
          id = {customers[1].id}
          image = {customers[1].image}
          name = {customers[1].name}
          birthday = {customers[1].birthday}
          gender = {customers[1].gender}
          job = {customers[1].job}
        />
        <Customer
          id = {customers[2].id}
          image = {customers[2].image}
          name = {customers[2].name}
          birthday = {customers[2].birthday}
          gender = {customers[2].gender}
          job = {customers[2].job}
        />
      </div>
    )
  }
}

export default App;

/*ㅁ
각각의 컴포넌트가 포함하고 있는 내용을 분리 - 관리, 생산성
*/