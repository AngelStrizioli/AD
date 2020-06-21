import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { validarEmail } from "../../utils/ValidacionMail";
import { reautenticar } from "../../utils/Api";
import * as firebase from "firebase";
export default function FormularioChangeEmail(props) {
  const { email, setMostrarModal, toastRef, setrecargaInfoUsuario } = props;
  const [nuevoEmail, setNuevoEmail] = useState("");
  const [mostrarClave, setmostrarClave] = useState(false);
  const [data, setData] = useState(iniciarEstado);
  const [errors, seterrors] = useState({});
  const [loading, setLoading] = useState(false);
  const onChange = (e, type) => {
    setData({ ...data, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    seterrors({});
    if (email === data.email || !data.email) {
      seterrors({ email: "El email no ha cambiado" });
    } else {
      if (!data.password) {
        seterrors({ password: "La contraseña no puede estar vacia" });
      } else {
        setLoading(true);
        reautenticar(data.password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updateEmail(data.email)
              .then(() => {
                setLoading(false);
                setrecargaInfoUsuario(true);
                toastRef.current.show("Gracias por actualizar su email");
                setMostrarModal(false);
              })
              .catch(() => {
                seterrors({ email: "Error al actualizar el email " });
                setLoading(false);
              });
          })
          .catch(() => {
            setLoading(false);
            seterrors({ password: "La contraseña no es correcta" });
          });
      }
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.input}
        defaultValue={email}
        //onChange={(e) => setNuevoEmail(e.nativeEvent.text)}
        rightIcon={<Feather name="mail" size={30} color="#ccc" />}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      ></Input>
      <Input
        placeholder="Contraseña "
        label="Es necesaria la contraseña para actualizar su email"
        labelStyle={{ fontSize: 10, marginBottom: -1 }}
        password={true}
        containerStyle={styles.input}
        secureTextEntry={mostrarClave ? false : true}
        //onChange={(e) => setNuevoEmail(e.nativeEvent.text)}
        rightIcon={
          <Feather
            name={mostrarClave ? "eye" : "eye-off"}
            size={30}
            color="#ccc"
            onPress={() => setmostrarClave(!mostrarClave)}
          />
        }
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      ></Input>
      <Button
        title="Cambiar email"
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      ></Button>
    </View>
  );
}
function iniciarEstado() {
  return {
    email: "",
    password: "",
  };
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
  container: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#009688",
  },
});
