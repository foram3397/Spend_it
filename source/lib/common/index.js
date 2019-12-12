import strings from "@language";
import { Alert } from "react-native";

class Global { }

/**
 *  Generate n number of long random string
 */
Global.getRandom = length => {
  var l = length ? length : 10;
  var text = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < l; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
};

/**
 *  Set language
 */
Global.setLanguage = code => {
  strings.setLanguage(code);
};

/**
 *  Color is Dark or Not?
 */
Global.isDarkOrLight = color => {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
};

Global.validate = (key, value, value2, showAlert = true) => {
  const EMAIL_RE = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,13}$/;
  const PHONE_RE = /^(?=.*[0-9]).{10,10}$/;
  const ZIP_RE = /^(?=.*[0-9]).{5,8}$/;

  switch (key) {
    case "email": {
      if (EMAIL_RE.test(String(value).toLowerCase())) {
        return true;
      } else {
        if (showAlert) Global.error(strings.emailError);
        return;
      }
    }
    case "phone": {
      if (PHONE_RE.test(String(value).toLowerCase())) {
        return true;
      } else {
        if (showAlert) Global.error(strings.phoneError);
        return;
      }
    }
    case "password": {
      if (PASSWORD_RE.test(String(value))) {
        return true;
      } else {
        if (showAlert) Global.error(strings.passwordError);
        return;
      }
    }
    case "matchPassword": {
      if (value === value2) {
        return true;
      } else {
        if (showAlert) Global.error(strings.passwordMatchError);
        return;
      }
    }
    default:
      break;
  }
};

Global.error = (message, callback, showOptions, neverCallback) => (
  Alert.alert(
    strings.appName,
    message,
    [
      showOptions && {
        text: "Don't show me again",
        onPress: neverCallback ? neverCallback : () => { }
      },
      showOptions && {
        text: "Cancel",
        onPress: () => { }
      },
      {
        text: 'OK',
        onPress: callback ? callback : () => { }
      }
    ]
  )
);

// for Formatting number to Rupees

Global.formatRupee = (value) => {
  if (value !== undefined) {
    let r = value.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    if (r.includes('-')) {
      r = r.replace('-', '')
    }
    return r;
  }
}

export default Global;
