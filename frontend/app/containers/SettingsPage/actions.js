/*
 *
 * SettingsPage actions
 *
 */

import {
  GET_RSSURLS_REQUEST,
  GET_RSSURLS_SUCCESS,
  GET_RSSURLS_ERROR,
  POST_RSSURLS_REQUEST,
  POST_RSSURLS_SUCCESS,
  POST_RSSURLS_ERROR,
  UPDATE_RSSURLS,
  ADD_RSSURLS
} from './constants';

export const postRssUrls = rssUrls => ({
  type: POST_RSSURLS_REQUEST,
  payload: rssUrls,
});
export const postRssUrlsSuccess = rssUrls => ({
  type: POST_RSSURLS_SUCCESS,
  payload: rssUrls,
});
export const postRssUrlsError = error => ({
  type: POST_RSSURLS_ERROR,
  error,
});

export const getRssUrls = () => ({
  type: GET_RSSURLS_REQUEST,
});
export const getRssUrlsSuccess = rssUrls => ({
  type: GET_RSSURLS_SUCCESS,
  payload: rssUrls,
});
export const getRssUrlsError = error => ({
  type: GET_RSSURLS_ERROR,
  error,
});
export const updateRssUrl = (value, index) => ({
  type: UPDATE_RSSURLS,
  payload: { value, index },
});
export const addRssUrl = () => ({
  type: ADD_RSSURLS,
});
