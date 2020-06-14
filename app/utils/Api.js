import * as firebase from "firebase";

export const reautenticar = (clave) => {
  const usuario = firebase.auth().currentUser;
  const credenciales = firebase.auth.EmailAuthProvider.credential(
    usuario.email,
    clave
  );
  return usuario.reauthenticateWithCredential(credenciales);
};
