import { useNavigation, useRoute } from "@react-navigation/core";

import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { Button } from "../../components/Button";

import { styles } from "./styles";

interface IParams {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: "smile" | "hub";
  nextScreen: string;
}

const emojis = {
  smile: "😀",
  hub: "💡",
};

export function Confirmation() {
  const navigation = useNavigation();

  const route = useRoute();

  const { title, subTitle, buttonTitle, icon, nextScreen } =
    route.params as IParams;

  function handlePLantSelect() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handlePLantSelect} />
        </View>
      </View>
    </SafeAreaView>
  );
}
