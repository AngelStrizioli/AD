import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Swiper from "react-native-swiper";
import { getMasVotadas } from "../../api/ControllerApi";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";

const { width } = Dimensions.get("window");

const datos = [
  {
    key: 6,
    name: "24: Legacy",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/90/225030.jpg",
  },
  {
    key: 7,
    name: "Colony",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/91/229234.jpg",
  },
  {
    key: 8,
    name: "The Walking Dead",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/67/168817.jpg",
  },
  {
    key: 9,
    name: "Taken",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/100/250528.jpg",
  },
  {
    key: 10,
    name: "This is us",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/70/175831.jpg",
  },
  {
    key: 11,
    name: "Superstore",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/69/174909.jpg",
  },
  {
    key: 12,
    name: "Lethal Weapon",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/93/234808.jpg",
  },
  {
    key: 13,
    name: "The 100",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/94/236401.jpg",
  },
  {
    key: 14,
    name: "Homeland",
    image:
      "https://static.tvmaze.com/uploads/images/medium_portrait/101/254425.jpg",
  },
];

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: 250,
    marginLeft: "20%",
  },
};

export default function Slider() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [masVotadas, setMasVotadas] = useState([
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
    buscarMasVotadas().then(() => {
      setLoading(false);
    });
  }, []);

  buscarMasVotadas = async () => {
    setLoading(true);
    let masVotadas = await getMasVotadas();
    setMasVotadas(masVotadas);
  };

  return (
    <Swiper autoplay height={350} dotColor="transparent" activeDotColor="white">
      {masVotadas.slice(0, 5).map((item, i) => (
        <View style={styles.container}>
          <Loading isVisible={loading} text="Cargando peliculas" />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("pagina", { item })}
          >
            <Image style={styles.image} source={{ uri: item.imagen }} />
          </TouchableWithoutFeedback>
        </View>
      ))}
    </Swiper>
  );
}
