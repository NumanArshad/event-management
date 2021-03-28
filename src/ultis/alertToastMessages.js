import { Alert, ToastAndroid } from "react-native";

export const alertMessage = (showText,  alertBody ) => {
  alertBody ?
    Alert.alert("", showText, alertBody) :
    Alert.alert("", showText);
};

export const toastMessages = (showMessage, bottomMargin=25) => {
  ToastAndroid.showWithGravityAndOffset(
    showMessage,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    bottomMargin
  );
};
