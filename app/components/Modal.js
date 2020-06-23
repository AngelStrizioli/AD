import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
export default function Modal(props) {
  const { isVisible, setIsVisible, children, color } = props;
  var colorModal = color;
  const cerrarModal = () => setIsVisible(false);
  if (color === "transparent") {
  } else {
    colorModal = "white";
  }
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={{
        height: "auto",
        width: "90%",
        backgroundColor: colorModal,
      }}
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
  },
});
