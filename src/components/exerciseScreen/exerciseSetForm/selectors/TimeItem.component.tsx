import React, { Dispatch, FC } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import TextInputWrapperComponent from "shared/wrapperComponents/TextInputWrapper.component";

type Props = {
  value: string | null;
  setValue: Dispatch<any>;
  name: 'seconds' | 'minutes';
  error: boolean;
  setError: Dispatch<boolean>;
  setTimeOnBlur: (name: 'seconds' | 'minutes') => void;
  setModal: boolean;
};
type ChangeEvent = { nativeEvent: { text: string } };

export const TimeItem: FC<Props> = ({
  value,
  setValue,
  name,
  error,
  setError,
  setTimeOnBlur,
  setModal,
}) => {
  const handleChange = (e: ChangeEvent) => {
    if (
      !e.nativeEvent.text.match(/[^0-9]/gi) &&
      Number(e.nativeEvent.text) < 60
    ) {
      setValue( e.nativeEvent.text.trim());
      setError(false);
    } else {
      setValue(e.nativeEvent.text.trim());
      setError(e.nativeEvent.text.trim() === e.nativeEvent.text);
    }
  };

  return (
    <View style={[styles.container]}>
      <TextInputWrapperComponent
        value={value?.toString()}
        keyboardType="numeric"
        style={[
          {
            borderColor: error ? 'red' : 'transparent',
            borderWidth: error ? 1 : 0,
            height: 40,
            width: 40,
            backgroundColor: setModal ? COLORS.BLACK : COLORS.GREY,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
            textAlign: 'center',
            fontFamily: TYPOGRAPHY.FONTS.medium
          },
        ]}
        onFocus={() => {
          setValue(null);
        }}
        onChange={handleChange}
        onBlur={() => setTimeOnBlur(name)}
        maxLength={2}
      />
    </View>
  );
};
