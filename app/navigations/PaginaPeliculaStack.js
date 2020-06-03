import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaginaPelicula from "../screens/PaginaPelicula";

const Stack = createStackNavigator();
export default function PeliculasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pagina Peliculas"
        component={PaginaPelicula}
        options={{ title: "Pagina Peliculas" }}
      />
    </Stack.Navigator>
  );
}