import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import strings from "@language";

//Components
import { Icon, Text, Button, Border, Scroll } from "../../components/controls";
import { Container } from "../../components/common";

//Styling
import { colors } from "../../theme";
import styles from './styles';

class RenderDetail extends Component {

    _onBackPress = () => {
        this.props.navigation.pop();
    }

    renderNavbar = () => {
        return (
            <Border theme="navbar" bstyle={styles.header}>
                <Button theme="navbar.left" onPress={() => this._onBackPress()}>
                    <Icon color={colors.black} name="io ios-arrow-round-back" size={30} />
                </Button>
                <Text bold color={colors.black} size={16}>
                    {strings.detail.toUpperCase()}
                </Text>
            </Border>
        )
    }

    _renderData = (label, text) => {
        return (
            <View style={styles.dataView}>
                <Text size={16} color={colors.black} bold >{label}</Text>
                <View style={styles.borderView}>
                    <Text size={12} bold color={colors.voilet} style={styles.textStyle}>{text}</Text>
                </View>
            </View>
        )
    }

    renderContent = () => {
        const { data } = this.props.navigation.state.params;
        return (
            <Scroll>
                <View style={styles.container}>
                    {this._renderData(strings.description, data.description)}
                    {this._renderData(strings.categoryName, data.categoryName)}
                    {this._renderData(strings.categoryType, data.categoryType)}
                    {this._renderData(strings.amount, data.amount)}
                    {this._renderData(strings.date, data.date)}
                    {this._renderData(strings.type, data.type)}
                </View>
            </Scroll>
        )
    }

    render() {
        return (
            <Container>
                {this.renderNavbar()}
                {this.renderContent()}
            </Container>
        );
    }
}

RenderDetail.propTypes = {
    categoryName: PropTypes.string,
    description: PropTypes.string,
    categoryType: PropTypes.string,
    amount: PropTypes.any,
    date: PropTypes.string,
    type: PropTypes.string
};


export default RenderDetail;