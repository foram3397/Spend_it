//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler } from "react-native";
import PropTypes from "prop-types";
import { NavigationActions, StackActions } from "react-navigation";

import strings from "@language";
import Global from "../../lib/common";
import { auth, database } from "../../app/config";

import { setAuthData, setUserData } from "../../redux/actions/signUp.actions";

//Components
import { Container } from "../../components/common";
import { Icon, Text, Button, Scroll, Edit } from "../../components/controls";
import LinearGradient from 'react-native-linear-gradient';

//Styling
import { colors } from "../../theme";
import styles from "./styles";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      hidePassword: true,
      checkTrue: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  ///////////////////////
  //// FUNCTIONS ////////

  _onBackPress = () => {
    BackHandler.exitApp();
  }

  _onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  _goToSignUp = () => {
    this.props.navigation.navigate('signup');
  }

  _onValidate = () => {
    const { userName, password } = this.state;
    if (Global.validate('email', userName) && Global.validate('password', password)) {
      return true;
    }
  }

  _forgetPwd = () => {
    this.props.navigation.navigate('forgotPwd');
  }

  _navigateTo = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _handleLogin = (data) => {
    const { dispatch } = this.props;
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this._navigateTo('drawer');

        let { user } = resp;
        database.ref('authData').child(user.uid).once('value')
          .then((snapshot) => {
            const exists = (snapshot.val() !== null);

            if (exists) {
              user = snapshot.val(),
                dispatch(setAuthData(user));
            }
          })
          .catch((error) => Global.error(error.message));

        database.ref('userData').child(user.uid).once('value')
          .then((snapshot) => {
            const exists = (snapshot.val() !== null);

            if (exists) {
              user = snapshot.val();
              dispatch(setUserData(user));
            }
          })
          .catch((error) => Global.error(error.message));
      })
      .catch((error) => Global.error(error.message));
  }

  _onLogin = async () => {
    const { userName, password } = this.state;
    const userData = {
      email: userName,
      password,
    }
    if (this._onValidate()) {
      this._handleLogin(userData);
    }
  }

  //// FUNCTIONS ////////
  ///////////////////////

  ////////////////////////
  ////// VIEW ////////////

  // Content
  renderContent = () => {
    return (
      <Scroll>
        <LinearGradient colors={[colors.voilet, colors.dark_pink]} style={styles.container}>
          {this.renderCard()}
          {this._renderButtonView()}
        </LinearGradient>
      </Scroll>
    );
  };

  // Card
  renderCard = () => {
    const eyeIcon = this.state.hidePassword ? "mt visibility" : "mt visibility-off";
    const checkIcon = this.state.checkTrue ? "mt check-box" : "mt check-box-outline-blank"
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Text bold size={40} color={colors.white}>{strings.appName}</Text>
        </View>
        <View style={styles.textInputContainer}>
          <Icon size={20} name='sl user' color={colors.white} style={styles.iconStyle} />
          <Edit
            value={this.state.userName}
            style={styles.textInput}
            placeholder={strings.email}
            placeholderTextColor={colors.white}
            keyboardType="email-address"
            onChangeText={(text) => this._onChangeText('userName', text)}
            returnKeyType={"next"}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>
        <View style={[styles.textInputContainer, styles.passwordContainer]}>
          <Icon size={20} name='mt lock' color={colors.white} style={styles.iconStyle} />
          <Edit
            onRef={(input) => { this.passwordInput = input; }}
            value={this.state.password}
            style={styles.textInput}
            placeholder={strings.password}
            placeholderTextColor={colors.white}
            secureTextEntry={this.state.hidePassword}
            onChangeText={(text) => this._onChangeText('password', text)}
          />
          <Icon size={22} name={eyeIcon} color={colors.white} style={styles.iconStyle} onPress={() => this._onChangeText('hidePassword', !this.state.hidePassword)} />
        </View>
        <View style={styles.forgetView}>
          <Icon size={25} name={checkIcon} color={colors.white} onPress={() => this._onChangeText('checkTrue', !this.state.checkTrue)} />
          <View style={styles.bottomText}>
            <Text size={14} color={colors.white}>{strings.rememberMe}</Text>
            <Text size={14} color={colors.white} onPress={() => this._forgetPwd()}>{strings.forgotPwd}</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderButtonView = () => {
    const { userName, password } = this.state;
    const allowLogin = userName.length > 0 && password.length > 0;
    return (
      <View style={styles.buttonContainer}>
        <Button disabled={!allowLogin} style={allowLogin ? styles.loginButton : [styles.loginButton, styles.disabledLogin]} onPress={() => this._onLogin()}>
          <Text bold size={18} color={allowLogin ? colors.voilet : colors.white}>{strings.login}</Text>
        </Button>
        <Button style={styles.noAccTextView} onPress={() => this._goToSignUp()}>
          <Text size={14} color={colors.white}>{strings.noAccountText + ' '}</Text>
          <Text bold underline size={14} color={colors.white}>{strings.signUp}</Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Container>
        {this.renderContent()}
      </Container>
    );
  }
  ////// VIEW ////////////
  ////////////////////////
}

Login.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  theme: state.theme,
  incomeData: state.setIncomeDataReducer.incomeData,
  expenceData: state.setExpenceDataReducer.expenceData
});

export default connect(mapStateToProps)(Login);
