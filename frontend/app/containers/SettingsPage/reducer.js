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
  ADD_RSSURLS,
  UPDATE_RSSURLS
} from './constants';

export const initialState = {
  rssUrls: [],
};

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
      case UPDATE_RSSURLS:
        const {value, index} = action.payload;
        const list = [...draft.rssUrls]
        list[index]=value;
        draft.rssUrls = [...list]
        break;
      case ADD_RSSURLS:
        console.log('reducer add');
        const listAdd = [...draft.rssUrls,'www']
        listAdd[index]=value;
        draft.rssUrls = [...listAdd]
        break;
    }
  });

export default settingsPageReducer;
