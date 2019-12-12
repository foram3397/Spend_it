import { bs, sizes, colors } from "../../theme";

const styles = {
    header: {
        zIndex: 100,
        backgroundColor: colors.white
    },
    container: {
        ...bs.match_parent,
        ...bs.p_4x,
        backgroundColor: colors.white
    },
    dataView: {
        ...bs.mt_2x
    },
    borderView: {
        borderBottomColor: colors.dimGrey,
        borderBottomWidth: 1
    },
    textStyle: {
        ...bs.pv_2x
    }
}

export default styles;