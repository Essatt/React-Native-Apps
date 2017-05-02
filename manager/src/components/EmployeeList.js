import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    console.log('component will mount');
    console.log(this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component
    //will be rendered with
    //this.props is still the old set of props
    console.log('componentWillMount');
    console.log('old props');
    console.log(this.props);
    console.log('new props');
    console.log(nextProps);
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    console.log('createSource');
    console.log(this.props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    //Problem is that cloneWithRows expects array of objects
    //employees is just an object. We use lodash library to component
    //with this
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    console.log('render');
    console.log(this.props);
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const maptStateToProps = state => {
  //what this does is to map(loop) the employees object in state
  //taking their values (shift, name, phone) and the user key (uid)
  //and return them as an array.
  //it will return { shift: 'Monday', phone: '555-5555', name: 'Alex'}
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  console.log(employees);
  return { employees };
};

export default connect(maptStateToProps, { employeesFetch })(EmployeeList);
