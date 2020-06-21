import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

export default function InformacionUsuario(props) {
  const {
    infoUsuario: { photoURL, uid, displayName, email },
    toastRef,
    setTextoLoading,
    setLoading,
  } = props;
  let [fontsLoaded] = useFonts({
    "MaterialIcons-Regular": require("../../../assets/fonts/MaterialIcons-Regular.ttf"),
  });
  const cambiarFoto = async () => {
    const resultadoPermiso = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultadoPermisoCamara =
      resultadoPermiso.permissions.cameraRoll.status;
    if (resultadoPermisoCamara === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (resultado.cancelled) {
        toastRef.current.show("Seleccione una imagen por favor");
      } else {
        subirFotoFirehase(resultado.uri)
          .then(() => {
            actualizarFotoUrl();
          })
          .catch((error) => {
            console.log("" + error);
          });
      }
    }
  };
  const subirFotoFirehase = async (uri) => {
    setTextoLoading("Actualizando imagen");
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatars/${uid}`);
    return ref.put(blob);
  };
  const actualizarFotoUrl = () => {
    firebase
      .storage()
      .ref(`avatars/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const fotoActualizada = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(fotoActualizada);
        setLoading(false);
      })
      .catch((error) => {
        console.log("" + error);
      });
  };
  return (
    <View style={styles.infoView}>
      <Avatar
        rounded
        size="large"
        //  showAccessory
        //  onAccessoryPress={cambiarFoto}
        containerStyle={styles.infoUsuarioAvatar}
        onPress={cambiarFoto}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/original.jpg")
        }
      />
      <View>
        <AntDesign
          name="edit"
          size={24}
          color="black"
          style={styles.icono}
          color="black"
          onPress={cambiarFoto}
        />
      </View>

      <View>
        <Text style={styles.nombrePPal}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Otro tipo de login"}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  infoView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  infoUsuarioAvatar: {
    marginRight: 20,
  },
  nombrePPal: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  icono: {
    position: "absolute",
    left: -55,
    top: -30,
  },
});
