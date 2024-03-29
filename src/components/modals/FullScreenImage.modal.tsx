import React, { FC, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { deleteImage } from '@redux/exercises/thunks/exrcises.thunk';
import { useAppDispatch } from '@redux/store';
import { COLORS, TYPOGRAPHY } from '@shared/theme';
import DeleteIcon from '@icons-components/DeleteIcon.component';

const FullScreenImage: FC<{ uri: string; deletable: boolean; id: string }> = ({
  uri,
  id,
  deletable,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modal]}>
          <Pressable
            style={[styles.touchableBackground]}
            onPress={() => setModalVisible(false)}
          />

          <View>
            {deletable ? (
              <Pressable
                style={styles.deleteButtonContainer}
                onPress={async () => {
                  setModalVisible(false);
                  await dispatch(deleteImage({ id, imageUri: uri }));
                }}
              >
                <View style={styles.deleteButton}>
                  <DeleteIcon height={20} />
                </View>
              </Pressable>
            ) : null}

            <FastImage
              source={{ uri }}
              style={styles.fullSizedImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <FastImage
          source={{ uri }}
          style={styles.pressableImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    overflow: 'hidden',
    position: 'relative',
  },
  pressableImage: {
    height: 120,
    width: 120,
  },
  imageButton: {
    height: 120,
    width: 120,
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    overflow: 'hidden',
    margin: 5,
    backgroundColor: 'white',
  },
  fullSizedImage: {
    height: Dimensions.get('screen').width - 20,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    margin: 'auto',
    borderRadius: TYPOGRAPHY.BORDER_RADIUS.average,
    overflow: 'hidden',
  },
  deleteButton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  deleteButtonContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  touchableBackground: {
    backgroundColor: COLORS.BLACK,
    position: 'absolute',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});

export default FullScreenImage;
