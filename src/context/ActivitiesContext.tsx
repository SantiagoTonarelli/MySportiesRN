import React, {createContext, useReducer} from 'react';

import {ActivitiesReducer, ActivitiesState} from './activitiesReducer';
import {ActivitySelect, Activity} from '../interfaces/interfaces';

type ActivitiesContextProps = {
  activities: ActivitySelect[];
  loading: boolean;
  finishAdd: boolean;
  startAddActivity: (activity: ActivitySelect) => void;
  startLoading: () => void;
  endLoading: () => void;
  startFormAddActivity: () => void;
  finishAddActivity: () => void;
};

const ActivitiesInicialState: ActivitiesState = {
  activities: [],
  activity: null,
  loading: false,
  finishAdd: false,
};

export const ActivitiesContext = createContext({} as ActivitiesContextProps);

export const ActivitiesProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(
    ActivitiesReducer,
    ActivitiesInicialState,
  );

  const startAddActivity = (activity: ActivitySelect) => {
    dispatch({type: '[ui] Loading'});
    setTimeout(() => {
      dispatch({
        type: '[Activities] Add new',
        payload: activity,
      });
      dispatch({type: '[ui] End Loading'});
    }, 2000);
  };

  const finishAddActivity = () =>
    dispatch({
      type: '[Activities] Finish add selected activity',
    });

  const startFormAddActivity = () =>
    dispatch({
      type: '[Activities] Start activity',
    });

  const startLoading = () => dispatch({type: '[ui] Loading'});
  const endLoading = () => dispatch({type: '[ui] End Loading'});

  return (
    <ActivitiesContext.Provider
      value={{
        ...state,
        startAddActivity,
        startLoading,
        endLoading,
        finishAddActivity,
        startFormAddActivity,
      }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
