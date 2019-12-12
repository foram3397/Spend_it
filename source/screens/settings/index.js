import React, { Component } from 'react';
import { connect } from "react-redux";
import { View } from 'react-native';
import PropTypes from "prop-types";
import styles from './styles';

import strings from "@language";

import { Container } from "../../components/common";
import { Text, Button, Border, Icon } from "../../components/controls";

//Styling
import { colors } from "../../theme";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  _onBackPress = () => {
    this.props.navigation.pop();
  }

  _navigate = (routeName) => {
    this.props.navigation.navigate(routeName);
  }

  _renderNavbar = () => (
    <Border theme="navbar" bstyle={styles.header}>
      <Button theme="navbar.left" onPress={this._onBackPress}>
        <Icon color={colors.black} name={"io ios-arrow-round-back"} size={30} />
      </Button>
      <Text bold color={colors.black} size={16}>
        {strings.setting.toUpperCase()}
      </Text>
    </Border>
  );

  _onPressArrow = (index) => {
    if (index === 0) {
      this._navigate('changeLanguage')
    } else if (index === 1) {
      this._navigate('changeIncomeLimit')
    }
  }

  _renderField = (index, field, _onPress) => (
    <View style={styles.innerView}>
      <Button style={styles.btnStyle} onPress={() => _onPress(index)}>
        <Text bold size={16} color={colors.black}>{field}</Text>
        <Icon name={'sl arrow-right'} size={18} color={colors.black} style={styles.iconStyle} />
      </Button>
    </View>
  );

  _renderContainer = () => (
    <View style={styles.container}>
      {this._renderField(0, strings.changeLanguage, this._onPressArrow)}
      {this._renderField(1, strings.changeIncomeLimit, this._onPressArrow)}
    </View>
  );

  render() {
    return (
      <Container>
        {this._renderNavbar()}
        {this._renderContainer()}
      </Container>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  theme: state.theme,
  language: state.language
});

export default connect(mapStateToProps)(Settings);