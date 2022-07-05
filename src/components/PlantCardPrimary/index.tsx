import React from "react";

import { styles } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { SvgFromUri } from "react-native-svg";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}
export function PlantCardPrimary({ data, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View>
        <SvgFromUri
          uri={data.photo}
          style={styles.image}
          width={70}
          height={70}
        />
        <Text style={styles.text}>{data.name}</Text>
      </View>
    </RectButton>
  );
}
