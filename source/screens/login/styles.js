import { bs, sizes, colors } from "../../theme";

const styles = {
  header: {
    zIndex: 100
  },
  loader: {
    ...bs.flex,
    ...bs.match_parent,
    ...bs.center
  },
  container: {
    ...bs.match_parent,
    backgroundColor: colors.white
  },
  mainContainer: {
    ...bs.mv_12x,
  },
  subContainer: {
    ...bs.pv_12x,
    ...bs.item_center,
  },
  textInputContainer: {
    ...bs.flex_row,
    ...bs.center,
    ...bs.mh_4x,
    ...bs.mt_12x,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: sizes.em(25),
    backgroundColor: colors.white,
    opacity: 0.5,
    height: sizes.em(50),
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
    ...bs.mt_2x,
    ...bs.flex_row,
    ...bs.mh_6x,
  },
  bottomText: {
    ...bs.full_width,
    ...bs.flex_row,
    ...bs.content_between,
    ...bs.pr_8x
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
    ...bs.center,
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
