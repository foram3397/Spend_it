import { bs, sizes, colors } from "../../../theme";

const styles = {
    iconViewStyle: {
        ...bs.center,
        height: sizes.em(50),
        width: sizes.em(50),
        borderRadius: 15,
        backgroundColor: colors.lightYellow,
        opacity: 0.3
    },
    flexRow: {
        ...bs.flex_row,
        ...bs.pv_3x,
        ...bs.content_between,
        width: '100%',
    },
    categoryView: {
        ...bs.ml_2x,
        width: '40%',
    },
    rightView: {
        ...bs.ml_1x,
        width: '35%'
    },
    topMargin: {
        ...bs.mt_1x,
        ...bs.ph_1x
    }
};

export default styles;