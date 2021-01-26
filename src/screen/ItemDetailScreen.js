import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Styles, Text, LogBox, FlatList, Button ,Alert} from 'react-native'
import { Actions } from "react-native-router-flux";
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../config.js';

export default class ItemDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.itemData,
            favArray:[]
        }
    }

    componentWillUnmount() {
        if (this.props.reloadScreenData) this.props.reloadScreenData()
    }

    async componentDidMount() {
    }

    _renderToolbarTitle = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.loginTitleStyle}>
                    <Text style={{
                        fontSize: 18,
                        padding: 5,
                        margin: 10,
                        alignSelf: "flex-start",
                        color: "black",
                    }}>{"Item Detail Page"}</Text>
                </View>
            </View>
        )
    }

    _renderBack() {
        return (
            <TouchableOpacity onPress={Actions.pop} style={{ padding: 16 }}>
                <Image
                    style={{
                        width: 30,
                        height: 24,
                        marginTop: 0,
                        alignSelf: 'center',
                        tintColor: "black"
                    }}
                    resizeMode='contain'
                    source={require('../assets/images/ic_back_btn.png')}
                />

            </TouchableOpacity>
        )
    }

    _renderToolbar = () => {
        return (
            <View style={{ flexDirection: "row", backgroundColor: "orange" }}>
                {this._renderBack()}
                {this._renderToolbarTitle()}
            </View>
        )
    }

    onPress(itemId) {
        if(this.state.favArray.length<5){
          this.addToFavrate(itemId)
        }else{
          Alert.alert('Error!', 'Only Maximum 5 Item allowed');
        }
      }

    addToFavrate(itemId) {
        db.ref('/favorite').push({
          id:itemId,
          isFav: true,
        });

        this.state.favArray.push(itemId)
        Alert.alert('Wow!', 'Item added as a favourite in firebase');
        console.log(this.state.favArray)
      }

    render() {
        return (
            <View style={styles.container}>
                {this._renderToolbar()}
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "white", margin: 10 }}>

                        <View style={{ flex: 1, flexDirection: "row", padding: 6 }}>
                            <View style={{
                                justifyContent: 'center'
                            }}>
                                {this.state.item.images ?
                                    <Image
                                        style={{
                                            width: 90,
                                            height: 100,
                                            resizeMode: "cover"
                                        }}
                                        resizeMode='contain'
                                        source={{
                                            uri: this.state.item.images.original.url,
                                        }}
                                    />
                                    : null}

                            </View>
                            <View style={{ flex: 1, flexDirection: "column", marginStart: 8, justifyContent: "center" }}>

                                <Text style={{
                                    fontSize: 18,
                                    alignSelf: "flex-start",
                                    color: "green",
                                }}>{this.state.item.title.toUpperCase()}</Text>

                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 6,
                                    alignSelf: "flex-start",
                                    color: "#5B5A5A",
                                }}>{"Type : " + this.state.item.type}</Text>
                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 6,
                                    alignSelf: "flex-start",
                                    color: "#5B5A5A",
                                }}>{"Username : " + this.state.item.username}</Text>

                            </View>
                        </View>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: "column", margin: 10,
                        marginTop: 10,
                        padding: 6,
                        justifyContent: "center",
                        backgroundColor: "white"
                    }}>

                        <Text style={{
                            fontSize: 18,
                            alignSelf: "flex-start",
                            color: "green",
                        }}>{"Id : " + this.state.item.id.toUpperCase()}</Text>

                        <Text style={{
                            fontSize: 16,
                            marginTop: 6,
                            alignSelf: "flex-start",
                            color: "#5B5A5A",
                        }}>{"slug : " + this.state.item.slug}</Text>
                        <Text style={{
                            fontSize: 16,
                            marginTop: 6,
                            alignSelf: "flex-start",
                            color: "#5B5A5A",
                        }}>{"rating : " + this.state.item.rating}</Text>



                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: "column", margin: 10,
                        marginTop: 10,
                        padding: 6,
                        justifyContent: "center",
                        backgroundColor: "white"
                    }}>

                        <Text style={{
                            fontSize: 18,
                            alignSelf: "flex-start",
                            color: "green",
                        }}>{"import_datetime : " + this.state.item.import_datetime.toUpperCase()}</Text>

                        <Text style={{
                            fontSize: 16,
                            marginTop: 6,
                            alignSelf: "flex-start",
                            color: "#5B5A5A",
                        }}>{"trending_datetime : " + this.state.item.trending_datetime}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: "row", margin: 10,
                        marginTop: 10,
                        padding: 6,
                        justifyContent: "flex-start",
                        backgroundColor: "white"
                    }}>
                        <Text style={{
                            fontSize: 18,
                            alignSelf: "flex-start",
                            color: "green",
                        }}>{"Favourite :  "}</Text>

                        <Button
                            onPress={() => this.onPress(this.state.item.id)}
                            title="Add To fav"
                            color="#841584"
                            accessibilityLabel="Add To fav"
                        />
                    </View>

                </ScrollView>
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

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#808080"

    },
    map: {
        height: 700,
        marginTop: 0
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