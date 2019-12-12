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
    ...bs.mv_2x,
    ...bs.mh_4x,
  },
  subContainer: {
    ...bs.pv_2x,
    ...bs.start_start,
  },
  textInputContainer: {
    ...bs.flex_row,
    ...bs.mt_8x,
    ...bs.center,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: sizes.em(25),
    backgroundColor: colors.white,
    opacity: 0.5,
    height: sizes.em(50)
  },
  passwordContainer: {
    ...bs.mt_4x
  },
  textInput: {
    ...bs.pl_3x,
    width: sizes.screen.width - sizes.em(50),
    fontSize: 20,
    color: colors.white,
  },
  iconStyle: {
    ...bs.ph_2x,
  },
  tocView: {
    ...bs.flex_row,
    ...bs.ml_2x,
    ...bs.mt_6x
  },
  bottomText: {
    ...bs.flex_row,
  },
  buttonContainer: {
    ...bs.mv_12x,
    ...bs.mh_4x,
    ...bs.center
  },
  signUpButton: {
    height: sizes.em(50),
    ...bs.full_width,
    borderRadius: sizes.em(25),
    ...bs.content_center,
    ...bs.item_center,
    backgroundColor: colors.white,
    opacity: 0.9
  },
  disabledSignUp: {
    opacity: 0.5
  },
  noAccTextView: {
    ...bs.flex_row,
    ...bs.center,
    ...bs.ph_4x,
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
