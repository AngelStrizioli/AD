import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Episodes from './Episodes'
import Trailers from './Trailers'

const FirstRoute = () => (
  <Episodes />
);
 
const SecondRoute = () => (
  <Trailers />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewEpisode() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Episodios' },
    { key: 'second', title: 'Trailers y Mas' },
  ]);
 
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' , top:0, height:3}}
      style={{ backgroundColor: 'transparent' }}
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