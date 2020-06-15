import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  ViewComponent,
  requireNativeComponent,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { find } from "../api/ControllerApi";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function Busqueda(props) {
  //const { navigation } = props;
  const navigation  = useNavigation();
  const [search, setSearch] = useState("");
  const [peliculas, setPeliculas] = useState([
    {
      id: "",
      imagen: "",
      title: "",
      release: "",
      overview:"",
      vote_average:"",
    },
  ]);
  const borrar = {
    id: "",
    imagen: "",
    title: "",
    release: "",
    overview:"",
    vote_average:"",
  };
  const onChange = (e) => {
    setSearch(e);
  };
  useEffect(() => {
    if (search !== "") buscarPelicula(search);
  }, [search]);

  buscarPelicula = async (search) => {
    let pelis = await find(search);
    if (pelis === -1) {
      setPeliculas(borrar);
    } else {
      setPeliculas(pelis);
    }
  };

  return (
    <View>
      <SearchBar
        placeholder="Busca tu pelicula"
        selectionColor="#009688"
        placeholderTextColor="white"
        style={{backgroundColor:"white"}}
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={StyleSheet.searchBar}
        searchIcon={
          <Feather
            name="search"
            size={20}
            color="#009688"
            iconStyle={styles.iconRight}
            onPress={() => setHidePass(!hidePass)}
          />
        }
        clearIcon={<FontAwesome name="circle" size={0} color="transparent" />}
        onChangeText={(e) => onChange(e)}
        onCancel="clear"
      />

      {peliculas.title !== "" ? (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={peliculas}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => navigation.navigate('pagina',{item})}
            >
              {item.imagen === "" ? (
                <View style={styles.container}>
                  <Text style={styles.title}>No hay imagen que coincida con su busqueda </Text>
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
                  <Text style={styles.category}>{item.release}</Text>
                </View>
              )}
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text> No hay nada para mostrar</Text>
      )}

      {/* {peliculas.length === 0 ? (
        <NoFoundPeliculas />
      ) : (
        <FlatList
          data={peliculas}
          renderItem={(pelicula) => (
            <Pelicula pelicula={pelicula} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )} */}
    </View>
  );
}

/* function NoFoundPeliculas() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/usuario.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
} */

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
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
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  category: {
    marginTop: 5,
    marginBottom: 5,
    color:'#009688'
  },
});
