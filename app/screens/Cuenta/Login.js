import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.imagen}
      />
      <View style={styles.viewCont}>
        <Text>login from</Text>
        <CrearCuenta></CrearCuenta>
      </View>
      <Divider style={styles.divider} />
      <Text>Social Login</Text>
    </ScrollView>
  );
}

function CrearCuenta() {
  const navigation = useNavigation();
  return (
    <Text style={styles.txtCrear}>
      No tenes cuenta todavia?
      <Text
        style={styles.textoBoton}
        onPress={() => navigation.navigate("registro")}
      >
        {" "}
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
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textoBoton: {
    color: "#03bcff",
    fontWeight: "bold",
  },
  divider: {
    margin: 40,
    backgroundColor: "#03bcff",
  },
});
