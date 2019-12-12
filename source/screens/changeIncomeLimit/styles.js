import { bs, sizes, colors } from "../../theme";

const styles = {
    header: {
        zIndex: 100,
        backgroundColor: colors.white
    },
    container: {
        ...bs.match_parent,
        ...bs.pv_4x,
        backgroundColor: colors.white,
    },
    textInputContainer: {
        ...bs.flex_row,
        ...bs.mh_4x,
        ...bs.mt_5x,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: sizes.em(25),
        backgroundColor: colors.white,
        opacity: 0.5,
        height: sizes.em(50),
    },
    submitBtn: {
        ...bs.mh_4x,
        ...bs.mt_12x,
        ...bs.center,
        ...bs.self_center,
        height: sizes.em(50),
        width: sizes.screen.width / 2,
        borderRadius: sizes.em(25)
    },
    textInput: {
        fontSize: 20,
        color: colors.voilet,
        ...bs.mh_2x,
    },
};

export default styles;
