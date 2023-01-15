import React, { FC } from 'react';
import { COLORS, TYPOGRAPHY } from 'shared/theme';
import { Dimensions, Pressable, Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

const AddPlanPlansExistButtonComponent: FC<{
  handleOpen: () => void;
}> = ({ handleOpen }) => {
  return (
    <DropShadow
      style={[
        {
          shadowColor: COLORS.PINK,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        },
      ]}
      // onPress={() => console.log('pressed')}
    >
      <Pressable
        style={[
          {
            width: Dimensions.get('screen').width * 0.85,
            height: 50,
            backgroundColor: COLORS.VIOLET,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.small,
          },
        ]}
        onPress={handleOpen}
      >
        <Text
          style={[
            {
              color: COLORS.WHITE,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: '100%',
            },
          ]}
        >
          Add workout plan
        </Text>
      </Pressable>
    </DropShadow>
  );
};
export default AddPlanPlansExistButtonComponent;