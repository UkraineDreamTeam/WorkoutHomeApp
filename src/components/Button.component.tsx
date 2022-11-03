import React from 'react';
import { SafeAreaView, Pressable } from 'react-native';
import { Text } from 'react-native-svg';

export type ButtonProps = {
  text: string;
};
const Button = (props: ButtonProps) => {
  return (
    <SafeAreaView>
      <Pressable>
        <Text> {props.text}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Button;