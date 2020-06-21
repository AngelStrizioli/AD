import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RenderCard from "./Renders/RenderCard";
import Slider from "./Renders/Slider";
import Loading from "../components/Loading";
class HomeScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Slider />
        <RenderCard />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 0,
  },
});

export default HomeScreen;
