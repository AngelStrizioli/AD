import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import InformacionUsuario from "../../components/Cuenta/InformacionUsuario";
import OpcionesCuenta from "../../components/Cuenta/OpcionesCuenta";
import { useNavigation } from "@react-navigation/native";
export default function UsuarioLogueado() {
  const navigation = useNavigation();
  const [infoUsuario, setInfoUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textoLoading, setTextoLoading] = useState("");
  const [recargaInfoUsuario, setrecargaInfoUsuario] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const usuario = await firebase.auth().currentUser;
      setInfoUsuario(usuario);
    })();
    setrecargaInfoUsuario(false);
  }, [recargaInfoUsuario]); //aray donde  le decimos qye cuando esto cambia que se actualice,si lo dejamos vacio se ejcuta una vez cuando el componente se monte

  return (
    <ScrollView style={styles.info} centerContent={true}>
      {infoUsuario && (
        <InformacionUsuario
          infoUsuario={infoUsuario}
          toastRef={toastRef}
          setLoading={setLoading}
          setTextoLoading={setTextoLoading}
        />
      )}

      <OpcionesCuenta
        infoUsuario={infoUsuario}
        toastRef={toastRef}
        setrecargaInfoUsuario={setrecargaInfoUsuario}
      >
        {" "}
      </OpcionesCuenta>
      <Button
        title="Mis Listas"
        onPress={() =>
          navigation.navigate("listas", { setLoading, setTextoLoading })
        }
        buttonStyle={styles.btnCerrar}
        titleStyle={styles.TextoBoton}
      />
      <Button
        title="Cerrar Sesion"
        onPress={() => firebase.auth().signOut()}
        buttonStyle={styles.btnCerrar}
        titleStyle={styles.TextoBoton}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text={textoLoading} isVisible={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  info: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCerrar: {
    width: "70%",
    marginLeft: "15%",
    marginTop: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#009688",
    borderLeftColor: "#009688",
    borderLeftWidth: 1,
    borderRightColor: "#009688",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#009688",
    paddingTop: 10,
    paddingBottom: 10,
  },
  TextoBoton: {
    color: "#009688",
  },
});
