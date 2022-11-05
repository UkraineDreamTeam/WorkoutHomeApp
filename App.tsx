import React from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { RootStackParamList } from './src/types/types';
import { CustomTheme } from './src/theme';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import BottomStackNavigator from './src/stackNavigators/BotomStack';
import { Appearance } from 'react-native';

const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // const onAuthStateChanged = useCallback(
  //   (userDat: any) => {
  //     setUser(userDat);
  //     if (initializing) {
  //       setInitializing(false);
  //     }
  //   },
  //   [initializing]
  // );

  // const signIn = async () => {
  //   try {
  //     const userSub = async () => await firebase.auth().signInAnonymously();
  //     return userSub;
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   const userDAta = firebase.auth().onAuthStateChanged(onAuthStateChanged);

  //   return userDAta;
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        theme={
          Appearance.getColorScheme()
            ? {
                dark: true,
                colors: { ...CustomTheme.colors },
              }
            : {
                dark: true,
                colors: { ...CustomTheme.colors },
              }
        }
      >
        <BottomStackNavigator navigationRef={navigationRef} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
