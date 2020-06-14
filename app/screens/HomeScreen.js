import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RenderCard from "./Renders/RenderCard";
import Slide from './Renders/Slider'

class HomeScreen extends Component {
  render(){
    return(
      <ScrollView style={styles.container}>
        <Slide />
        <RenderCard />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#009688',
    marginTop: 0,
  },
 
})

export default HomeScreen