import { bs, sizes, colors } from "../../theme";

const styles = {
    container: {
        // height: sizes.screen.height - sizes.em(340),
        //width: sizes.screen.width - sizes.em(30)
    },
    buttonStyle: {
        ...bs.center,
        ...bs.self_end,
        top: sizes.em(-120),
        height: sizes.em(70),
        width: sizes.em(70),
        borderRadius: sizes.em(35),
        elevation: 25
    },
    modalView: {
        ...bs.flex,
        ...bs.self_center,
        ...bs.mv_12x,
        backgroundColor: colors.white,
        borderRadius: 20,
        width: '90%',
        elevation: 5
    },
    modalParentView: {
        backgroundColor: colors.transparentBlack,
        flex: 1
    },
    closeBtn: {
        ...bs.m_2x,
        ...bs.self_end,
        ...bs.center,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        height: sizes.em(40),
        width: sizes.em(40),
        borderRadius: sizes.em(20),
        backgroundColor: colors.white,
        opacity: 0.9
    },
    formView: {
        ...bs.ph_3x
    },
    textInputView: {
        ...bs.mv_2x,
        height: sizes.em(50),
        ...bs.full_width,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.lightGrey
    },
    separatorStyle: {
        height: 2,
        backgroundColor: colors.lightGrey
    },
};

export default styles;