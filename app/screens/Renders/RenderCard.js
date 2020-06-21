import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getEstrenos } from "../../api/ControllerApi";
import Loading from "../../components/Loading";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

function Separator() {
  return <View style={styles.separator} />;
}

export default function RenderCard(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [estrenos, setEstrenos] = useState([
    {
      id: "",
      imagen: "",
      title: "",
      release: "",
      overview: "",
      vote_average: "",
    },
  ]);

  useEffect(() => {
    buscarEstrenos().then(() => {
      setLoading(false);
    });
  }, []);

  buscarEstrenos = async () => {
    setLoading(true);
    let estrenos = await getEstrenos();
    setEstrenos(estrenos);
  };

  return (
    <View style={{ flex: 1, margin: "0.5%" }}>
      <View>
        <Loading isVisible={loading} text="Cargando peliculas" />
        <Text style={styles.text}> Estrenos </Text>
        <Separator />
        <FlatList
          horizontal={true}
          data={estrenos}
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
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#009688",
    fontSize: 24,
    marginTop: 5,
  },
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
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 30,
    marginTop: 5,
  },
});
