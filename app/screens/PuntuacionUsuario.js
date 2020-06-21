import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export default function PuntuacionUsuario(props) {
  const { puntajesDePeli } = props;
  //console.log(puntajesDePeli);
  return (
    <View>
      {puntajesDePeli.map((item, id) => {
        <View style={styles.cardComentario}>
          <Card title={item.id_usr}>
            <Rating
              type="custom"
              fractions={0}
              startingValue={item.raiting}
              imageSize={10}
              ratingTextColor="#009688"
            />
            <Text style={styles.paragraph}>hola</Text>
          </Card>
        </View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardComentario: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
//export default Episodes;
