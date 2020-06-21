import React from "react";
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
export default function UsuarioInvitado() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/usuario.png")}
        style={styles.imagen}
        resizeMode="contain"
      ></Image>
      <Text style={styles.titulo}> Consulta tu perfil</Text>
      <Text style={styles.textoDes}>
        Inicia sesion o registrate para poder puntuar,ver estrenos o buscar las
        mejores peliculas
      </Text>
      <View style={styles.btnView}>
        <Button
          containterStyle={styles.btnContainer}
          buttonStyle={styles.boton}
          title="Iniciar Sesion o Registrarse"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  imagen: {
    height: 200,
    width: "100%",
    marginBottom: 40,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  btnView: {
    flex: 1,
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#009688",
  },
  btnContainer: {
    width: "70%",
  },
  textoDes: {
    textAlign: "center",
    marginBottom: 20,
  },
});
