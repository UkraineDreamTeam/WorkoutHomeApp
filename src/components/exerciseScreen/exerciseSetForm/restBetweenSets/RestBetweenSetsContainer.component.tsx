import React, { useState } from 'react';
import { View } from 'react-native';
import RestBetweenSetsSwitch from 'components/exerciseScreen/exerciseSetForm/restBetweenSets/RestEnablingSwitch.component';
import RestTimeSelectorComponent from 'components/exerciseScreen/exerciseSetForm/restBetweenSets/RestTimeSelector.component';

const RestBetweenSetsContainerComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <RestBetweenSetsSwitch
        isEnabled={isEnabled}
        toggleSwitch={toggleSwitch}
      />
      {isEnabled ? <RestTimeSelectorComponent /> : null}
    </View>
  );
};
export default RestBetweenSetsContainerComponent;
