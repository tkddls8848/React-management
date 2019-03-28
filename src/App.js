import React, { Component } from 'react'
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {withStyles} from '@material-ui/core/styles'

const styles = (theme) => ({
  root:{
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table:{
    minWidth: 1080
  }
})

const customer=[{
    id:'1',
    image:'data:image/jpeg;base64,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',
    name:'박상인',
    birthday:'123456',
    gender:'남자',
    job:'무직'
  },
  {
    id:'2',
    image:'data:image/jpeg;base64,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',
    name:'박상인',
    birthday:'23456',
    gender:'남자',
    job:'무직'
  }
]

class App extends Component {
  render() {
    const {classes} = this.props
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
            {customer.map((object) => {
              return(
                <Customer
                key={object.id}
                image={object.image}
                name={object.name}
                birthday={object.birthday}
                gender={object.gender}
                job={object.job}/> 
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
    
  }
}

export default withStyles(styles)(App);
