import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import FilterIcon from '@icons-components/Filter.component';
import Close from '@assets/icons/Close.svg';
import {
  applyFilters,
  clearFilters,
  selectedFilters,
} from '@redux/exercises/exercises.slice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import FiltersSection from './FiltersSection.component';
import { FILTER_TITLES } from '@shared/constants/constants';
import { FilterNames } from '@redux/types';
import TextWrapperComponent from "shared/wrapperComponents/TextWrapper.component";

const FilterContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const filter = useAppSelector(selectedFilters);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          dispatch(clearFilters());
        }}
      >
        <Pressable
          style={[
            {
              position: 'absolute',
              left: Dimensions.get('screen').width - 60,
              top: 40,
              padding: 20,
              zIndex: 1,
            },
          ]}
          onPress={() => {
            setModalVisible(false);
            dispatch(clearFilters());
          }}
        >
          <Close fill={COLORS.RED} />
        </Pressable>
        <Pressable
          style={[
            {
              backgroundColor: COLORS.BLUE_GREY,
              opacity: 0.5,
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
              position: 'absolute',
            },
          ]}
          onPress={() => {
            setModalVisible(false);
            dispatch(clearFilters());
          }}
        />

        <View
          style={[
            {
              marginTop: 90,
              marginBottom: 5,
              backgroundColor: COLORS.BLACK,
              marginHorizontal: 10,
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: TYPOGRAPHY.BORDER_RADIUS.big,
              elevation: 24,
              // padding: 10,
            },
          ]}
        >
          <FlatList
            style={{
              height: Dimensions.get('screen').height * 0.7,
              borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
            }}
            initialScrollIndex={0}
            data={Object.entries(filter)}
            renderItem={({ item }) => (
              <View style={[{ flexShrink: 1 }]}>
                <TextWrapperComponent
                  style={[
                    {
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      fontSize: 16,
                      padding: 20,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {FILTER_TITLES[item[0] as FilterNames]}
                </TextWrapperComponent>
                <FiltersSection list={item[1]} name={item[0] as FilterNames} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'flex-end',
                alignContent: 'flex-end',
                justifyContent: 'flex-end',
                marginVertical: 10,
                alignSelf: 'center',
              },
            ]}
          >
            <Pressable
              style={[styles.button, styles.buttonApply]}
              onPress={() => {
                setModalVisible(false);

                dispatch(applyFilters());
                dispatch(clearFilters());
              }}
            >
              <TextWrapperComponent style={styles.textStyle}>Apply filters</TextWrapperComponent>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            maxWidth: Dimensions.get('screen').width / 3,
            borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,

            alignSelf: 'center',
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <FilterIcon />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },
  filterButton: {
    borderColor: 'white',
    paddingVertical: 5,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },

  buttonClose: {
    borderColor: COLORS.VIOLET,
    borderWidth: 1,
  },
  buttonApply: {
    backgroundColor: COLORS.VIOLET,
    width: Dimensions.get('screen').width * 0.6,
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
