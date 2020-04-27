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

// Appbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({ // css값마저 객체형태로 전달하네 
  root : {
    width : '100%',
    minWidth : 1080
  },
  paper : {
    marginLeft : 18,
    marginRight : 18
  },
  progress : {
    margin : theme.spacing.unit * 2
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

// component는 라이브러리로서 생명주기가 있다.
class App extends Component {
  // 고객정보는 고정된 것이 아니라 사용자의 요청에 따라 바뀌는 값이다. 
  constructor(props){
    super(props);
    this.state = {
      customers : '',
      completed : 0,
      searchKeyword : ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers : '',
      completed : 0,
      searchKeyword : ''
    });

    this.callApi()
      .then(res => this.setState({
        customers : res
      }))
      .catch(err => console.log(err));
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {

    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer 
          stateRefresh = {this.stateRefresh} 
          key = {c.id} 
          id = {c.id} 
          image = {c.image} 
          name = {c.name} 
          birthday = {c.birthday}
          gender = {c.gender}
          job = {c.job}/>
      })
    }
    const { classes } = this.props; // ?
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];

    return (
      <div className = {classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className = {classes.menu}>
          <CustomerAdd stateRefresh = {this.stateRefresh}/>
        </div>
        <Paper className = {classes.paper}>
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className = {classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody> 
              { 
                this.state.customers ? filteredComponents(this.state.customers) : 
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