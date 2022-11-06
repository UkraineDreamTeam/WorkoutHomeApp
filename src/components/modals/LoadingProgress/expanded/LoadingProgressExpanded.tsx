import React, { FC } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LoadingProgressExpandedLine } from './LoadingProgressExpandedLine';

type Props = {
  title: string;
  total: number;
  received: number;
  progress: Animated.Value;
  onPressHide: () => void;
};

export const LoadingProgressExpanded: FC<Props> = ({
  title,
  total,
  received,
  progress,
  onPressHide,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        uploaded {received} from {total}
      </Text>

      <LoadingProgressExpandedLine
        total={total}
        progress={progress}
        onPressHide={onPressHide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5,
    marginHorizontal: 15,
  },
  description: {
    fontSize: 10,
    fontWeight: '300',
    color: '#fff', // FIXME temporary solution. use theme style
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff', // FIXME temporary solution. use theme style
  },
});