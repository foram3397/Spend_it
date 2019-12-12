//Global Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler } from "react-native";
import PropTypes from "prop-types";

//Local Libraries
import strings from "@language";
import Global from "../../lib/common";
import { auth } from "../../app/config";

//Components
import { Container } from "../../components/common";
import { Icon, Text, Button, Scroll, Edit } from "../../components/controls";
import LinearGradient from 'react-native-linear-gradient';

//Styling
import { colors } from "../../theme";
import styles from "./styles";


class ForgotPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
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
        this.props.navigation.pop();
    }

    _onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    _onValidate = () => {
        const { userName } = this.state;
        if (Global.validate('email', userName)) {
            return true;
        }
    }

    _forgetPwd = () => {
        const { userName } = this.state;
        auth.sendPasswordResetEmail(userName)
            .then(function () {
                Global.error('Please check your email...')
            }).catch(function (e) {
                Global.error(e.message)
            })
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
        return (
            <View style={styles.mainContainer}>
                <Button theme="navbar.left" onPress={this._onBackPress}>
                    <Icon name="io ios-arrow-round-back" size={35} color={colors.white} />
                </Button>
                <View style={styles.subContainer}>
                    <Text bold size={30} color={colors.white}>{strings.forgetPwd}</Text>
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
                    />
                </View>
            </View>
        );
    };

    _renderButtonView = () => {
        const { userName } = this.state;
        const allowLogin = userName.length > 0;
        return (
            <View style={styles.buttonContainer}>
                <Button disabled={!allowLogin} style={allowLogin ? styles.loginButton : [styles.loginButton, styles.disabledLogin]} onPress={() => this._forgetPwd()}>
                    <Text bold size={18} color={allowLogin ? colors.voilet : colors.white}>{strings.reset}</Text>
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

ForgotPwd.propTypes = {
    dispatch: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
    theme: state.theme
});

export default connect(mapStateToProps)(ForgotPwd);
