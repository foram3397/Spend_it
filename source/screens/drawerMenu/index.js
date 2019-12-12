import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { DrawerActions } from 'react-navigation-drawer';

import { auth } from "../../app/config";
import strings from "@language";


import { LogOut } from "../../redux/actions/signUp.actions";
import { resetIncomeData } from "../../redux/actions/income.actions";
import { resetExpenceData } from "../../redux/actions/expence.actions";
import { Image, Text, Button, Icon, Scroll } from "../../components/controls";

//Styling
import { colors, images, bs } from "../../theme";
import Global from '../../lib/common';

class DrawerMenu extends Component {
    constructor(props) {
        super(props);
    }

    _onLogout = async () => {
        const { dispatch } = this.props;
        auth.signOut()
            .then(() => dispatch(LogOut()),
                dispatch(resetIncomeData()),
                dispatch(resetExpenceData())
            )
            .catch((error) => Global.error(error.message));

        this._navigate('login');
    }

    _navigate = (routeName) => {
        this.props.navigation.navigate(routeName);
    }

    _onPressField = async (index) => {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        if (index === 0) {
            this._navigate('setting');
        } else if (index === 1) {
            this._onLogout();
        }

    }

    _renderFields = (index, iconName, field, _onPress) => {
        return (
            <Button style={styles.drawerContent} onPress={() => _onPress(index)}>
                <Icon name={iconName} size={18} color={colors.grey} style={styles.iconStyle} />
                <Text bold size={16} color={colors.grey} style={styles.textStyle}>{field}</Text>
            </Button>
        )
    }

    render() {
        const { userData } = this.props;
        return (
            <Scroll>
                <View style={styles.container}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.voilet, colors.dark_pink]} style={styles.upperView}>
                        <View style={styles.userBtn}>
                            <Image file={images.user_img} style={styles.icon} />
                        </View>
                        <Text bold size={16} color={colors.white} numberOfLines={1} style={styles.nameText} center>{(userData !== null) && userData.firstName + " " + userData.lastName}</Text>
                    </LinearGradient>
                    {this._renderFields(0, 'sl settings', strings.setting, this._onPressField)}
                    {this._renderFields(1, 'sl power', strings.logout, this._onPressField)}
                </View>
            </Scroll>
        );
    }
}

const mapStateToProps = state => {
    return ({
        userData: state.setAuthDataReducer.userData
    })
};

export default connect(mapStateToProps)(DrawerMenu);