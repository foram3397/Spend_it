import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { bs, sizes, colors } from "../../theme";
import { Button, Text, Icon } from "./index"

const RadioButton = props => {
  const { keyValue, data, onPress } = props;
  const checkIcon = data.selected ? 'mt adjust' : 'mt panorama-fish-eye'
  return (
    <View key={keyValue} style={styles.innerView}>
      <Button style={styles.btnStyle} onPress={onPress}>
        <Icon name={checkIcon} size={18} color={colors.black} style={styles.iconStyle} />
      </Button>
      <Text bold size={16} color={colors.black}>{data.label}</Text>
    </View>
  );
};

RadioButton.propTypes = {
  keyValue: PropTypes.any,
  data: PropTypes.any,
  _onPress: PropTypes.func
};

const styles = {
  innerView: {
    ...bs.start_center,
    ...bs.flex_row,
    height: sizes.em(50),
    ...bs.pl_3x,
    backgroundColor: colors.white,
    elevation: 5,
  },
  iconStyle: {
    ...bs.pt_1x
  },
  btnStyle: {
    ...bs.center,
    height: sizes.em(50),
    width: sizes.em(50),
  }
}

export default RadioButton;
