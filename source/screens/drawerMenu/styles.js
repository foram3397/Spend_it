import { bs, sizes, colors } from "../../theme";

const styles = {
  container: { ...bs.match_parent },
  upperView: {
    height: sizes.em(250),
    ...bs.center
  },
  userBtn: {
    height: sizes.em(130),
    width: sizes.em(130),
    borderRadius: sizes.em(65),
    backgroundColor: colors.white,
    ...bs.mb_2x,
  },
  nameText: {
    width: sizes.em(200),
  },
  icon: {
    height: sizes.em(130),
    width: sizes.em(130),
    borderRadius: sizes.em(65),
  },
  drawerContent: {
    ...bs.p_2x,
    ...bs.flex_row,
    height: sizes.em(50),
    ...bs.start_center,
  },
  iconStyle: {
    ...bs.pt_2x,
    ...bs.pr_6x
  },
  textStyle: {
    ...bs.pt_1x
  }
};

export default styles;
