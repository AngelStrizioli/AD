import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Divider, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FormularioLogin from "../../components/Cuenta/FormularioLogin";
import Toast from "react-native-easy-toast";
import { FontAwesome } from "@expo/vector-icons";


export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView style={{flex: 1}} centerContent={true}>
      <View style={styles.iconoUsuario}>
        <FontAwesome name="user-circle" size={112} color="#009688" />
      </View>
      <View style={styles.viewCont}>
        <FormularioLogin toastRef={toastRef}> </FormularioLogin>
        <CrearCuenta></CrearCuenta>
      </View>
      <Divider style={styles.divider} />
      {/* <Text>Social Login</Text> */}
      <Toast
        ref={toastRef}
        position="top"
        opacity={1.5}
        style={{ backgroundColor: "blue" }}
        positionValue={50}
        fadeInDuration={1500}
        fadeOutDuration={1000}
      />
    </ScrollView>
  );
}

function CrearCuenta() {
  const navigation = useNavigation();
  return (
    <View style={styles.txtCrear}>
    <Text style={{marginTop:'4%', fontSize: 16}}>
      No tenes cuenta todavia? {" "}
      </Text>
      <Button
          containterStyle={styles.btnContainer}
          buttonStyle={styles.boton}
          title="Registrate"
          onPress={() => navigation.navigate("registro")}
        />
    </View>
  );
}
const styles = StyleSheet.create({
  iconoUsuario: {
    alignItems: 'center',
    flex: 1,
  },
  viewCont: {
    marginRight: 40,
    marginLeft: 40,
  },
  txtCrear: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  boton: {
    backgroundColor: "#009688",
    marginLeft:"5%"
  },
  btnContainer: {
    width: "70%",
  },
  divider: {
    margin: 40,
    backgroundColor: "#009688",
  },
});
