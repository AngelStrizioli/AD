import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import {validarEmail} from "../../utils/ValidacionMail"
import {size,isEmpty} from "lodash"
import { MaterialIcons,Feather } from '@expo/vector-icons';
import  {useNavigation} from "@react-navigation/native"
import Loading from "../Loading"


export default function FormularioLogin(props) {
const {toastRef}=props;
const [hidePass, setHidePass] = useState(false);
const [data, setData] = useState(valoresData);
const [loading, setLoading] = useState(false);
const navegacion=useNavigation();

const onSubmit = () => {
    if(isEmpty(data.email)||isEmpty(data.password)){
      toastRef.current.show("Todos los campos son obligatorios")
    }
    else{
      if(validarEmail(data.email)){
       toastRef.current.show("El email no es correcto")
      }
      else{
         if(size(data.password)<6){
           toastRef.current.show("La contrasena debe tener 6 caracteres")
         }
         else{ // esto es que esta todo bien entonces aca es donde le pega a la bd y habria que poner el loading en true para que se tome su tiempo la bd en chequear los datos y despues agregar un loading false cuando termina
         //  toastRef.current.show("Login Correcto"); // aca es donde tendria que validarlo con la BD
          navegacion.navigate("cuenta")
         }
        }
      }
    }
  

const onChange = (e, type) => {

    setData({ ...data, [type]: e.nativeEvent.text });
  };
    return(
        <View style={styles.container}> 
        <Input 
         placeholder="Correo Electronico"  //  ver poe que no aparece esto
        containerStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
            <MaterialIcons name="mail-outline" size={30}  iconStyle={styles.iconRight} />
             }
        /> 
        <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        onChange={(e) => onChange(e, "password")}
        secureTextEntry={hidePass?false:true}
        rightIcon={

            <Feather  name={hidePass ? "eye" : "eye-off"} size={30} color="black" iconStyle={styles.iconRight}  onPress={() => setHidePass(!hidePass)}/>
        }
        >
        </Input>
        <Button title="Iniciar Sesion" containerStyle={styles.btncontainer} buttonStyle={styles.btn}  onPress={onSubmit} />
        <Loading isVisible={loading} text="Iniciando Sesion" />
        </View>
    )
}
function valoresData() {
    return {
      email: "",
      password: "",
    };
  }

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:70
    },
    input:{
        width:"100%",
        marginTop:20
    },
    btncontainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#03bcff"
    },
     iconRight: {
        color: "#c1c1c1",
      },
})