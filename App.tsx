import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Welcome } from "./src/pages/Welcome";

export default function App() {
  return (
    <View style={styles.container}>
      <Welcome />
      {/* <StatusBar style="dark" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
