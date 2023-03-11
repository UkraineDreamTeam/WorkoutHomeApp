import React from 'react';
import 'react-native-gesture-handler';


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
import { SafeAreaView, Text } from 'react-native';

const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: CustomTheme.colors.background ,  }}
      >
        <LoadingExercises />
        <NavigationContainer
          ref={navigationRef}
          theme={{
            dark: true,
            colors: { ...CustomTheme.colors, text: '#FFFFFF' }
          }}
          fallback={<Text>Loading..</Text>}
        >
          <BottomStackNavigator navigationRef={navigationRef} />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
