import React from "react";
import { Modal, View, Alert } from "react-native";
import PropTypes from "prop-types";

const ModalView = props => {
  const { children, visible, style } = props;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={style}>
        {children}
      </View>
    </Modal>
  );
};

ModalView.propTypes = {
  showScroll: PropTypes.bool
};




export default ModalView;