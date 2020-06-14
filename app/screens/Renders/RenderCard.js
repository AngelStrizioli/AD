import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const datos = [
  {
    "key":6,
    "name":"24: Legacy",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/90/225030.jpg"
 },
 {
    "key":7,
    "name":"Colony",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/91/229234.jpg"
 },
 {
    "key":8,
    "name":"The Walking Dead",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/67/168817.jpg"
 },
 {
    "key":9,
    "name":"Taken",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/100/250528.jpg"
 },
 {
    "key":10,
    "name":"This is us",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/70/175831.jpg"
 },
]

const datos2 = [
   {
      "key":11,
      "name":"Superstore",
      "image":"https://static.tvmaze.com/uploads/images/medium_portrait/69/174909.jpg"
   },
   {
      "key":12,
      "name":"Lethal Weapon",
      "image":"https://static.tvmaze.com/uploads/images/medium_portrait/93/234808.jpg"
   },
   {
      "key":13,
      "name":"The 100",
      "image":"https://static.tvmaze.com/uploads/images/medium_portrait/94/236401.jpg"
   },
   {
      "key":14,
      "name":"Homeland",
      "image":"https://static.tvmaze.com/uploads/images/medium_portrait/101/254425.jpg"
   }
]

function Separator() {
   return <View style={styles.separator} />;
 }

function Render(datos){
   const navigation = useNavigation()
   return(
      <TouchableHighlight onPress={() => navigation.navigate('pagina')}>
         <Image style={{width:150, height: 200}} source={{uri: datos.item.image}} />
      </TouchableHighlight>
    )
}


export default function RenderCard () {
  
    return (
      <View style={{flex:1, margin: '0.5%'}}> 
         <View>
            <Text style={styles.text}> Mi Lista </Text>
            <Separator />
            <FlatList 
               horizontal={true}
               ItemSeparatorComponent={() => <View style={{width: 5}} />}
               data={datos}
               keyExtractor={item => `${item.key}`}
               renderItem= {({item}) => <Render item={item}/>}               
            />
         </View>
         <View>
            <Text style={styles.text}> Series </Text>
            <Separator />
            <FlatList 
               horizontal={true}
               ItemSeparatorComponent={() => <View style={{width: 5}} />}
               data={datos2}
               renderItem= {({item}) => <Render item={item}/>}
               keyExtractor={item => `${item.key}`}
            />
         </View>
      </View>
    )
  }


const styles = StyleSheet.create({
   text:{
      color: '#fff3e0',
      fontSize: 22,
      marginTop: 8, 
   },
   separator: {
      borderBottomColor: '#fff3e0',
      borderBottomWidth: 3,
  },
})

