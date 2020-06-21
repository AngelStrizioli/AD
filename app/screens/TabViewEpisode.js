import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Episodes from "./PuntuacionUsuario";
import Trailers from "./Trailers";
import PuntuacionUsuario from "./PuntuacionUsuario";

const FirstRoute = () => <PuntuacionUsuario />;

const SecondRoute = () => <Trailers />;

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewEpisode(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Episodios" },
    { key: "second", title: "Trailers y Mas" },
  ]);
  const { puntajesDePeli } = props;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black", top: 0, height: 3 }}
      style={{ backgroundColor: "#009688" }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
