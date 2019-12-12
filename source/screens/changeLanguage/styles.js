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
        ...bs.start_center,
        ...bs.flex_row,
        height: sizes.em(50),
        ...bs.pl_3x,
        
        backgroundColor : 'white',
        elevation:5,
    },
    iconStyle: {
        ...bs.pt_1x
    },
    btnStyle: {
        ...bs.center,
        height: sizes.em(50),
        width: sizes.em(50),
    }
};

export default styles;
