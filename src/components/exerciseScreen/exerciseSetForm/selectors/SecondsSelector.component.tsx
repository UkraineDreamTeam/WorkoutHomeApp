import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { SECONDS } from '@shared/constants/options';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { styles as selectorStyles } from './styles';

export const SecondsSelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<ItemType<any>[]>(
    SECONDS.map(el => ({
      label: el,
      value: el,
      containerStyle: { ...selectorStyles.optionContainerStyle },
      labelStyle: { ...selectorStyles.optionTextStyle },
    }))
  );

  const CloseIconComponent = () => {
    return <Text style={styles.closeIconStyle} />;
  };

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownDirection="BOTTOM"
          CloseIconComponent={CloseIconComponent}
          max={5}
          listMode="MODAL"
          showTickIcon={false}
          showArrowIcon={false}
          closeOnBackPressed={true}
          placeholder=""
          searchable={false}
          searchPlaceholderTextColor="white"
          searchPlaceholder=""
          searchTextInputProps={{ keyboardType: 'number-pad', autoFocus: true }}
          modalProps={{
            animationType: 'fade',
            transparent: true,
            presentationStyle: 'overFullScreen',
          }}
          style={selectorStyles.container}
          labelStyle={selectorStyles.labelStyle}
          textStyle={selectorStyles.textStyle}
          containerStyle={selectorStyles.contentContainer}
          modalContentContainerStyle={styles.modalContentContainerStyle}
          modalTitleStyle={selectorStyles.modalTitleStyle}
          searchTextInputStyle={selectorStyles.searchTextInputStyle}
          searchContainerStyle={selectorStyles.searchContainerStyle}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export const styles = StyleSheet.create({
  modalContentContainerStyle: {
    alignItems: 'flex-start',
    marginTop: 283,
    marginRight: 85,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    marginLeft: 168,
    marginBottom: 150,
  },

  closeIconStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    transform: [{ translateY: -295 }, { translateX: -190 }],
    backgroundColor: COLORS.BLACK,
    opacity: 0.5,
  },
});
