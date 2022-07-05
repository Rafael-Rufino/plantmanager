import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import avatar from "../../assets/rafael.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || "");
    }
    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greenting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={avatar} style={styles.image} />
    </View>
  );
}
