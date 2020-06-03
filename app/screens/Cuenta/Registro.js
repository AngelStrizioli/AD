import React,{useRef} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormularioRegistro from "../../components/Cuenta/FormularioRegistro";
import Toast from "react-native-easy-toast"

export default function Registro() {
  const toastRef=useRef();
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.formVista}>
        <FormularioRegistro toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position='top' opacity={1.5} style={{backgroundColor:'blue'}} positionValue={50} fadeInDuration={1500} fadeOutDuration={1000} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  formVista: {
    marginRight: 40,
    marginLeft: 40,
  },
});
