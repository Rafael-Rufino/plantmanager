import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.background,
  },
  content: {
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 30,
    marginBottom: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
