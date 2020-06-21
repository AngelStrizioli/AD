import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Input, Button } from "react-native-elements";
import { validarEmail } from "../../utils/ValidacionMail";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default function FormularioRegistro(props) {
  const { toastRef } = props;
  const [hidePass, setHidePass] = useState(false);
  const [hidePass2, setHidePass2] = useState(false);
  const [data, setData] = useState(valoresData);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    return () => {};
  }, []);
  const onSubmit = () => {
    if (
      isEmpty(data.email) ||
      isEmpty(data.password) ||
      isEmpty(data.password2)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validarEmail(data.email) == false) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (data.password !== data.password2) {
          toastRef.current.show("Las contraseña deben ser iguales");
        } else {
          if (size(data.password) < 6) {
            toastRef.current.show("La contraseña debe tener 6 caracteres");
          } else {
            setLoading(true);
            firebase
              .auth()
              .createUserWithEmailAndPassword(data.email, data.password)
              .then(() => {
                const user = firebase.auth().currentUser;
                var uid = user.uid;
                console.log(uid);
                db.collection("usuarios")
                  .doc(uid)
                  .set({
                    peliculasPuntuadas: [{}],
                  });
                /*  .then(() => {
                    console.log("todo ok");
                  })
                  .catch((error) => {
                    console.log(error);
                  }); */
                setLoading(false);

                navigation.navigate("cuenta");
              })
              .catch(function (error) {
                setLoading(false);
                toastRef.current.show("" + error);
              });
          }
        }
      }
    }
  };
  const onChange = (e, type) => {
    setData({ ...data, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.vista}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")} // funcion que hace que se actualice el estado
        rightIcon={
          <MaterialIcons
            name="mail-outline"
            size={30}
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePass ? false : true}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Feather
            name={hidePass ? "eye" : "eye-off"}
            size={30}
            color="black"
            iconStyle={styles.iconRight}
            onPress={() => setHidePass(!hidePass)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        password={true}
        secureTextEntry={hidePass2 ? false : true}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password2")}
        rightIcon={
          <Feather
            name={hidePass2 ? "eye" : "eye-off"}
            size={30}
            color="black"
            iconStyle={styles.iconRight}
            onPress={() => setHidePass2(!hidePass2)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegis}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}
function valoresData() {
  return {
    email: "",
    password: "",
    password2: "",
  };
}
const styles = StyleSheet.create({
  vista: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegis: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#009688",
  },
});
