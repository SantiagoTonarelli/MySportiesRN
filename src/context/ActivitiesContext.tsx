import React, {createContext, useReducer} from 'react';

import {ActivitiesReducer, ActivitiesState} from './activitiesReducer';
import {ActivitySelect, Activity} from '../interfaces/interfaces';

type ActivitiesContextProps = {
  activities: ActivitySelect[];
  finishAdd: boolean;
  startAddActivity: (activity: ActivitySelect) => () => void;
  finishAddActivity: () => void;
  startLoading: () => void;
  endLoading: () => void;
};

const ActivitiesInicialState: ActivitiesState = {
  activities: [],
  activity: null,
  finishAdd: false,
  loading: false,
};

export const ActivitiesContext = createContext({} as ActivitiesContextProps);

export const ActivitiesProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(
    ActivitiesReducer,
    ActivitiesInicialState,
  );

  const startAddActivity = (activity: ActivitySelect) => {
    return () => {
      dispatch({type: '[ui] Loading'});
      setTimeout(() => {
        dispatch({
          type: '[Activities] Add new',
          payload: activity,
        });
        dispatch({type: '[ui] End Loading'});
      }, 2000);
    };
  };

  const finishAddActivity = () =>
    dispatch({
      type: '[Activities] Finish add selected activity',
    });

  const startLoading = () => dispatch({type: '[ui] Loading'});
  const endLoading = () => dispatch({type: '[ui] End Loading'});

  return (
    <ActivitiesContext.Provider
      value={{
        ...state,
        startAddActivity,
        finishAddActivity,
        startLoading,
        endLoading,
      }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
