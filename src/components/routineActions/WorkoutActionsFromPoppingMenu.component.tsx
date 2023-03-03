import React, { FC } from 'react';

import { ROUTINE_ACTIONS } from 'shared/constants/constants';
import { RoutineControlButton } from 'components/routineActions/routineControl/RoutineControlButton.component';
import AreYouSureModal from 'components/modals/AreYouSure.modal';
import { useAppSelector } from 'redux/store';
import { selectedRoutine } from 'redux/exercises/exercises.slice';

const RoutineActions: FC<{ handleVisibility: () => void }> = ({
  handleVisibility,
}) => {
  const routine = useAppSelector(selectedRoutine);
  return (
    <>
      {ROUTINE_ACTIONS.map((action, i) => {
        switch (action) {
          case 'editSuperset':
            return (
              <RoutineControlButton
                key={i}
                setModalVisible={handleVisibility}
                action={action}
              />
            );
            break;
          case 'reorder':
            return (
              <RoutineControlButton
                key={i}
                setModalVisible={handleVisibility}
                action={action}
              />
            );
            break;
          case 'rename':
            return (
              <RoutineControlButton
                key={i}
                setModalVisible={handleVisibility}
                action={action}
              />
            );
            break;

          case 'delete':
            return (
              <AreYouSureModal
                key={i}
                handleVisibility={handleVisibility}
                action={action}

              />
            );
            break;
        }
      })}
    </>
  );
};

export default RoutineActions;
