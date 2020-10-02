/*
 *
 * SettingsPage actions
 *
 */

import {
  POST_RSSURLS_REQUEST,
  POST_RSSURLS_SUCCESS,
  POST_RSSURLS_ERROR,
  GET_RSSURLS_REQUEST,
  GET_RSSURLS_SUCCESS,
  GET_RSSURLS_ERROR,
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
