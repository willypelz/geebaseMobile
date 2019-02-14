import React from 'react';
import {
  Image,
  View,
  Dimensions
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from './../../utils/scale';


export class Walkthrough2 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {


    /*
    let image = RkTheme.current.name === 'light'
      ? <Image source={require('../../assets/images/kittenImage.png')}/>
      : <Image source={require('../../assets/images/kittenImageDark.png')}/>;
    */
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height;
    let width = Dimensions.get('window').width;
    let height_sub = height/2;
    let width_sub = width - 40;

    image = <Image style={[styles.image, {height, width}]} source={require('../../assets/images/welcome/intro_two.jpg')}/> ;
    return (
      <View style={styles.screen}>
        {image} 
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  }
 }));
