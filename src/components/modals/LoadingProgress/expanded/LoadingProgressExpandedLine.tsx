import React, { FC, memo, useState } from 'react';import {  View,  Text,  TouchableOpacity,  Animated,  StyleSheet,} from 'react-native';import { COLOR_SCHEME } from '@shared/theme';import TextWrapperComponent from "shared/wrapperComponents/TextWrapper.component";type Props = {  progress: Animated.Value;  total: number;  onPressHide: () => void;};export const LoadingProgressExpandedLine: FC<Props> = memo(  ({ progress, total, onPressHide }) => {    const [progressLineWidth, setProgressLineWidth] = useState(0);    return (      <>        <View          style={styles.progressLineContainer}          onLayout={({ nativeEvent }) =>            progressLineWidth === 0 &&            setProgressLineWidth(nativeEvent.layout.width)          }        >          <Animated.View            style={[              styles.progressLine,              {                transform: [                  {                    translateX: progress.interpolate({                      inputRange: [0, total],                      outputRange: [0, progressLineWidth],                    }),                  },                ],              },            ]}          />        </View>        <TouchableOpacity onPress={onPressHide}>          <TextWrapperComponent style={styles.hideText}>Hide</TextWrapperComponent>        </TouchableOpacity>      </>    );  });const styles = StyleSheet.create({  progressLineContainer: {    height: 2,    width: '100%',    overflow: 'hidden',    marginTop: 5,    backgroundColor: '#fff',  },  progressLine: {    height: 2,    width: '100%',    backgroundColor: COLOR_SCHEME.ANOTHER_ACTIONS,    position: 'absolute',    left: '-100%',  },  hideText: {    color: COLOR_SCHEME.ANOTHER_ACTIONS,    marginTop: 5,    alignSelf: 'flex-end',    marginRight: 10,  },});