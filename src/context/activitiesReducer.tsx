import {ActivitySelect, Activity} from '../interfaces/interfaces';

export interface ActivitiesState {
  activities: ActivitySelect[];
  activity: Activity | null;
  finishAdd: boolean;
  loading: boolean;
}

type ActivitiesAction =
  | {
      type: '[Activities] Add new';
      payload: ActivitySelect;
    }
  | {type: '[Activities] Finish add selected activity'}
  | {type: '[ui] Loading'}
  | {type: '[ui] End Loading'};

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
        finishAdd: true,
      };
    case '[Activities] Finish add selected activity':
      return {
        ...state,
        finishAdd: false,
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
