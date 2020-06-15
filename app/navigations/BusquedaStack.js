import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Busqueda from "../screens/Busqueda";
import PaginaPelicula from "../screens/PaginaPelicula";
import VideoPlayerView from "../screens/Renders/VideoPlayerView";

const Stack = createStackNavigator();
export default function BusquedaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="busqueda"
      component={Busqueda}
      options={{ title: "Busqueda ", headerTintColor:"#009688"}}
      />
      <Stack.Screen
      name="pagina"
      component={PaginaPelicula}
      options={{ title: "Descripcion", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="videoPlayer"
        component={VideoPlayerView}
        options={{ title: "Trailer",  headerTintColor:'#009688' }}
      />
    </Stack.Navigator>
  );
}