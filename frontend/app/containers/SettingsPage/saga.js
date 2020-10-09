import { call, put, takeLatest } from 'redux-saga/effects';

import apis from '../../api';
import errorToObject from '../../utils/errorToObject';
import * as actions from './actions';
import { POST_RSSURLS_REQUEST, GET_RSSURLS_REQUEST } from './constants';

export function* getRssUrls() {
  try {
    const rssUrls = yield call(apis.rss.getRssUrls);
    yield put(actions.getRssUrlsSuccess(rssUrls));
  } catch (error) {
    yield put(actions.getRssUrlsError(errorToObject(error)));
  }
}

export function* postRssUrls(action) {
  try {
    const rssUrls = yield call(apis.rss.postRssUrls, action.payload);
    yield put(actions.postRssUrlsSuccess(rssUrls));
  } catch (error) {
    yield put(actions.postRssUrlsError(errorToObject(error)));
  }
}


// Individual exports for testing
export default function* settingsPageSaga() {
  yield takeLatest(GET_RSSURLS_REQUEST, getRssUrls);
  yield takeLatest(POST_RSSURLS_REQUEST, postRssUrls);
}
