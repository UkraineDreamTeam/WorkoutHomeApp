import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { COLOR_SCHEME } from "@shared/theme";

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={COLOR_SCHEME.WORKOUT_ACTIONS} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;
