//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";
import { NavigationActions, StackActions } from "react-navigation";
import { encrypt, decrypt } from 'react-native-simple-encryption';

import strings from "@language";
import Global from "../../lib/common";
import { auth, database } from "../../app/config";

//Components
import { Container } from "../../components/common";
import { Icon, Text, Button, Scroll, Edit } from "../../components/controls";
import LinearGradient from 'react-native-linear-gradient';
import { setAuthData, setUserData } from "../../redux/actions/signUp.actions";

//Styling
import { colors } from "../../theme";
import styles from "./styles";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confPassword: '',
      phoneNo: '',
      hidePassword: true,
      hideConfPassword: true,
      checkTrue: false
    };
  }

  componentDidMount() {
    // this.getData();
  }

  ///////////////////////
  //// FUNCTIONS ////////

  goToDetail = title => {
    navigation.detail({ title: title });
  };

  _onInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  _goToLogin = () => {
    this.props.navigation.navigate('login');
  }

  _onValidate = () => {
    const { email, password, phoneNo, confPassword } = this.state;
    if (Global.validate('email', email) && Global.validate('phone', phoneNo) && Global.validate('password', password) && Global.validate('matchPassword', password, confPassword)) {
      return true;
    } else {
      return false;
    }
  }

  _navigateTo = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _createUser = (user, userData) => {
    const { dispatch } = this.props;
    const userRef = database.ref().child('authData');

    const userD = {
      ...user,
      incomeLimit: 50000
    }


    userRef.child(user.uid).update({ ...userD })
      .then(() => {
        dispatch(setAuthData(userD));
      })
      .catch((error) =>
        Global.error(error.message))

    const userDataRef = database.ref().child('userData');

    userDataRef.child(user.uid).update({ ...userData })
      .then(() => {
        dispatch(setUserData(userData));
      })
      .catch((error) =>
        Global.error(error.message))

  }

  _handleSignUp = (data) => {
    const { email, password, userData } = data;
    let pwd = encrypt('userPwd', password);
    auth.createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        let user = { uid: resp.user.uid, email, pwd }
        this._createUser(user, userData);
        this._navigateTo('drawer');
      })
      .catch((error) => Global.error(error.message));
  }

  _onSignUp = async () => {
    const { firstName, lastName, email, phoneNo, password, checkTrue } = this.state;
    const SignUpData = {
      email,
      password,
      userData: {
        email,
        firstName,
        lastName,
        phoneNo,
        checkTrue,
      }
    }
    if (this._onValidate()) {
      this._handleSignUp(SignUpData);
    }
  }

  input = (
    placeholder,
    field,
    keyboard,
    secure,
    passwordIcon
  ) => {

    const eyeIcon = secure ? "mt visibility" : "mt visibility-off";
    return (
      <View style={styles.textInputContainer}>
        <Edit
          style={styles.textInput}
          placeholder={strings[placeholder]}
          placeholderTextColor={colors.white}
          value={this.state[field]}
          keyboardType={keyboard ? keyboard : "default"}
          secureTextEntry={secure ? true : false}
          onChangeText={text => this._onInput(field, text)}
        />
        {passwordIcon &&
          <Icon size={25} name={eyeIcon} color={colors.white} style={styles.iconStyle}
            onPress={() => (field === 'password') ?
              this._onInput('hidePassword', !secure)
              : this._onInput('hideConfPassword', !secure)}
          />}
      </View>
    );
  };

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

  renderForm = () => {
    const { hidePassword, hideConfPassword } = this.state;
    return (
      <View>
        {this.input('firstName', 'firstName')}
        {this.input('lastName', 'lastName')}
        {this.input('email', 'email', 'email-address')}
        {this.input('phoneNo', 'phoneNo', 'number-pad')}
        {this.input('password', 'password', undefined, hidePassword, true)}
        {this.input('confPassword', 'confPassword', undefined, hideConfPassword, true)}
      </View>
    )
  }

  // Card
  renderCard = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Text bold size={30} color={colors.white}>{strings.signUp}</Text>
        </View>
        {this.renderForm()}
        {this._renderToCView()}
      </View>
    );
  };

  _renderToCView = () => {
    const checkIcon = this.state.checkTrue ? "mt check-box" : "mt check-box-outline-blank"
    return (
      <View style={styles.tocView}>
        <Icon size={23} name={checkIcon} color={colors.white} onPress={() => this._onInput('checkTrue', !this.state.checkTrue)} />
        <View style={styles.bottomText}>
          <Text size={14} color={colors.white}>{strings.acceptText}</Text>
          <Text bold underline size={14} color={colors.white}>{strings.term}</Text>
          <Text size={14} color={colors.white}>{strings.and}</Text>
          <Text bold underline size={14} color={colors.white}>{strings.condition}</Text>
        </View>
      </View>
    );
  }

  _renderButtonView = () => {
    const { firstName, lastName, email, phoneNo, password, confPassword, checkTrue } = this.state;
    const allowSignUp = (firstName.length > 0 && lastName.length > 0 && email.length > 0 && phoneNo.length > 0 && password.length > 0 && confPassword.length > 0 && (checkTrue !== false));
    return (
      <View style={styles.buttonContainer}>
        <Button style={allowSignUp ? styles.signUpButton : [styles.signUpButton, styles.disabledSignUp]} disabled={!allowSignUp} onPress={() => this._onSignUp()}>
          <Text bold size={18} color={allowSignUp ? colors.voilet : colors.white}>{strings.signUp}</Text>
        </Button>
        <Button style={styles.noAccTextView} onPress={() => this._goToLogin()}>
          <Text size={14} color={colors.white}>{strings.haveAccountText}</Text>
          <Text bold underline size={14} color={colors.white}>{strings.login}</Text>
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

SignUp.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
  console.log('state', state.setAuthDataReducer)
  return ({
    theme: state.theme,
    authData: state.setAuthDataReducer.authData,
  })
};

export default connect(mapStateToProps)(SignUp);
