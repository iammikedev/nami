import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box } from "native-base";
import React, { useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { fontFamily, formFieldMetrics, spacing, useNamiColors } from "../theme";

type InputFieldProps = TextInputProps & {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  containerStyle?: StyleProp<ViewStyle>;
  error?: boolean;
};

export function InputField({
  icon,
  containerStyle,
  style,
  error,
  ...props
}: InputFieldProps) {
  const theme = useNamiColors();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.semantic.error
    : focused
      ? theme.primary
      : theme.border;

  const shellStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: formFieldMetrics.borderWidth,
    borderRadius: formFieldMetrics.borderRadius,
    borderColor,
    backgroundColor: theme.surfaceElevated,
    paddingHorizontal: formFieldMetrics.paddingHorizontal,
    minHeight: formFieldMetrics.minHeight,
  };

  const inputStyle: StyleProp<TextStyle> = [
    {
      flex: 1,
      paddingVertical: 14,
      fontSize: formFieldMetrics.fontSize,
      lineHeight: formFieldMetrics.lineHeight,
      fontFamily: fontFamily.primary,
      color: theme.textPrimary,
    },
    style,
  ];

  return (
    <Box style={containerStyle}>
      <View style={shellStyle}>
        <TextInput
          {...props}
          placeholderTextColor={theme.textSecondary}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          style={inputStyle}
        />
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={theme.textSecondary}
            style={{ marginLeft: spacing[2] }}
          />
        ) : null}
      </View>
    </Box>
  );
}
