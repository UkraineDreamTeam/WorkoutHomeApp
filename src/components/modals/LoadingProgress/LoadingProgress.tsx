import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { LoadingProgressExpanded } from './expanded/LoadingProgressExpanded';
import { LoadingProgressCollapsed } from './collapsed/LoadingProgressCollapsed';

type Props = {
  title: string;
  total: number;
  received: number;
};

export const LoadingProgress: FC<Props> = ({ title, total, received }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: received,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [progress, received]);

  const toggleLoadingProgress = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return isExpanded ? (
    <LoadingProgressExpanded
      title={title}
      total={total}
      received={received}
      progress={progress}
      onPressHide={toggleLoadingProgress}
    />
  ) : (
    <LoadingProgressCollapsed
      total={total}
      progress={progress}
      onPressShow={toggleLoadingProgress}
    />
  );
};