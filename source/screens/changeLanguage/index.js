import React, { Component } from 'react';
import { connect } from "react-redux";
import { View } from 'react-native';
import PropTypes from "prop-types";

import strings from "@language";
import Global from "@common-functions";

import { setLanguage } from "../../redux/actions/language.actions";

import { Text, Button, Border, Icon, RadioButton } from "../../components/controls";
import { Container } from "../../components/common";

//Styling
import { colors } from "../../theme";
import styles from './styles';

class ChangeLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: '',
      options: [
        {
          label: strings.english,
          selected: (this.props.language === 'en')
        },
        {
          label: strings.hindi,
          selected: (this.props.language === 'hi')
        }
      ]
    }
  }

  componentDidMount() {
    this.state.options.map((item) => {
      if (item.selected === true) {
        this.setState({
          selectedLanguage: item.label
        })
        this.setLanguage(item.label)
      }
    });
  }

  setLanguage = (label) => {
    const { dispatch } = this.props;
    const code = label === "English" ? "en" : "hi";
    Global.setLanguage(code);
    dispatch(setLanguage(code));
  };

  _onBackPress = () => {
    this.props.navigation.pop();
  }

  _renderNavbar = () => (
    <Border theme="navbar" bstyle={styles.header}>
      <Button theme="navbar.left" onPress={this._onBackPress}>
        <Icon color={colors.black} name={"io ios-arrow-round-back"} size={30} />
      </Button>
      <Text bold color={colors.black} size={16}>
        {strings.changeLanguage.toUpperCase()}
      </Text>
    </Border>
  );

  _onRadioBtnPress = (index) => {
    const { options } = this.state;

    options.map((item) => {
      item.selected = false;
    });

    options[index].selected = true;

    this.setState({ options: this.state.options }, () => {
      this.setState({ selectedLanguage: this.state.options[index].label });
    });
    this.setLanguage(this.state.options[index].label)
  }

  _renderField = () => {
    const { options } = this.state;
    return (
      options.map((item, key) => {
        return (
          <RadioButton keyValue={key} data={item} onPress={() => this._onRadioBtnPress(key)} />
        )
      })

    )
  }

  _renderContainer = () => (
    <View style={styles.container}>
      {this._renderField()}
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

ChangeLanguage.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  theme: state.theme,
  language: state.language
});

export default connect(mapStateToProps)(ChangeLanguage);