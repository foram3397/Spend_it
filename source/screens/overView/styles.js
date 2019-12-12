import { bs, sizes, colors } from "../../theme";

const styles = {
    container: {
        ...bs.match_parent,
        backgroundColor: colors.white,
    },
    cardStyle: {
        ...bs.full_width,
        height: sizes.screen.height / 2,
        borderRadius: 25,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    shadowStyle: {
        height: sizes.em(50),
        width: '90%',
        borderRadius: 25,
        opacity: 0.4,
        top: sizes.em(-40)
    },
    btnStyle: {
        width: sizes.screen.width / 7,
        height: sizes.em(40),
        ...bs.center,
    },
    activeText: {
        height: sizes.em(35),
        width: sizes.em(60),
        borderRadius: sizes.em(20),
        backgroundColor: colors.voilet
    },
    headerText: {
        ...bs.center,
        ...bs.ml_11x,
        width: '80%',
        height: sizes.em(40),
    },
    flexRow: {
        ...bs.flex_row,
        ...bs.ph_2x
    },
    switchUpperView: {
        ...bs.center,
        width: '100%',
    },
    chartView: {
        ...bs.mt_7x,
        width: '100%'
    },
    switchView: {
        ...bs.mt_4x,
        ...bs.flex_row,
        backgroundColor: colors.voilet,
        width: sizes.em(180),
        height: sizes.em(28),
        borderRadius: sizes.em(25),
        ...bs.content_between,
    },
    activeView: {
        ...bs.center,
        top: -5,
        backgroundColor: colors.white,
        width: sizes.em(100),
        height: sizes.em(35),
        borderRadius: sizes.em(25),
    },
    inActiveView: {
        ...bs.center,
        width: sizes.em(80),
    },
    listView: {
        ...bs.mt_8x,
        width: '100%',
    },
    progressCircleStyle: {

        // borderRadius: sizes.em(20)
    },
    circleStyle: { width: '50%', ...bs.center, ...bs.pb_5x, },
    chartStyle: { height: sizes.em(110) }
}

export default styles;