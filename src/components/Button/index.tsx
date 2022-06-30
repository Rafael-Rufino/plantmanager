import React from "react";

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}
export function Button({ title, ...props }: IButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
