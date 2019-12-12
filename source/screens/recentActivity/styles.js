import { bs, sizes, colors } from "../../theme";

const styles = {
    container: {
        height: sizes.screen.height - sizes.em(340),
        width: sizes.screen.width - sizes.em(30)
    },
    iconViewStyle: {
        ...bs.center,
        height: sizes.em(50),
        width: sizes.em(50),
        borderRadius: 15,
        backgroundColor: colors.lightYellow,
    },
    flexRow: {
        ...bs.flex_row
    },
    categoryView: {
        ...bs.ml_2x,
        width: sizes.screen.width / 2.5
    },
    rightView: {
        ...bs.ml_2x,
        width: sizes.screen.width / 3.5
    },
    topMargin: {
        ...bs.mt_1x
    },
    separatorStyle: {
        height: 2,
        backgroundColor: colors.lightGrey
    },
    textInput: {
        color: colors.voilet,
        ...bs.mh_3x,
        fontWeight: 'bold'
    },
    textInputContainer: {
        ...bs.flex_row,
        ...bs.mb_3x,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: 25,
        ...bs.center,
        ...bs.pr_2x
    },
};

export default styles;