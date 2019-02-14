import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { Header } from 'react-navigation';
      
import {SocialBar} from './../components/';
import articles from './../data/raw/articles';
import { Button } from 'react-native-elements';
import {FontAwesome} from './../assets/icons';
// import styles from './map/mapstyle';
import { StyleSheet } from "react-native";

import { MapView } from 'expo'; 

class Menu_Screen extends Component {

  static navigationOptions = {
    
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <RkText
        rkType='awesome'
        style={{
          color: tintColor,
          fontSize: 24,
          marginBottom: 0,
        }}>
          {FontAwesome.home}
      </RkText>
    ),                         
  };

constructor(props) {
    super(props);
    this.mapRef = null;

    this.state = {
      latitude: 6.6018,
      longitude: 3.3515,
      error:null,
    };

    setMarkerRef = (ref) => {
  this.marker = ref
}

showCallout = () => {
  this.marker.showCallout()
}
  }   

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

   
  render() {
  
    return (
     <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,       
        }}   
         showsUserLocation={true} 
         followsUserLocation={true} 
         showsTraffic={true}  
      > 
  <MapView.Marker
      coordinate={{   
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }}
      title='your location'
      ref={this.setMarkerRef}
    />

    </MapView>
     

      )
  }  
}


let styles = RkStyleSheet.create(theme => ({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
   mapContainer : {
      width : '100%',
      height : 200
    },   
  map:{
    ...StyleSheet.absoluteFillObject
  },
  calloutView: {
  flexDirection: "row",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 10,
  width: "40%",
  marginLeft: "30%",
  marginRight: "30%",
  marginTop: 20
},
calloutSearch: {
  borderColor: "transparent",
  marginleft: 10,
  width: "90%",
  marginRight: 10,
  height: 40,
  borderWidth: 0.0  
}

}));

 
     
  

export default Menu_Screen;
