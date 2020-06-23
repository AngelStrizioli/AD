import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  ViewComponent,
} from "react-native";
import { Rating, Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormularioPunteo from "../components/FormularioPunteo";
import Modal from "../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { firebaseApp } from "../utils/firebase";
const db = firebase.firestore(firebaseApp);
import "firebase/firestore";
const { width, height } = Dimensions.get("window");
import Loading from "../components/Loading";
import TabViewEpisode from "./TabViewEpisode";
import PuntuacionUsuario from "./PuntuacionUsuario";
import FormularioAgregarPeli from "../components/Cuenta/FormularioAgregarPeli";
import FormularioRemoverPeli from "../components/Cuenta/FormularioRemoverPeli";

function Separator() {
  return <View style={styles.separator} />;
}
export default function PaginaPelicula(props) {
  const navigation = useNavigation();
  const item = props.route.params.item;
  const [renderizarLista, setRenderizarLista] = useState(null);
  const [renderizarRemoverLista, setRenderizarRemoverLista] = useState(null);
  const [renderizarPunteo, setRenderizarPunteo] = useState(null);
  const [isVisibleLista, setIsVisibleLista] = useState(false);
  const [isVisibleRemover, setIsVisibleRemover] = useState(false);
  const [isVisiblePuntuar, setIsVisiblePuntuar] = useState(false);
  const [uid, setUid] = useState(null);
  const [listass, setListass] = useState([]);
  const [listas, setListas] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [puntajesDePeli, setPuntajesDePeli] = useState([]);
  const [estoy, setEstoy] = useState(false);

  useEffect(() => {
    // console.log(item);
    setIsLoading(true);
    const usuario = firebase.auth().currentUser;

    if (usuario) {
      const user = usuario.uid;
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
              listass.push(doc.id);
              //console.log(listas);
            });
            setListas(true);
          }
          //  console.log(prueba);
        });
      console.log((error) => {
        console.log(error);
      });
      const aux = db
        .collection("pelisPuntuadas")
        .where("id_movie", "==", item.id)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.empty) {
            console.log("No hay resultados");
          } else {
            querySnapshot.forEach(function (doc) {
              puntajesDePeli.push(doc.data());
            });
          }
          // console.log(puntajesDePeli);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error" + error);
        });
      const dataBusqueda = {
        id: item.id,
        imagen: item.imagen,
        overview: item.overview,
        release: item.release,
        title: item.title,
        vote_average: item.vote_average,
      };
      const aux2 = db
        .collection("listas")
        .where("peliculas", "array-contains", dataBusqueda)
        .where("usr_id", "==", usuario.uid)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.empty) {
          } else {
            setEstoy(true);
          }
        })
        .catch((error) => {
          console.log("error" + error);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const renderizarPuntuar = () => {
    setRenderizarPunteo(
      <FormularioPunteo
        setIsVisible={setIsVisiblePuntuar}
        idPelicula={item.id}
      />
    );
    setIsVisiblePuntuar(true);
  };

  const renderizarListas = () => {
    setRenderizarLista(
      <FormularioAgregarPeli
        listass={listass}
        setIsVisible={setIsVisibleLista}
        item={item}
      />
    );
    setIsVisibleLista(true);
  };
  const removerPeliLista = () => {
    //aca falta decirle al usuario que lista es la que eleigio , por ahora solo va a haber una

    /*   let data = {
      vote_average: item.vote_average,
      id: item.id,
      imagen: item.imagen,
      title: item.title,
      release: item.release,
      overview: item.overview,
    };
    let removerPeliculaALista = db.collection("listas").doc(listass[0]); // ojo despues del.doc va ir la lista que el usuario eligio
    let arrUnion = removerPeliculaALista.update({
      peliculas: firebase.firestore.FieldValue.arrayRemove(data),
    });
    setEstoy(false); */
    setRenderizarRemoverLista(
      <FormularioRemoverPeli setIsVisible={setIsVisibleRemover} item={item} />
    );
    setIsVisibleRemover(true);
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: item.imagen }}>
        <View style={styles.buttonPlay}>
          <TouchableOpacity
            onPress={() => navigation.navigate("videoPlayer", { item })}
          >
            <Text>
              <FontAwesome
                style={styles.iconPlay}
                name="play-circle"
                size={60}
                color="white"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.nameContainer}>
        <Text style={[styles.text, styles.titleShow]}>{item.title}</Text>
      </View>
      <Rating
        type="custom"
        fractions={1}
        startingValue={item.vote_average / 2}
        imageSize={20}
        ratingTextColor="#009688"
      />
      <View style={styles.descriptionContainer}>
        <View style={styles.subtitle}>
          <Text style={[styles.text, styles.subtitleText]}>{item.release}</Text>
        </View>
        <View style={styles.description}>
          <Text style={[styles.text, styles.light]}>{item.overview}</Text>
        </View>
        <View style={styles.description}>
          {uid ? (
            <View style={styles.shareListIcons}>
                <TouchableOpacity onPress={() => renderizarListas()}>
                  <View style={styles.myListIcon}>
                    <FontAwesome
                      style={styles.listIcon}
                      name="plus"
                      color="#009688"
                      size={35}
                    />

                    <Text style={styles.text}>Agregar película</Text>
                    {renderizarLista && (
                      <Modal
                        isVisible={isVisibleLista}
                        setIsVisible={setIsVisibleLista}
                        color={"transparent"}
                      >
                        {renderizarLista}
                      </Modal>
                    )}
                  </View>
                </TouchableOpacity>
                  {estoy ? (
                    <TouchableOpacity onPress={() => removerPeliLista()}>
                      <View style={styles.myRemoveIcon}>
                        <FontAwesome
                          style={styles.removeIcon}
                          name="minus-square-o"
                          color="#009688"
                          size={35}
                        />
                        <Text style={styles.text}>Remover película</Text>
                        {renderizarRemoverLista && (
                          <Modal
                            isVisible={isVisibleRemover}
                            setIsVisible={setIsVisibleRemover}
                            color={"transparent"}
                          >
                            {renderizarRemoverLista}
                          </Modal>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
              <TouchableOpacity onPress={() => renderizarPuntuar()}>
                <View style={styles.myShareIcon}>
                  <FontAwesome
                    style={styles.shareIcon}
                    name="star-o"
                    color="#009688"
                    size={35}
                  />  
                  <Text style={styles.text}>Puntuar</Text>
                  {renderizarPunteo && (
                    <Modal
                      isVisible={isVisiblePuntuar}
                      setIsVisible={setIsVisiblePuntuar}
                      color={"white"}
                    >
                      {renderizarPunteo}
                    </Modal>
                    )}
                  </View>
                </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.shareListIcons}>
              <View style={styles.myListIcon}>
                <TouchableOpacity
                  onPress={() =>
                    alert(
                      "Necesitas iniciar sesión para poder agregar una película a tu lista "
                    )
                  }
                >
                  <FontAwesome
                    style={styles.listIcon}
                    name="check"
                    color="#009688"
                    size={35}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Mi Lista</Text>
              </View>
              <View style={styles.myShareIcon}>
                <TouchableOpacity
                  onPress={() =>
                    alert(
                      "Necesitas iniciar sesión para poder puntuar esta película"
                    )
                  }
                >
                  <FontAwesome
                    style={styles.shareIcon}
                    name="star-o"
                    color="#009688"
                    size={35}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Puntuar</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <Separator> </Separator>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    backgroundColor: "transparent",
  },
  titleShow: {
    fontSize: 24,
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 8,
    color: "#009688",
  },
  image: {
    width: 200,
    height: 300,
    marginLeft: "27%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonPlay: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  iconPlay: {
    opacity: 0.8,
    backgroundColor: "transparent",
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  subtitle: {
    flexDirection: "row",
  },
  subtitleText: {
    marginRight: 20,
  },
  text: {
    color: "#009688",
    fontSize: 16,
    textAlign: "justify",
  },
  shareListIcons: {
    flexDirection: "row",
    marginVertical: 30,
    marginLeft: "5%",
  },
  listIcon: {
    height: 35,
  },
  shareIcon: {
    height: 35,
  },
  removeIcon: {
    height: 35,
  },
  myListIcon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: '4%'
  },
  myShareIcon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: '4%'
  },
  myRemoveIcon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: '4%'
  },
  description: {
    marginVertical: 10,
  },
  light: {
    fontWeight: "200",
  },
  botonInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 180,
  },
  separator: {
    marginVertical: 2,
    borderBottomColor: "#009688",
    borderBottomWidth: 3,
  },
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
