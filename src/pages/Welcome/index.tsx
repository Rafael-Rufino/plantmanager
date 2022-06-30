import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import wateringImg from "../../assets/watering.png";

import { styles } from "./styles";
import colors from "../../../styles/colors";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>
        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas{"\n"}
          plantas. Nós cuidamos de lembrar você{"\n"}
          sempre que precisar.
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonIcon}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            <Feather name="chevron-right" size={24} color={colors.white} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
