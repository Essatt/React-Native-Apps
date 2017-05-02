import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './ListItem';

class LibraryList extends Component {

  //create the data source of the list of techniologies
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.dataToShow);
    //ends
  }

  //render each item of the list
  renderRow(library) {
    return <ListItem library={library} />;
  }

  //render the list
  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

//This is a function to communicate with redux state
const mapStateToProps = state => {
  return { dataToShow: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);
