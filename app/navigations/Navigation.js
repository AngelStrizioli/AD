import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons'; 
import BusquedaStack from "./BusquedaStack";
import CuentaStack from "./CuentaStack";
import HomeScreenStack from "./HomeScreenStack";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" //esto es para que empiece en la cuenta, si quiero cambiarlo le pongo el name del Tab.Screeb
        tabBarOptions={{
          inactiveTintColo: "#646464",
          activeTintColor: "#009688",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreenStack}
          options={{ title: "Inicio" }}
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
   case "Home":
      iconName = "home";
         break;
    case "cuenta":
    iconName = "person";
    break;
    case "busqueda":
    iconName = "search";
    break;
  }
  return (
   // <Icon type="material-community" name={iconName} size={22} color={color} />
   <MaterialIcons name={iconName} size={22} color={color} />
  );
}
