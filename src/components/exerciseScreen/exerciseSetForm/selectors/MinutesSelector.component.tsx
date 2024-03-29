import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { MINUTES } from '@shared/constants/options';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import { styles as selectorStyles } from './styles';

export const MinutesSelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState<ItemType<any>[]>(
    MINUTES.map(el => ({
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
        listMode="MODAL"
        showTickIcon={false}
        showArrowIcon={false}
        closeOnBackPressed={true}
        placeholder=""
        searchable={false}
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
  );
};
export const styles = StyleSheet.create({
  modalContentContainerStyle: {
    alignItems: 'flex-start',
    marginTop: 283,
    marginRight: 92,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    marginLeft: 110,
    marginBottom: 150,
  },

  closeIconStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    transform: [{ translateY: -295 }, { translateX: -130 }],
    backgroundColor: COLORS.BLACK,
    opacity: 0.5,
  },
});
