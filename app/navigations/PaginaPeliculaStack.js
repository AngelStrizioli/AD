import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaginaPelicula from "../screens/PaginaPelicula";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
export default function PeliculasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pagina"
        component={PaginaPelicula}
        options={{ title: "Pagina Peliculas" }}
      />
    </Stack.Navigator>
  );
}