import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  ViewComponent,
  requireNativeComponent,
} from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useNavigationState } from "@react-navigation/native";
import { find, getEstrenos } from "../api/ControllerApi";
import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";

export default function Busqueda(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [peliculas, setPeliculas] = useState([
    {
      id: "",
      imagen: "",
      title: "",
      release: "",
    },
  ]);
  const borrar = {
    id: "",
    imagen: "",
    title: "",
    release: "",
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
        placeholder="Busca tu pelicula..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={StyleSheet.searchBar}
        searchIcon={
          <Feather
            name="search"
            size={20}
            color="white"
            iconStyle={styles.iconRight}
            onPress={() => setHidePass(!hidePass)}
          />
        }
        clearIcon={<FontAwesome name="circle" size={0} color="black" />}
        onChangeText={(e) => onChange(e)}
        onCancel="clear"
      />
      <Text>
        {" "}
        {peliculas.title !== "" ? (
          peliculas[0].title
        ) : (
          <Text> No hay nada para mostrar</Text>
        )}
      </Text>
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
});
