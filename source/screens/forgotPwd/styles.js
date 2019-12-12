import { bs, sizes, colors } from "../../theme";

const styles = {
    header: {
        zIndex: 100
    },
    container: {
        ...bs.match_parent,
        backgroundColor: colors.white
    },
    mainContainer: {
        ...bs.mv_8x,
    },
    subContainer: {
        ...bs.pt_12x,
        ...bs.ph_4x,
    },
    textInputContainer: {
        ...bs.flex_row,
        ...bs.mh_4x,
        ...bs.mt_6x,
        ...bs.mb_12x,
        ...bs.center,
        height: sizes.em(50),
        borderColor: colors.lightGrey,
        borderWidth: 1,
        borderRadius: sizes.em(25),
        backgroundColor: colors.white,
        opacity: 0.5
    },
    passwordContainer: {
        ...bs.mt_4x
    },
    textInput: {
        width: sizes.screen.width - sizes.em(50),
        fontSize: 20,
        color: colors.white,
    },
    iconStyle: {
        ...bs.ph_2x,
    },
    forgetView: {
        ...bs.mt_1x,
        ...bs.flex_row,
        ...bs.mh_6x,
    },
    bottomText: {
        width: sizes.screen.width - sizes.em(80),
        ...bs.flex_row,
        ...bs.content_between
    },
    buttonContainer: {
        ...bs.mt_12x,
        ...bs.mh_4x,
        ...bs.mb_8x,
        ...bs.center,
    },
    loginButton: {
        height: sizes.em(50),
        ...bs.full_width,
        borderRadius: sizes.em(25),
        ...bs.center,
        backgroundColor: colors.white,
        opacity: 0.9
    },
    disabledLogin: {
        opacity: 0.5
    },
    noAccTextView: {
        ...bs.flex_row,
        ...bs.ph_5x,
        ...bs.mt_4x,
        width: sizes.screen.width - sizes.em(40),
    },
    card: {
        ...bs.mt_4x,
        ...bs.center,
        height: sizes.em(180)
    },
    button: {
        ...bs.between_center,
        ...bs.full_width
    }
};

export default styles;
