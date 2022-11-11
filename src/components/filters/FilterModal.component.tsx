import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import { filters } from '../../redux/exercises/exercises.slice';
import { useAppSelector } from '../../redux/store';
import { COLORS, TYPOGRAPHY } from '../../theme';
import FiltersSection from './FiltersSection.component';

const FilterContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const animRef = useRef(new Animated.Value(0)).current;
  const animFlatlist = useCallback(() => {
    Animated.timing(animRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animRef]);

  const animFadeFlatlist = useCallback(() => {
    Animated.timing(animRef, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animRef]);
  const filter = useAppSelector(filters);

  const [showFilters, setShowFilters] = useState<keyof typeof filter | null>(
    null
  );

  const titles = {
    bodyPart: 'Category',
    type: 'Type',
    target: 'Muscle',
    equipment: 'Equipment',
  };
  return (
    <View style={style.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <FlatList
          style={{
            height: Dimensions.get('screen').height * 0.6,
            marginTop: 90,
            marginBottom: 60,

            backgroundColor: COLORS.BLACK,
            marginHorizontal: 30,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
          }}
          initialScrollIndex={0}
          data={Object.entries(filter)}
          renderItem={({ item }) => (
            <View style={[{ flexShrink: 1 }]}>
              <Text
                style={[
                  {
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    color: 'white',
                    fontSize: 14,
                  },
                ]}
              >
                {titles[item[0] as keyof typeof filter]}
              </Text>
              <FiltersSection
                list={item[1]}
                name={showFilters || 'bodyPart'}
                hide={setShowFilters}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>
      <Pressable
        style={[style.button, style.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={style.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },
  filterButton: {
    borderColor: 'white',
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FilterContainer;
