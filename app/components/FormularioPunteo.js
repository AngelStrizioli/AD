import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  DrawerLayoutAndroidComponent,
} from "react-native";
import { AirbnbRating, Button, Rating } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default function FormularioPunteo(props) {
  const { setIsVisible, idPelicula } = props;
  const [review, setReview] = useState("El usuario no dejo ningun comentario");
  const [raiting, setRating] = useState(5);
  const [uid, setUid] = useState();
  console.log(setIsVisible);
  // en algun momento tengo que hacer el setIsVisible(false);

  useEffect(() => {
    const user = firebase.auth().currentUser.uid;
    setUid(user);
  }, []);

  const onSubmit = () => {
    console.log(uid);
    const reviewSinEspacio = review.trim();
    //let agregarPeliculaALista = db.collection("usuarios").doc(uid);
    // const reviewSinEspacio = review.trim(); // acordarse de pasarle reviewSinEspacio a firebase porque el estado review los tiene
    // let arrUnion = agregarPeliculaALista.update({
    //  peliculasPuntuadas: firebase.firestore.FieldValue.arrayUnion({
    //   raiting: raiting,
    //   review: reviewSinEspacio,
    //   idPelicula: idPelicula,
    // }),
    const data = {
      id_movie: idPelicula,
      id_usr: uid,
      raiting: raiting,
      review: reviewSinEspacio,
    };
    let agregarPunteo = db
      .collection("pelisPuntuadas")
      .add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    //});

    setIsVisible(false);
  };
  return (
    <View>
      <AirbnbRating
        count={5}
        reviews={["Muy mala", "Mala", "Regular", "Buena", "Excelente"]}
        defaultRating={5}
        size={30}
        onFinishRating={(valor) => setRating(valor)}
      />
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Ingrese el comentario de la pelicula"
          placeholderTextColor="grey"
          numberOfLines={5}
          multiline={true}
          onChangeText={(text) => setReview(text)}
        />
      </View>

      <Button
        title="Enviar Calificación "
        containerStyle={styles.btncontainer}
        buttonStyle={styles.btn}
        titleStyle={styles.TextoBoton}
        onPress={onSubmit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#009688",
    borderWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  btn: {
    marginTop: "3%",
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
  },
  TextoBoton: {
    color: "#009688",
    marginBottom: "3%",
  },
});
