import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { EnviromentButton } from "../../components/EnviromentButton";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";

import colors from "../../../styles/colors";

import api from "../../services/api";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { IPlantProps } from "../../libs/storage";

interface IEnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<IEnviromentProps[]>([]);
  const [plants, setPlants] = useState<IPlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState<string>("all");
  const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const navigation = useNavigation();

  function handleEnviromentSelect(environment: string) {
    setEnviromentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `/plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );
    if (!data) return setIsLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: IPlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get(
        "/plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (isLoading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você que colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key == enviromentSelected}
              onPress={() => handleEnviromentSelect(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.green} size="large" />
            ) : (
              <></>
            )
          }
        />
      </View>
    </View>
  );
}
{
  /* no Flatlist ao colocar a propriedade horizontal ela coloca os itens em linhas */
}
{
  /* showsHorizontalScrollIndicato retira a barra de rolagem */
}
{
  /* contentContainerStyle é para colocar o conteúdo dentro do Flatlist */
}
{
  /* numColumns é para colocar os itens em quantas colunas necessitar */
}
