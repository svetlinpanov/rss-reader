/*
 *
 * OverviewPage actions
 *
 */

import {
  GET_RSSITEMS_REQUEST,
  GET_RSSITEMS_SUCCESS,
  GET_RSSITEMS_ERROR,
} from './constants';

export const getRssItems = () => ({
  type: GET_RSSITEMS_REQUEST,
});
export const getRssItemsSuccess = rssItems => ({
  type: GET_RSSITEMS_SUCCESS,
  payload: rssItems,
});
export const getRssItemsError = error => ({
  type: GET_RSSITEMS_ERROR,
  error,
});
