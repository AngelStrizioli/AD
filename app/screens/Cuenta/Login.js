import React,{useRef} from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FormularioLogin from "../../components/Cuenta/FormularioLogin"
import Toast from "react-native-easy-toast"

export default function Login() {
  const toastRef=useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.imagen}
      />
      <View style={styles.viewCont}>
        <FormularioLogin toastRef={toastRef}>  </FormularioLogin>
        <CrearCuenta></CrearCuenta>
      </View>
      <Divider style={styles.divider} />
      {/* <Text>Social Login</Text> */} 
      <Toast ref={toastRef} position='top' opacity={1.5} style={{backgroundColor:'blue'}} positionValue={50} fadeInDuration={1500} fadeOutDuration={1000} />
    </ScrollView>
  );
}

function CrearCuenta() {
  const navigation = useNavigation();
  return (
    <Text style={styles.txtCrear}>
      No tenes cuenta todavia? ->
      <Text
        style={styles.textoBoton}
        onPress={() => navigation.navigate("registro")}
      >
        {" "} {" "} {" "}
        Registrate
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewCont: {
    marginRight: 40,
    marginLeft: 40,
  },
  txtCrear: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  textoBoton: {
    color: "#03bcff",
    fontWeight: "bold",
    fontSize:20
  },
  divider: {
    margin: 40,
    backgroundColor: "#03bcff",
  },
});
