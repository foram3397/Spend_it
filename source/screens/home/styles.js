import { bs, sizes, colors } from "../../theme";

const styles = {
  header: {
    zIndex: 100,
    backgroundColor: colors.white
  },
  loader: {
    ...bs.flex,
    ...bs.match_parent,
    ...bs.center
  },
  container: {
    ...bs.match_parent,
    backgroundColor: colors.white,
  },
  recentContainer: {
    // height: sizes.screen.height - sizes.em(340),
    width: sizes.screen.width - sizes.em(30)
  },
  card: {
    ...bs.mt_8x,
    // ...bs.ph_2x,
    height: sizes.em(150),
    ...bs.full_width,
  },
  cardInnerView: {
    ...bs.item_start,
    ...bs.mh_4x,
    width: '50%',
  },
  iconStyle: {
    ...bs.pr_1x,
  },
  shadowStyle: {
    height: sizes.em(50),
    width: '95%',
    borderRadius: 25,
    opacity: 0.4,
    top: sizes.em(-43)
  },
  boxView: {
    ...bs.mv_2x,
  },
  flexRow: {
    ...bs.flex_row,
    ...bs.mr_4x,
    ...bs.content_between
  },
  rowFlex: {
    ...bs.flex_row,
  },
  activeView: {
    ...bs.mt_1x,
    height: 6,
    width: sizes.em(115),
    borderRadius: 5
  },
  incomeStyle: {
    width: sizes.em(52),
    ...bs.mh_3x
  },
  recentView: {
    ...bs.mt_5x,
  },
  chartStyle: {
    height: sizes.em(50),
    width: sizes.em(110)
  },
  textInput: {
    color: colors.voilet,
    ...bs.mh_3x,
    fontWeight: 'bold'
  },
  textStyle: {
    ...bs.ml_5x,
    width: '80%',
    height: '25%'
  },
  textHeight: {
    height: sizes.em(15)
  },
  textInputContainer: {
    ...bs.flex_row,
    ...bs.mt_5x,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 25,
    ...bs.center,
    ...bs.pr_2x
  },
  buttonStyle: {
    ...bs.center,
    ...bs.self_end,
    position: 'absolute',
    right: sizes.em(20),
    bottom: '12%',
    height: sizes.em(70),
    width: sizes.em(70),
    borderRadius: sizes.em(35),
    elevation: 25,
  },
};

export default styles;
