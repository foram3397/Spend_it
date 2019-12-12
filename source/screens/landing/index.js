//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import PropTypes from "prop-types";

//Local Libraries
import Global from "@common-functions";
import local from "@local-db";
import { auth, database } from "../../app/config";

//Redux
import { setTheme } from "../../redux/actions/theme.actions";
import { setLanguage } from "../../redux/actions/language.actions";
import { setAuthData, setUserData } from "../../redux/actions/signUp.actions";
import { setIncomeData } from "../../redux/actions/income.actions";
import { setExpenceData, popupExpenceData } from "../../redux/actions/expence.actions";

//Components
import { Container, Loader } from "../../components/common";

//Styling
import styles from "./styles";
import { StackActions, NavigationActions } from "react-navigation";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.getSavedTheme();
    this.setLanguage();
  }

  ///////////////////////
  //// FUNCTIONS ////////

  getSavedTheme = async () => {
    const { dispatch } = this.props;
    const localTheme = await local.getOne("appTheme");
    if (localTheme) {
      dispatch(setTheme(localTheme.data));
    }
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        this._goToLogin();
      });
    }, 2500);
  };

  setLanguage = () => {
    const { dispatch, language } = this.props;
    const code = language;
    Global.setLanguage(code);
    dispatch(setLanguage(code));
  };

  _navigateTo = routeName => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _setData = (user) => {
    const { dispatch } = this.props;
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
          user = snapshot.val(),
            dispatch(setUserData(user));
          dispatch(popupExpenceData(user.neverShowPopup))

        }
      })
      .catch((error) => Global.error(error.message));
  }

  _setIncomeData = async (user) => {
    const { dispatch } = this.props;
    await database.ref(`userData/${user.uid}/incomeData/`).once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let keyId = childSnapshot.key;
          let value = childSnapshot.val();
          dispatch(setIncomeData(value));
        });
      }).catch((error) => Global.error(error.message));
  }

  _setExpenceData = async (user) => {
    const { dispatch } = this.props;
    await database.ref(`userData/${user.uid}/expenceData/`).once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let keyId = childSnapshot.key;
          let value = childSnapshot.val();
          dispatch(setExpenceData(value));
        });
      }).catch((error) => Global.error(error.message));
  }

  _goToLogin = async () => {
    auth.onAuthStateChanged((user) => {
      let isLoggedIn = (user !== null);

      if (isLoggedIn) {
        this._setData(user);
        this._setIncomeData(user);
        this._setExpenceData(user);
        this._navigateTo("drawer")
      } else {
        this._navigateTo("login");
      }
    })
  };
  //// FUNCTIONS ////////
  ///////////////////////

  ////////////////////////
  ////// VIEW ////////////

  // Loading
  renderLoading = () => (
    <View style={styles.loader}>
      <Loader />
    </View>
  );

  render() {
    return <Container>{this.renderLoading()}</Container>;
  }

  ////// VIEW ////////////
  ////////////////////////
}

Landing.propTypes = {
  dispatch: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
  return ({
    theme: state.theme,
    language: state.language,
    isLoggedIn: state.setAuthDataReducer,
  });
}

export default connect(mapStateToProps)(Landing);
