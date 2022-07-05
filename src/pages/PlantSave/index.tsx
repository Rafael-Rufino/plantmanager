import React, { useState } from "react";
import { View, Text, Image, Platform, Alert, ScrollView } from "react-native";

import { SvgFromUri } from "react-native-svg";
import waterDrop from "../../assets/waterdrop.png";
import { Button } from "../../components/Button";

import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import { useRoute, useNavigation } from "@react-navigation/core";

import { styles } from "./styles";
import isBefore from "date-fns/isBefore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";
import { IPlantProps, loadPlant, savePlant } from "../../libs/storage";
import colors from "../../../styles/colors";

interface IParams {
  plant: IPlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(
    Platform.OS === "ios"
  );

  const route = useRoute();
  const { plant } = route.params as IParams;

  const navigation = useNavigation();

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDateTimePicker((oldState) => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⏰");
    }

    if (dateTime) setSelectedDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDateTimePicker((oldState) => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo!",
        subTitle:
          "Fique tanquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado! 🤗",
        buttonTitle: "Muito Obrigado!",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possivel salvar. 😥");
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={150} height={150} />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterDrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:{" "}
          </Text>
          {showDateTimePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="clock"
              onChange={handleChangeTime}
            />
          )}
          {Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleOpenDateTimePickerForAndroid}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>{`Mudar Horário ${format(
                selectedDateTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}
