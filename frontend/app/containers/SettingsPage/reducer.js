/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';
import {
  POST_RSSURLS_SUCCESS,
  POST_RSSURLS_ERROR,
  GET_RSSURLS_SUCCESS,
  GET_RSSURLS_ERROR,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_RSSURLS_SUCCESS:
        draft.rssUrls = action.payload;
        delete draft.error;
        break;
      case POST_RSSURLS_ERROR:
        draft.error = action.error;
        break;
      case GET_RSSURLS_SUCCESS:
        draft.rssUrls = action.payload;
        delete draft.error;
        break;
      case GET_RSSURLS_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default settingsPageReducer;
