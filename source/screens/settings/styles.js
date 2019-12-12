import { bs, sizes, colors } from "../../theme";

const styles = {
    header: {
        zIndex: 100,
        backgroundColor: colors.white
    },
    container: {
        ...bs.match_parent,
        ...bs.pv_4x,
        backgroundColor: colors.white
    },
    innerView: {

        height: sizes.em(50),
        ...bs.ph_3x,
        ...bs.content_between,
        backgroundColor: 'white',
        elevation: 5,
    },
    iconStyle: {
        ...bs.pt_1x
    },
    btnStyle: {
        ...bs.center,
        ...bs.content_between,
        ...bs.flex_row,
        height: sizes.em(50),
    }
};

export default styles;
