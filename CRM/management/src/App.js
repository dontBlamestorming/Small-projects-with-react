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
        {
          customers.map(customer => {
            return (
              <Customer
                key = {customer.id}
                id = {customer.id}
                image = {customer.image}
                name = {customer.name}
                birthday = {customer.birthday}
                gender = {customer.gender}
                job = {customer.job}
              />
            );
          })
        }
      </div>
    )
  }
}

export default App;

/*ㅁ
각각의 컴포넌트가 포함하고 있는 내용을 분리 - 관리, 생산성
*/