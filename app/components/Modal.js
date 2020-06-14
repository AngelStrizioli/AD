import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;
  const cerrarModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={cerrarModal}
    >
      {children}
    </Overlay>
  );
}
const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});