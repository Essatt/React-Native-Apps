import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';

import { connect } from 'react-redux';
import { CardSection } from './common';
//this allows you to get all the action creators
//from the file rather than only one
import * as actions from '../actions';


class ListItem extends Component {
  //when the view changes (expanded/not expanded) animate the changes
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  //render the description only if the item is expanded
  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.textStyle}>
            {library.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library;

    //if pressed on the item, make that the selecteed item in state
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  textStyle: {
    flex: 1,
    paddingLeft: 15
  }
};

/*first argument is explicitly reserved for mapStateToProps
we put in null if we dont need mapStateToProps function but need to put in
the second argument which are the action creators.

This function will make sure the return of our action creators
will be dispatched to the redux store. It will also passes all the
actions to our component as props.
*/
//ownProps allows us to access the component's props in this function
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
