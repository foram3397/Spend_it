import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

//Local Libraries
import apis from "@apis";
import navigation from "@navigation/services";
import log from "@log";
import Global from "../../../lib/common";
import strings from "@language";
import expenceCategoryDataArray from "../../../localization/categoryData"

//Components
import { Icon, Text, Button } from "../../controls";

//Styling
import { colors } from "../../../theme";
import styles from "./styles";
import moment from "moment";

export const getColor = (categoryName) => {
    let d = expenceCategoryDataArray;
    let color;
    for (let i = 0; i < d.length; i++) {
        if (d[i].name === categoryName) {
            color = d[i].color
        }
    }
    return color;
}

const RenderRow = (props) => {
    const { description, categoryName, categoryType, amount, date, type, onPress } = props;
    const iconColor = (type === 'income') ? colors.green : colors.red;
    const formattedDate = moment(date).format('DD MMM, HH:MM A')

    return (
        <Button style={styles.flexRow} onPress={onPress}>
            <View style={[styles.iconViewStyle, { backgroundColor: getColor(categoryName) }]}>
                <Icon name={strings[categoryName.toLowerCase()]} size={25} color={colors.red} />
            </View>
            <View style={styles.categoryView}>
                <Text bold size={14} color={colors.black} numberOfLines={1}>{description} </Text>
                <Text size={12} color={colors.lightGrey} >{categoryType}</Text>
            </View>
            <View style={styles.rightView}>
                <Text color={colors.voilet} size={14} numberOfLines={1} right> {strings.rupeeSign + ' '}
                    <Text bold color={colors.voilet} size={16}>{Global.formatRupee(amount)}</Text>
                </Text>
                <Text size={12} color={colors.lightGrey} right>{formattedDate}</Text>
            </View>
            <View style={styles.topMargin}>
                <Icon name={strings[type]} size={18} color={iconColor} />
            </View>
        </Button>
    );
}

RenderRow.propTypes = {
    categoryName: PropTypes.string,
    description: PropTypes.string,
    categoryType: PropTypes.string,
    amount: PropTypes.any,
    date: PropTypes.string,
    type: PropTypes.string
};


export default RenderRow;