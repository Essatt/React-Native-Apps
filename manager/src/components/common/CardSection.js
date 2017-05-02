import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    //These barckets say: "Use the containerStyle, but if something
    //is being passed down,use that style instead"
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'

  }
};

export { CardSection };
