import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  DrawerLayoutAndroidComponent,
  Picker,
} from "react-native";
import { AirbnbRating, Button, Rating } from "react-native-elements";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";

const db = firebase.firestore(firebaseApp);

export default function FormularioRemoverPeli(props) {
  const { setIsVisible, setEstoy, item } = props;
  const [uid, setUid] = useState();
  const [selectedValue, setSelectedValue] = useState(0);
  const [i, setI] = useState(0);
  // en algun momento tengo que hacer el setIsVisible(false);

  useEffect(() => {
    const user = firebase.auth().currentUser.uid;
    setUid(user);
    console.log("asdahdsuduauhsd");
  }, []);

  const onSubmit = (index) => {
    setIsVisible(false);
  };
  return (
    <View>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ backgroundColor: "white", width: "70%" }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Button
          title="Remover de esta lista "
          containerStyle={styles.btncontainer}
          buttonStyle={styles.btn}
          titleStyle={styles.TextoBoton}
          onPress={() => onSubmit(selectedValue)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "15%",
  },
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
