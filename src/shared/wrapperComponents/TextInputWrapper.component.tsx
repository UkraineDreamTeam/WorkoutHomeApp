import React, { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const TextInputWrapperComponent: FC<
  TextInputProps & { inputRef?: React.RefObject<TextInput> }
> = ({ style, inputRef, ...props }) => {
  return (
    <TextInput
      ref={inputRef ? inputRef : null}
      style={[{ color: 'white' }, style]}
      {...props}
    />
  );
};

export default TextInputWrapperComponent;
