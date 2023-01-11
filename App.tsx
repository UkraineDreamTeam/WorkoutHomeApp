import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from '@shared/types/types';
import { CustomTheme } from '@shared/theme';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import BottomStackNavigator from './src/stackNavigators/BotomStack';
import { LoadingExercises } from '@components/modals/LoadingExercises';
import { Text, View } from 'react-native';

const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: CustomTheme.colors.background }}>
        <LoadingExercises />
        <NavigationContainer
          ref={navigationRef}
          theme={{
            dark: false,
            colors: { ...CustomTheme.colors, text: '#FFFFFF' },
          }}
          fallback={<Text>Loading..</Text>}
        >
          <BottomStackNavigator navigationRef={navigationRef} />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
