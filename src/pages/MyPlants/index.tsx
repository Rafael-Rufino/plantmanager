import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, Alert } from "react-native";
import { Header } from "../../components/Header";
import { styles } from "./styles";

import waterDrop from "../../assets/waterdrop.png";
import { IPlantProps, loadPlant, removePlant } from "../../libs/storage";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";
import { Load } from "../../components/Load";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<IPlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(plant: IPlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏 ",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover a plantinha");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWaterd(
        `Não esqueça de regar a ${plantsStoraged[0].name} â ${nextTime} horas.`
      );
      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
