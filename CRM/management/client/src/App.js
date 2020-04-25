import React, { Component } from 'react';
import './App.css';

// Component
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

// Table
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';  // style
import Paper from '@material-ui/core/Paper';  // ?

const styles = theme => ({ // css값마저 객체형태로 전달하네 
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : 'auto'
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
})

// component는 라이브러리로서 생명주기가 있다.
class App extends Component {
  // 고객정보는 고정된 것이 아니라 사용자의 요청에 따라 바뀌는 값이다. 
  state = {
    customers : "",
    completed : 0,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({  // returned 'body' in callApi
        customers : res
      }))
      .catch(err => console.log(err));
  }
 
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({
      completed : completed >= 100 ? 0 : completed + 1
    });
  }

  render() {
    const { classes } = this.props; // ?
    return (
      <div>
        <Paper className = {classes.root}>
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody> 
              { 
                this.state.customers ? this.state.customers.map(c => {
                  return (
                    <Customer 
                      key = {c.id}
                      id = {c.id} 
                      image = {c.image} 
                      name = {c.name} 
                      birthday = {c.birthday} 
                      gender = {c.gender} 
                      job = {c.job}>
                    </Customer>
                  );
                }) : 
                <TableRow>
                  <TableCell colSpan = "6" align = "center">
                    <CircularProgress 
                      className = {classes.progress}
                      variant = "determinate"
                      value = {this.state.completed}
                    />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd/>
      </div>
    )
  }
}

export default withStyles(styles)(App);
 
/*
각각의 컴포넌트가 포함하고 있는 내용을 분리 - 관리, 생산성

react의 오류중 warning인 경우는 동작에는 크게 문제는 없다는 뜻, 그럼 다른 문제가 없는지를 봐야 하는데 network를 한번 살펴보자. 

Component Life Cycle
1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()

when props or state change => shouldComponentUpdate()

react는 상태를 자동으로 감지하기 때문에 개발자는 상태관리만 잘 해주면 된다. 
*/