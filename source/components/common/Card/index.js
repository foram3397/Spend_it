//Global Libraries
import React from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import LinearGradient from 'react-native-linear-gradient';

//Styling
import { bs, sizes, colors } from "../../../theme";

const Card = props => {
  const { children, style, button, onPress, linearGradient, shadowStyle, disabled } = props;
  if (button) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={() => onPress()}>
        {children}
      </TouchableOpacity>
    );
  }

  if (linearGradient) {
    return (
      <View style={styles.lnView}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.voilet, colors.dark_pink]} style={[styles.card, { paddingHorizontal: 0 }, style]}>
          <TouchableOpacity disabled={disabled} onPress={() => onPress()} style={styles.btnStyle} >
            {children}
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.voilet, colors.dark_pink]} style={shadowStyle} />
      </View>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  button: PropTypes.bool,
  style: PropTypes.any,
  onPress: PropTypes.func
};

const styles = {
  card: {
    ...bs.bg_white,
    ...bs.ph_2x,
    ...bs.pv_2x,
    ...bs.start_start,
    ...bs.full_width,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 5
  },
  lnView: {
    ...bs.center
  },
  btnStyle: {
    ...bs.full_width,
  }
};
export default Card;
