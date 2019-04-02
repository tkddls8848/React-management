import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table:{
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit *2
  }
});

class App extends Component {

  state = {
    customers:"",
    completed: 0
  }

  componentDidMount(){
    this.timer = setInterval(this._progress, 20);
    this._callApi()
      .then(body => this.setState({customers:body}))
      .catch(err => console.log(err));
  }

  _callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body
  }

  _progress = () =>{
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const {classes} = this.props;
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.table}>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map((object) => {
                return(
                  <Customer
                  id={object.id}
                  key={object.id}
                  image={object.image}
                  name={object.name}
                  birthday={object.birthday}
                  gender={object.gender}
                  job={object.job}/> 
                );
              })
              : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes._progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd></CustomerAdd>
      </div>

    )
  };
};

export default withStyles(styles)(App);
