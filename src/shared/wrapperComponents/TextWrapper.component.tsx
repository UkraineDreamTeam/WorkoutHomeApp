import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';

const TextWrapperComponent: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={[{ color: 'white' }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextWrapperComponent;
