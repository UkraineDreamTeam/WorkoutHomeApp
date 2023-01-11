import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import {
  selectedPlan,
  selectWorkoutPlan,
} from 'redux/exercises/exercises.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { WorkoutPlan } from 'redux/types';
import DropShadow from 'react-native-drop-shadow';
import AddPlanPlanExistComponent from 'components/modals/AddPlanOrRoutine/AddButtons/AddPlanPlanExist.component';

type Props = {
  data: WorkoutPlan[];
};

const WorkoutPlanPickerComponent: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const selectedItem: WorkoutPlan | undefined = useAppSelector(selectedPlan);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const [items, setItems] = useState<ItemType<any>[]>(
    data.map(el => ({
      label: el.name,
      value: el.name,
      containerStyle: styles.itemContainerStyle,
      labelStyle: styles.itemLabelStyle,
    }))
  );
  useEffect(() => {
    setItems(
      data.map(el => ({
        label: el.name,
        value: el.name,
        containerStyle: styles.itemContainerStyle,
        labelStyle: styles.itemLabelStyle,
      }))
    );
  }, [data]);

  useEffect(() => {
    setValue(selectedItem?.name || data[0]?.name);
  }, [data]);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        selectedItemLabelStyle={styles.selectedItemLabel}
        style={styles.dropDown}
        onSelectItem={item => {
          dispatch(selectWorkoutPlan(item.value));
        }}
        labelStyle={{ color: COLORS.WHITE, height: 30 }}
        textStyle={{ color: COLORS.WHITE }}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
      {open ? (
        <AddPlanPlanExistComponent
          title={'Add workout plan'}
          setOpen={setOpen}
        />
      ) : null}
    </View>
  );
};
export const styles = StyleSheet.create({
  dropDownContainerStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: 4,
    top: 110,
  },
  dropDown: {
    width: Dimensions.get('screen').width - 65,
    backgroundColor: COLORS.BLACK,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    marginLeft: 5,
    zIndex: 1,
  },
  itemContainerStyle: {
    backgroundColor: 'black',
    width: Dimensions.get('screen').width * 0.85,
  },
  itemLabelStyle: {
    width: Dimensions.get('screen').width * 0.85,
    color: COLORS.WHITE,
  },
  selectedItemLabel: {
    fontWeight: 'bold',
    color: COLORS.PINK,
    fontSize: 15,
  },
});

export default WorkoutPlanPickerComponent;
