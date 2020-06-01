import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
//import { withNavigation } from "react-navigation";

export default function FormularioRegistro() {
  const [hidePass, setHidePass] = useState(false);
  const [hidePass2, setHidePass2] = useState(false);
  const [data, setData] = useState(valoresData);

  const onSubmit = () => {
    console.log(data);
  };
  const onChange = (e, type) => {
    // setData({ [type]: e.nativeEvent.text });
    setData({ ...data, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.vista}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")} // funcion que hace que se actualice el estado
        rightIcon={
          <Icon
            type="material-community"
            name="at"
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
          <Icon
            type="material-community"
            name={hidePass ? "eye-outline" : "eye-off-outline"} //este es un if , dependiendo el estado pone un icono o el otro
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
          <Icon
            type="material-community"
            name={hidePass2 ? "eye-outline" : "eye-off-outline"} //este es un if , dependiendo el estado pone un icono o el otro
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
    backgroundColor: "#03bcff",
  },
});
