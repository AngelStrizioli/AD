import React,{useState,useRef} from "react";
import { View, Text,StyleSheet } from "react-native";
import {Button} from "react-native-elements"
import Toast from "react-native-easy-toast"
import Loading from "../../components/Loading"
export default function UsuarioLogueado() {
  const[loading,setLoading]=useState(false);
  const[textoLoading,setTextoLoading]=useState("");
  const toastRef=useRef();
  return (
    <View style={styles.info}>
      <Text>Informacion del usuario </Text>
      <Text> Cambiar contraseña , cambiar usuario etc.</Text>
      <Button title="Cerrar Sesion" onPress={()=> console.log("Se cerro la sesion")} buttonStyle={styles.btnCerrar} titleStyle={styles.TextoBoton}/> 
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text={textoLoading} isVisible={loading}  />
    </View>
  );
}


const styles=StyleSheet.create({
info:{
  minHeight:"100%",
  backgroundColor:"#f2f2f2"
},
btnCerrar:{
  marginTop:30,
  borderRadius:0,
  backgroundColor:"#fff",
  borderTopWidth:1,
  borderTopColor:"#03bcff",
  borderBottomWidth:1,
  borderBottomColor:"#03bcff",
  paddingTop:10,
  paddingBottom:10
},
TextoBoton:{
  color:"#03bcff"
}
})