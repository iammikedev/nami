import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Box, Icon, Input } from "native-base";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

import { radius, spacing, useNamiColors } from "../theme";

type InputFieldProps = TextInputProps & {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputField({ icon, containerStyle, style, ...props }: InputFieldProps) {
  const theme = useNamiColors();
  const [focused, setFocused] = useState(false);
  return (
    <Box style={containerStyle}>
      <Input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        style={style}
        minH={12}
        borderWidth={1}
        borderRadius={radius.lg}
        px={spacing[3]}
        py={spacing[2]}
        borderColor={focused ? theme.primary : theme.border}
        backgroundColor={theme.surfaceElevated}
        color={theme.textPrimary}
        placeholderTextColor={theme.textSecondary}
        InputRightElement={
          icon ? (
            <Icon
              as={MaterialCommunityIcons}
              name={icon}
              size={5}
              mr={2}
              color={theme.textSecondary}
            />
          ) : undefined
        }
      />
    </Box>
  );
}
