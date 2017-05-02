import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({ album }) => {
  //deconstruct the dataset passed by the parent component
  const { title, artist, thumbnail_image, image, url } = album;
  //deconstruct each style from the styles object at the bottom of the file
  const {
    headerContentStyle,
    thumbnailStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    albumArtworkStyle } = styles;

  return (
    //Organize the information in "Cards" and "Card Sections"
    //look at the imported files to see these components' location
    <Card>
      <CardSection>
      <View style={thumbnailContainerStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: thumbnail_image }}
        />
      </View>
      <View style={headerContentStyle}>
        <Text style={headerTextStyle}>{title}</Text>
        <Text>{artist}</Text>
      </View>
      </CardSection>
      <CardSection>
        <Image
          style={albumArtworkStyle}
          source={{ uri: image }}
        />
      </CardSection>
      <CardSection>
        <Button whenPressed={() => Linking.openURL(url)} >
          Buy Now!
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  albumArtworkStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default AlbumDetail;
