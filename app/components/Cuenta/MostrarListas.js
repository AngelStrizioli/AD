import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
import ListaSeleccionada from "./ListaSeleccionada";
import { useNavigation } from "@react-navigation/native";
import ActionButton from "react-native-action-button";
import Loading from "../Loading";
const db = firebase.firestore(firebaseApp);
export default function MostrarListas() {
  const navigation = useNavigation();
  const [listas, setListas] = useState(false);
  const [uid, setUid] = useState();
  const [listass, setListass] = useState([]);
  const [reloadData, setReload] = useState(false);
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true); //ojo
    const user = firebase.auth().currentUser.uid;
    setUid(user);
    const listas1 = db
      .collection("listas")
      .where("usr_id", "==", user)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No hay resultados");
        } else {
          // console.log(snapshot);
          snapshot.forEach((doc) => {
            // console.log(doc.data());
            // setListas(doc.data());
            listass.push(doc.data());
          });
          setListas(true);
          setisLoading(false);
        }
        //  console.log(prueba);
      });
    console.log((error) => {
      console.log(error);
    });
  }, [reloadData]);
  const selecccion = (item) => {
    navigation.navigate("listaSeleccionada", { lista: item });
  };
  const agregarLista = () => {
    var data = {
      usr_id: uid,
      peliculas: [
        {
          id: "",
          imagen: "",
          title: "",
          release: "",
          overview: "",
          vote_average: "",
        },
      ],
    };
    let addDoc = db
      .collection("listas")
      .add(data)
      .then((ref) => {
        console.log("Se creo la nueva lista con ID: " + ref.id);
        navigation.navigate("cuenta");
      });
  };
  return (
    <View style={styles.info}>
      {listass.map((item, id) => (
        <TouchableHighlight onPress={() => selecccion(item)}>
          <ListItem
            key={id}
            title={"Lista numero : " + (id + 1)}
            rightIcon={<Feather name={"chevron-right"} size={20} />}
            containerStyle={styles.menuItem}
            bottomDivider
          />
        </TouchableHighlight>
      ))}
      <ActionButton onPress={() => agregarLista()}></ActionButton>
      <Loading isVisible={loading} text="Obteniendo las listas " />
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCerrar: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#009688",
    borderBottomWidth: 1,
    borderBottomColor: "#009688",
    paddingTop: 10,
    paddingBottom: 10,
  },
  TextoBoton: {
    color: "#009688",
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
