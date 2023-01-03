import React, { FC, memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { COLOR_SCHEME } from '@shared/theme';

type Props = {
  total: number;
  onPressShow: () => void;
  progress: Animated.Value;
};

export const LoadingProgressCollapsed: FC<Props> = memo(
  ({ total, onPressShow, progress }) => {
    const [progressLineWidth, setProgressLineWidth] = useState(0);

    return (
      <View style={styles.container}>
        <View
          style={styles.progressLineContainer}
          onLayout={({ nativeEvent }) =>
            progressLineWidth === 0 &&
            setProgressLineWidth(nativeEvent.layout.width)
          }
        >
          <Animated.View
            style={[
              styles.progressLine,
              {
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, total],
                      outputRange: [0, progressLineWidth],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <TouchableOpacity onPress={onPressShow}>
          <Text style={styles.showText}>show</Text>
        </TouchableOpacity>
      </View>
    );
  },
  () => true // fully memoization, ignoring any updates
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },

  progressLineContainer: {
    height: 2,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff', // FIXME temporary solution. use theme style
    marginRight: 10,
  },
  progressLine: {
    height: 2,
    width: '100%',
    backgroundColor: COLOR_SCHEME.ANOTHER_ACTIONS,
    position: 'absolute',
    left: '-100%',
  },
  showText: {
    color: COLOR_SCHEME.WHITE100, // FIXME temporary solution. use theme style
  },
});
