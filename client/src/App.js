import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table:{
    minWidth: 1080
  }
});

class App extends Component {

  state = {
    customers:""
  }

  componentDidMount(){
    this._callApi()
      .then(body => this.setState({customers:body}))
      .catch(err => console.log(err));
  }

  _callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body
  }

  render() {
    const {classes} = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>아이디</TableCell>
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
                key={object.id}
                image={object.image}
                name={object.name}
                birthday={object.birthday}
                gender={object.gender}
                job={object.job}/> 
              );
            }) : "loading"}
          </TableBody>
        </Table>
      </Paper>
    )
  };
};

export default withStyles(styles)(App);
