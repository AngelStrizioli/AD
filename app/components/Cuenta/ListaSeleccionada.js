import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function ListaSeleccionada(props) {
  const peliculasAMostrar = props.route.params.lista.peliculas;
  const navigation = useNavigation();
  var array = [];
  array = peliculasAMostrar.slice();
  array.shift();

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={array}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => navigation.navigate("pagina", { item })}
          >
            {item.imagen === "" ? (
              <View style={styles.container}>
                <Text style={styles.title}>
                  No hay imagen que coincida con su busqueda{" "}
                </Text>
              </View>
            ) : (
              <View style={styles.container}>
                <Image
                  style={styles.photo}
                  source={{
                    uri: item.imagen,
                  }}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
          </TouchableHighlight>
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: "#009688",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 30,
    marginTop: 5,
  },
  text: {
    color: "#009688",
    fontSize: 24,
    marginTop: 5,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#009688",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  separator: {
    borderBottomColor: "#009688",
    borderBottomWidth: 3,
  },
});
