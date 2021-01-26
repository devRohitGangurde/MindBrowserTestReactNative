import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground, Text, LogBox } from 'react-native'
import { Actions } from "react-native-router-flux";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    setTimeout(() => {
      Actions.replace("ItemListScreen")    
    }, 2000) 
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white'
        }}>
          <Text style={{fontWeight:"900",fontSize:20}}>
           Mindbrowser React Native Test App
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: "white"
  },
  txtLogin: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    alignSelf: "flex-start",
    color:"black"
},

})