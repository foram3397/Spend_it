import React from "react";
import { View, TouchableOpacity, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";

import { colors, bs } from "../../theme";

import { getBorderProps, buildBorderStyle } from "./utils";
import { getTheme } from "./theme";
import LinearGradient from 'react-native-linear-gradient';

export default class Button extends React.Component {
  state = {
    lastPress: 0
  };

  _onPress = () => {
    const curTime = new Date().getTime();
    const delta = curTime - this.state.lastPress;
    if (delta < 300 && this.props.onDoublePress) {
      this.setState({ lastPress: 0 });
      this.props.onDoublePress();
    } else if (this.props.fast || delta > 500) {
      this.setState({ lastPress: curTime });
      this.props.onPress && this.props.onPress();
    }
  };

  render() {
    const { children, theme, type, linearGradient, style, disabled, ...otherProps } = this.props;
    const { borderProps, borderOtherProps } = getBorderProps(otherProps);
    const styles = getTheme(theme);
    const borderStyle =
      style || buildBorderStyle(borderProps, styles.style("button"));

    if (type === "highlight") {
      return (
        <TouchableHighlight
          onPress={this._onPress}
          style={borderStyle}
          {...borderOtherProps}
          disabled={disabled}>
          {children}
        </TouchableHighlight>
      );
    }

    if (linearGradient) {
      return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.voilet, colors.dark_pink]} style={style}>
          <TouchableOpacity onPress={this._onPress} disabled={disabled} style={bStyles.btnStyle}>
            {children}
          </TouchableOpacity>
        </LinearGradient>
      );
    }

    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={borderStyle}
        {...borderOtherProps}
        disabled={disabled}>
        {children}
      </TouchableOpacity>
    );
  }
}

const bStyles = {
  btnStyle: {
    ...bs.full_width,
    ...bs.center
  }
}

Button.propTypes = {
  onDoublePress: PropTypes.func,
  theme: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.any,
  style: PropTypes.any,
  fast: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  theme: "std",
  activeOpacity: 0.7,
  onDoublePress: null
};
