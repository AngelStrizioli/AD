import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons'; 
import PeliculasStack from "./PeliculasStack";
import FavoritosStack from "./FavoritosStack";
import TopPeliculasStack from "./TopPeliculasStack";
import BusquedaStack from "./BusquedaStack";
import CuentaStack from "./CuentaStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="peliculas" //esto es para que empiece en la cuenta, si quiero cambiarlo le pongo el name del Tab.Screeb
        tabBarOptions={{
          inactiveTintColo: "#646464",
          activeTintColor: "#03bcff",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="peliculas"
          component={PeliculasStack}
          options={{ title: "Peliculas" }}
        />
        <Tab.Screen
          name="favoritos"
          component={FavoritosStack}
          options={{ title: "Favoritas" }}
        />
        <Tab.Screen
          name="topPeliculas"
          component={TopPeliculasStack}
          options={{ title: "Top" }}
        />
        <Tab.Screen
          name="busqueda"
          component={BusquedaStack}
          options={{ title: "Busqueda" }}
        />
        <Tab.Screen
          name="cuenta"
          component={CuentaStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "peliculas":
      iconName = "movie";
      break;
   case "favoritos":
      iconName = "favorite-border";
         break;
  case "topPeliculas":
      iconName = "format-list-numbered";
      break;
    case "busqueda":
     iconName = "search";
     break;
    case "cuenta":
    iconName = "person";
    break;
    
  }
  return (
   // <Icon type="material-community" name={iconName} size={22} color={color} />
   <MaterialIcons name={iconName} size={22} color={color} />
  );
}