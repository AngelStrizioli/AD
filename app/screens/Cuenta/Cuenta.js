import React, { useState, useEffect } from "react";
import UsuarioInvitado from "./UsuarioInvitado";
import UsuarioLogueado from "./UsuarioLogeado";
import Loading from "../../components/Loading";
export default function Cuenta() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    // aca es donde iria para ver si esta logueado o no
    // !user ? setLogin(false) : setLogin(true);
    setLogin(false); //hardcodeado para ver si anda si el login es true,false,o null(cargando)
  }, []);
  if (login === null) {
    // en tiempo de carga
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UsuarioLogueado /> : <UsuarioInvitado />;
}
