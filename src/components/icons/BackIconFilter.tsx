import React from 'react';
import { TouchableOpacity } from 'react-native';
import Back from '../../assets/icons/BackArrow.svg';
const BackIconFilter = ({ handleFilters }: { handleFilters: () => void }) => {
  return (
    <TouchableOpacity
      style={[
        {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
          // //   padding: 20,
          paddingRight: 15,
          paddingLeft: 10,
          maxWidth: 50,
        },
      ]}
      onPress={handleFilters}
    >
      <Back />
    </TouchableOpacity>
  );
};
export default BackIconFilter;
