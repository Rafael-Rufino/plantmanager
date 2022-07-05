import React from "react";

import { styles } from "./styles";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Text, View, Animated } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../../../styles/colors";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };

  handleRemove: () => void;
}
export function PlantCardSecondary({
  data,
  handleRemove,
  ...rest
}: PlantProps) {
  return (
    <Swipeable
      overshootLeft={false}
      renderRightActions={() => (
        <Animated.View style={styles.rightActions}>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri
          uri={data.photo}
          style={styles.image}
          width={50}
          height={50}
        />
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar ás </Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}
