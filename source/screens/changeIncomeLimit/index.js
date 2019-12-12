import React, { Component } from 'react';
import { connect } from "react-redux";
import { View } from 'react-native';
import PropTypes from "prop-types";
import Firebase from 'react-native-firebase';

import strings from "@language";
import Global from "@common-functions";

import { setAuthData } from "../../redux/actions/signUp.actions";
import { popupExpenceData } from "../../redux/actions/expence.actions";
import { database } from "../../app/config";

import { Text, Button, Border, Icon, RadioButton, Edit } from "../../components/controls";
import { Container } from "../../components/common";

//Styling
import { colors } from "../../theme";
import styles from './styles';

const { currentUser } = Firebase.auth();

class ChangeIncomeLimit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeLimit: '',
        }
    }

    _onChangeText = (text) => {
        this.setState({
            incomeLimit: text
        })
    }

    _onBackPress = () => {
        this.props.navigation.pop();
    }

    _onPress = () => {
        const { authData, dispatch } = this.props;
        const { incomeLimit } = this.state;

        database.ref(`authData/${currentUser.uid}/`).update({
            incomeLimit: incomeLimit
        }).then(() => {

            let data = {
                ...authData,
                incomeLimit
            }
            dispatch(setAuthData(data));

        }).catch((error) => Global.error(error.message));

        this.setState({
            incomeLimit: ''
        })

        database.ref(`userData/${currentUser.uid}/`).update({
            neverShowPopup: false
        }).then(() => {
            dispatch(popupExpenceData(false))
        }).catch((error) => Global.error(error.message));
    }

    _renderNavbar = () => (
        <Border theme="navbar" bstyle={styles.header}>
            <Button theme="navbar.left" onPress={this._onBackPress}>
                <Icon color={colors.black} name={"io ios-arrow-round-back"} size={30} />
            </Button>
            <Text bold color={colors.black} size={16}>
                {strings.changeIncomeLimit.toUpperCase()}
            </Text>
        </Border>
    );

    _renderContainer = () => {
        const { incomeLimit } = this.state;
        const allowSubmit = incomeLimit.length > 0;
        return (
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <View style={styles.textInputContainer}>
                        <Edit
                            defaultValue={incomeLimit}
                            style={styles.textInput}
                            placeholder={strings.changeIncomeLimit}
                            placeholderTextColor={colors.lightGrey}
                            keyboardType="number-pad"
                            onChangeText={(text) => this._onChangeText(text)}
                        />
                    </View>
                    <Button disabled={!allowSubmit} linearGradient style={styles.submitBtn} onPress={() => this._onPress()}>
                        <Text bold size={18} color={colors.white}>{strings.submit.toUpperCase()}</Text>
                    </Button>
                </View>
            </View>
        );
    }

    render() {
        return (
            <Container>
                {this._renderNavbar()}
                {this._renderContainer()}
            </Container>
        );
    }
}

ChangeIncomeLimit.propTypes = {
    dispatch: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
    theme: state.theme,
    language: state.language,
    authData: state.setAuthDataReducer.authData
});

export default connect(mapStateToProps)(ChangeIncomeLimit);