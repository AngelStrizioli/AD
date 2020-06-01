import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopPeliculas from "../screens/TopPeliculas";

const Stack = createStackNavigator();
export default function TopPeliculasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favoritos"
        component={TopPeliculas}
        options={{ title: "Top de peliculas" }}
      />
    </Stack.Navigator>
  );
}
