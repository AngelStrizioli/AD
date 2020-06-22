import React,{useRef} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormularioRegistro from "../../components/Cuenta/FormularioRegistro";
import Toast from "react-native-easy-toast"
import { FontAwesome } from "@expo/vector-icons";


export default function Registro() {
  const toastRef=useRef();
  return (
    <KeyboardAwareScrollView style={styles.container} centerContent={true}>
      <View style={styles.iconoUsuario}>
        <FontAwesome name="user-circle" size={112} color="#009688" />
      </View>
      <View style={styles.formVista}>
        <FormularioRegistro toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position='top' opacity={1.5} style={{backgroundColor:'blue'}} positionValue={50} fadeInDuration={1500} fadeOutDuration={1000} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  iconoUsuario: {
    alignItems: 'center',
    flex: 1,
  },
  formVista: {
    marginRight: 40,
    marginLeft: 40,
  },
});
