import React, { Component, useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList, TextInput, Button, Alert } from 'react-native'
import { Actions } from "react-native-router-flux";
import { db } from '../config.js';
import CheckBox from 'react-native-check-box';


export default class ItemListScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemArray: [],
      itemArrayTemp: [],
      searchTvShowString: '',
      favArray: []
    }

  }

  _openDetailScreen = (item) => {
    Actions.push("ItemDetailScreen", { itemData: item })
  }

  async componentDidMount() {
    // webservice call in this functions
    this._getItemListFromServer()
  }

  onPress(itemId) {
    if(this.state.favArray.length<5){
      this.addToFavrate(itemId)
    }else{
      Alert.alert('Error!', 'Only Maximum 5 Item allowed');
    }
  }
  
  // add item to fav in to firebase
  addToFavrate(itemId) {
    db.ref('/favorite').push({
      id: itemId,
      isFav: true,
    });

    this.state.favArray.push(itemId)
    Alert.alert('Wow!', 'Item added as a favourite in firebase');
    console.log(this.state.favArray)
  }

  _getItemListFromServer = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    //Fetch method use to call webservice Base Url 
    fetch("http://api.giphy.com/v1/gifs/trending?api_key=V0hqVgBEUDsobPzMA5zmxuL13IvJiHGJ", requestOptions)
      .then(response => response.json())
      .then(result => {
        // Store data in arraylist
        this.setState({ itemArray: result.data, itemArrayTemp: result.data })
      })
      .catch(error => {
        console.log('webservice error ', error)
      });
  }

  // Toolbar title functions
  _renderToolbarTitle = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.loginTitleStyle}>
          <Text style={{
            fontSize: 18,
            padding: 5,
            margin: 10,
            alignSelf: "flex-start",
            color: "white",
          }}>{"Item List "}</Text>
        </View>
      </View>
    )
  }

  _renderToolbar = () => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: "#FF8F0F" }}>
        {this._renderToolbarTitle()}
      </View>
    )
  }
  onCheck = () => {
    //alert("d")
  }

  // render flat list item
  _renderItem = (item) => {

    return (
      <View
        style={{
          marginTop: 20,
          borderRadius: 5,
          backgroundColor: "white",
          elevation: 2,
          flexDirection: "column"
        }}
      >
        <TouchableOpacity onPress={() => this._openDetailScreen(item)} style={{ padding: 4 }}>
          <View style={{ flex: 1, flexDirection: "row", padding: 6 }}>
            <View style={{
              justifyContent: 'center'
            }}>
              {item.images ?
                <Image
                  style={{
                    width: 90,
                    height: 100,
                    resizeMode: "cover"
                  }}
                  resizeMode='contain'
                  source={{
                    uri: item.images.original.url,
                  }}
                />
                : null}

            </View>
            <View style={{ flex: 1, flexDirection: "column", marginStart: 8, justifyContent: "center" }}>

              <Text style={{
                fontSize: 18,
                alignSelf: "flex-start",
                color: "green",
              }}>{item.title.toUpperCase()}</Text>

              <Text style={{
                fontSize: 16,
                marginTop: 6,
                alignSelf: "flex-start",
                color: "#5B5A5A",
              }}>{"Type : " + item.type}</Text>
              <Text style={{
                fontSize: 16,
                marginTop: 6,
                alignSelf: "flex-start",
                color: "#5B5A5A",
              }}>{"Username : " + item.username}</Text>

            </View>
          </View>
          <View style={{
            padding: 6,
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "white"
          }}>
            <Button
              onPress={() => this.onPress(item.id)}
              title="Add To fav"
              color="#841584"
              accessibilityLabel="Add To fav"
            />

            <Text style={{
              fontSize: 14,
              padding: 6,
              alignSelf: "flex-start",
              color: "green",
            }}>{item.import_datetime}</Text>

          </View>
        </TouchableOpacity>

      </View>

    )
  }

  // On edit text key press search item title
  handleSearchInput = (searchText) => {
    this.setState({ searchTvShowString: searchText.toLowerCase() })
    this.setState({ itemArray: this.state.itemArrayTemp });

    let filteredData = this.state.itemArray.filter(function (item) {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
    });

    console.log(filteredData)

    //   alert(searchText)

    if (!searchText || searchText === '') {
      this.setState({ itemArray: this.state.itemArrayTemp });
    } else {
      this.setState({ itemArray: filteredData });
    }

  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderToolbar()}
        <View style={{ flex: 1, margin: 15, borderRadius: 10, flexDirection: "column" }}>

          <View style={{ flexDirection: "row", width: '100%' }}>
            <View style={{
              width: '100%',
              flexDirection: "row", color: "black",
              backgroundColor: 'white', fontSize: 20, marginBottom: 10,
              borderRadius: 5, borderColor: "black", borderWidth: 1, alignItems: "center",
              alignContent: "center"
            }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginStart: 10,
                  resizeMode: "cover",
                }}
                resizeMode='contain'
                source={require('../assets/images/icon_search.png')}
              />
              <TextInput
                style={{
                  padding: 15, marginStart: 5, marginEnd: 0,
                  height: 5, width: "72%", height: 50, fontSize: 18,
                  alignItems: "center"
                }}
                placeholder="Search/Filter by item title"
                onChangeText={(searchTvShowString) => { this.handleSearchInput(searchTvShowString) }}
              />
            </View>
          </View>

          <FlatList
            style={{ marginBottom: 10 }}
            data={this.state.itemArray}
            extraData={this.state}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    )
  }

}

// style required for desing
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: "white"
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#808080"
  },
  backButtonImage: {
    width: 30,
    height: 24,
    marginTop: 0,
    alignSelf: 'center',
    tintColor: "gray"
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18, //half radius will make it cirlce,
    backgroundColor: 'red'
  },
  count: { color: '#FFF' }

})