import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    flexDirection: "row",
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
  text: {
    color: colors.heading,
    padding: 4,
    fontFamily: fonts.text,
  },
});
