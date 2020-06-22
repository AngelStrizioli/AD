import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";

export default function FormularioChangeName(props) {
  const {
    toastRef,
    displayName,
    setMostrarModal,
    setrecargaInfoUsuario,
  } = props;
  const [nuevoNombre, setnuevoNombre] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const onSubmit = () => {
    setError(null);
    if (!nuevoNombre) {
      setError("El nombre no puede estar vacio ");
    } else if (displayName === nuevoNombre) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setisLoading(true);
      const actualizar = {
        displayName: nuevoNombre,
      };
      firebase
        .auth()
        .currentUser.updateProfile(actualizar)
        .then(() => {
          setisLoading(false);
          setrecargaInfoUsuario(true);
          toastRef.current.show("Gracias por cambiar su nombre");
          setMostrarModal(false);
        })
        .catch((error) => {
          setError("Error al actualizar el nombre" + error);
          setisLoading(false);
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        style={styles.input}
        rightIcon={<Feather name="user" size={20} color="#009688" />}
        defaultValue={displayName || ""}
        onChange={(e) => setnuevoNombre(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        titleStyle={styles.TextoBoton}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    borderRadius: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#009688",
    borderLeftColor:'#009688',
    borderLeftWidth: 1,
    borderRightColor:'#009688',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#009688",
  },
  TextoBoton: {
    color: "#009688",
  },
});
