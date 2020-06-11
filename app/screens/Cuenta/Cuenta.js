import React, { useState, useEffect } from "react";
import UsuarioInvitado from "./UsuarioInvitado";
import UsuarioLogueado from "./UsuarioLogeado";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
export default function Cuenta() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });

    // setLogin(true); //hardcodeado para ver si anda si el login es true,false,o null(cargando)
  }, []);
  if (login === null) {
    // en tiempo de carga
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UsuarioLogueado /> : <UsuarioInvitado />;
}
