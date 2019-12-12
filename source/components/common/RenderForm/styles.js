import { bs, sizes, colors } from "../../../theme";

const styles = {
    container: {
        ...bs.match_parent,
        backgroundColor: colors.white,
    },
    textInputView: {
        ...bs.center,
        ...bs.mv_2x,
        height: sizes.em(50),
        ...bs.full_width,
        borderRadius: sizes.em(25),
        borderWidth: 1,
        borderColor: colors.lightGrey
    },
    flexRow: {
        ...bs.flex_row,
        ...bs.content_between,
    },
    formView: {
        ...bs.ph_3x,
        ...bs.full_width
    },
    textInput: {
        color: colors.voilet,
        ...bs.mh_2x
    },
    dateIcon: {
        position: 'absolute',
        left: 10,
        top: 5,
        marginLeft: 0
    },
    dateInput: {
        alignItems: 'flex-start',
        marginLeft: 50,
        borderWidth: 0
    },
    submitBtn: {
        ...bs.mv_8x,
        ...bs.center,
        height: sizes.em(50),
        ...bs.full_width,
        borderRadius: sizes.em(25)
    },
    widthStyle: {
        width: '48%'
    },
    containerStyle: {
        width: '92%',
        ...bs.pb_3x,
        //...bs.ph_2x
    },
    inputContainerStyle: {
        borderBottomColor: 'transparent'
    },
    pickerStyle: {
        // ...bs.mh_8x,
        ...bs.mt_12x,
        //left: 0,
        width: '83%',
        borderRadius: 15,
        borderColor: colors.lightGrey,
        borderWidth: 1
    }
};

export default styles;