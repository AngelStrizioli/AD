import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cuenta from "../screens/Cuenta/Cuenta";
import Login from "../screens/Cuenta/Login";
import Registro from "../screens/Cuenta/Registro";
import MostrarListas from "../components/Cuenta/MostrarListas";
import ListaSeleccionada from "../components/Cuenta/ListaSeleccionada";
import PaginaPelicula from "../screens/PaginaPelicula";
import VideoPlayerView from "../screens/Renders/VideoPlayerView";
const Stack = createStackNavigator();
export default function CuentaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cuenta"
        component={Cuenta}
        options={{ title: "Mi cuenta ", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar Sesion", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="registro"
        component={Registro}
        options={{ title: "Registro", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="listas"
        component={MostrarListas}
        options={{ title: "Mis listas", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="listaSeleccionada"
        component={ListaSeleccionada}
        options={{ title: "Lista", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="pagina"
        component={PaginaPelicula}
        options={{ title: "Descripcion", headerTintColor: "#009688" }}
      />
      <Stack.Screen
        name="videoPlayer"
        component={VideoPlayerView}
        options={{ title: "Trailer", headerTintColor: "#009688" }}
      />
    </Stack.Navigator>
  );
}
