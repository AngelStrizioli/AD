import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaginaPelicula from "../screens/PaginaPelicula";
import HomeScreen from "../screens/HomeScreen";
import VideoPlayerView from "../screens/Renders/VideoPlayerView";
const Stack = createStackNavigator();
export default function PeliculasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio",  headerTintColor:'#009688' }}
      />
      <Stack.Screen
        name="pagina"
        component={PaginaPelicula}
        options={{ title: "Descripcion", headerTintColor:'#009688' }}
      />
      <Stack.Screen
        name="videoPlayer"
        component={VideoPlayerView}
        options={{ title: "Trailer",  headerTintColor:'#009688' }}
      />
    </Stack.Navigator>
  );
}