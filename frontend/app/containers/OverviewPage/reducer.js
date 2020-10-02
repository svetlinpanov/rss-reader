/*
 *
 * OverviewPage reducer
 *
 */
import produce from 'immer';
import { GET_RSSITEMS_SUCCESS, GET_RSSITEMS_ERROR } from './constants';

export const initialState = {
  rssItems: [],
  rssUrls: [],
};

/* eslint-disable default-case, no-param-reassign */
const overviewPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_RSSITEMS_SUCCESS:
        draft.rssItems = action.payload;
        delete draft.error;
        break;
      case GET_RSSITEMS_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default overviewPageReducer;
