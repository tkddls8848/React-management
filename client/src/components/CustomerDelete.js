import React, { Component } from 'react';

class CustomerDelete extends Component {
    
    deleteCustomer(id) {
        const URL = '/api/customers/' + id;
        fetch(URL, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    };

    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        );
    };

}

export default CustomerDelete