import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Modal from "../Modal";
import FormularioChangeName from "./FormularioChangeName";
import FormularioChangeEmail from "./FormularioChangeEmail";
import FormularioChangePass from "./FormularioChangePass";
export default function OpcionesCuenta(props) {
  const { infoUsuario, toastRef, setrecargaInfoUsuario } = props;
  const [mostrarModal, setMostrarModal] = useState(false);
  const [renderizar, setRenderizar] = useState(null);
  const componenteSeleccionado = (key) => {
    switch (key) {
      case "displayName":
        setRenderizar(
          <FormularioChangeName
            displayName={infoUsuario.displayName}
            setMostrarModal={setMostrarModal}
            toastRef={toastRef}
            setrecargaInfoUsuario={setrecargaInfoUsuario}
          />
        );
        setMostrarModal(true);
        break;
      case "email":
        setRenderizar(
          <FormularioChangeEmail
            email={infoUsuario.email}
            setMostrarModal={setMostrarModal}
            toastRef={toastRef}
            setrecargaInfoUsuario={setrecargaInfoUsuario}
          />
        );
        setMostrarModal(true);
        break;
      case "password":
        setRenderizar(
          <FormularioChangePass
            password={infoUsuario.password}
            setMostrarModal={setMostrarModal}
            toastRef={toastRef}
          />
        );
        setMostrarModal(true);
        break;
      default:
        setRenderizar(null);
        setMostrarModal(true);
        break;
    }
  };
  const opcionesMenu = generarOpciones(componenteSeleccionado);
  return (
    <View>
      {map(opcionesMenu, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={
            <Feather
              name={menu.lefticonName}
              size={20}
              color={menu.lefticonColor}
            />
          }
          rightIcon={
            <Feather
              name={menu.rightIconName}
              size={20}
              color={menu.righticonColor}
            />
          }
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}
      {renderizar && (
        <Modal
          isVisible={mostrarModal}
          setIsVisible={setMostrarModal}
          color={"white"}
        >
          {renderizar}
        </Modal>
      )}
    </View>
  );
}

function generarOpciones(componenteSeleccionado) {
  return [
    {
      title: "Cambiar Nombre y Apellido",
      lefticonName: "user",
      lefticonColor: "#009688",
      rightIconName: "chevron-right",
      righticonColor: "#009688",
      onPress: () => componenteSeleccionado("displayName"),
    },
    {
      title: "Cambiar Email",
      lefticonName: "mail",
      lefticonColor: "#009688",
      rightIconName: "chevron-right",
      righticonColor: "#009688",
      onPress: () => componenteSeleccionado("email"),
    },
    {
      title: "Cambiar contrasena",
      lefticonName: "eye",
      lefticonColor: "#009688",
      rightIconName: "chevron-right",
      righticonColor: "#009688",
      onPress: () => componenteSeleccionado("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
