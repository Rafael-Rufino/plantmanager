import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: getStatusBarHeight(),
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    color: colors.gray,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.green,
  },
  greenting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
