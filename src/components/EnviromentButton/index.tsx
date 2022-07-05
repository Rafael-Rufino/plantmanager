import React from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

interface IEnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnviromentButton({
  title,
  active,
  ...rest
}: IEnviromentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
}
