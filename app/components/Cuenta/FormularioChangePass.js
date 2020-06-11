import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import { size } from "lodash";
import { reautenticar } from "../../utils/Api";
export default function FormularioChangePass(props) {
  const { setMostrarModal, toastRef } = props;
  const [mostrarClave, setmostrarClave] = useState(false);
  const [data, setData] = useState(iniciardata);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    setData({ ...data, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    let isSetError = true;
    let erroresTemporales = {};
    setErrors({});
    if (!data.password || !data.nuevaPass || !data.nuevaPass2) {
      erroresTemporales = {
        password: !data.password ? "La contraseña no puede estar vacia" : "",
        password2: !data.nuevaPass ? "La contraseña no puede estar vacia" : "",
        password3: !data.nuevaPass2 ? "La contraseña no puede estar vacia" : "",
      };
    } else if (data.nuevaPass2 !== data.nuevaPass) {
      erroresTemporales = {
        password2: "Las contraseñas deben coincidir",
        password3: "Las contraseñas deben coincidir",
      };
    } else if (size(data.nuevaPass) < 6) {
      erroresTemporales = {
        password2: "Las contraseña debe ser mayor a 6 caracteres",
        password3: "Las contraseña debe ser mayor a 6 caracteres",
      };
    } else {
      setLoading(true);
      await reautenticar(data.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(data.nuevaPass)
            .then(() => {
              isSetError = false;
              setMostrarModal(false);
              setLoading(false);
              firebase.auth().signOut();
            })
            .catch(() => {
              erroresTemporales = {
                otro:
                  "Error al actualizar contraseña, Intentelo nuevamente más tarde ",
              };
              setLoading(false);
            });

          setLoading(false);
        })
        .catch((error) => {
          erroresTemporales = {
            password: "La contraseña no es correcta",
          };
          setLoading(false);
        });
    }
    if (isSetError) {
      setErrors(erroresTemporales);
    }
  };
  return (
    <View style={styles.view}>
      <Input
        style={styles.input}
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={mostrarClave ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Feather
            name={mostrarClave ? "eye" : "eye-off"}
            size={30}
            color="#ccc"
            onPress={() => setmostrarClave(!mostrarClave)}
          />
        }
        errorMessage={errors.password}
      ></Input>
      <Input
        style={styles.input}
        placeholder="Contraseña nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={mostrarClave ? false : true}
        rightIcon={
          <Feather
            name={mostrarClave ? "eye" : "eye-off"}
            size={30}
            color="#ccc"
            onPress={() => setmostrarClave(!mostrarClave)}
          />
        }
        onChange={(e) => onChange(e, "nuevaPass")}
        errorMessage={errors.password2}
      ></Input>
      <Input
        style={styles.input}
        placeholder="Repetir contraseña nueva"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={mostrarClave ? false : true}
        onChange={(e) => onChange(e, "nuevaPass2")}
        rightIcon={
          <Feather
            name={mostrarClave ? "eye" : "eye-off"}
            size={30}
            color="#ccc"
            onPress={() => setmostrarClave(!mostrarClave)}
          />
        }
        errorMessage={errors.password3}
      ></Input>
      <Button
        title="Cambiar contraseña"
        style={styles.container}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      ></Button>
      <Text>{errors.otro}</Text>
    </View>
  );
}
function iniciardata() {
  return {
    password: "",
    nuevaPass: "",
    nuevaPass2: "",
  };
}
const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  view: {
    marginBottom: 10,
  },
  container: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#03bcff",
  },
});
