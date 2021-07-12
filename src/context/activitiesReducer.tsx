import {ActivitySelect, Activity} from '../interfaces/interfaces';

export interface ActivitiesState {
  activities: ActivitySelect[];
  activity: Activity | null;
  loading: boolean;
  finishAdd: boolean;
}

type ActivitiesAction =
  | {
      type: '[Activities] Add new';
      payload: ActivitySelect;
    }
  | {type: '[Activities] Finish add selected activity'}
  | {type: '[ui] Loading'}
  | {type: '[ui] End Loading'}
  | {type: '[Activities] Start activity'}
  | {type: '[Activities] Finish add selected activity'};

export const ActivitiesReducer = (
  state: ActivitiesState,
  action: ActivitiesAction,
): ActivitiesState => {
  switch (action.type) {
    case '[Activities] Add new':
      return {
        ...state,
        activities: [action.payload, ...state.activities].sort(
          (a, b) => a.date.getDate() - b.date.getDate(),
        ),
        finishAdd: false,
      };
    case '[Activities] Finish add selected activity':
      return {
        ...state,
        finishAdd: false,
      };

    case '[Activities] Start activity':
      return {
        ...state,
        finishAdd: true,
      };

    case '[ui] Loading':
      return {
        ...state,
        loading: true,
      };

    case '[ui] End Loading':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
