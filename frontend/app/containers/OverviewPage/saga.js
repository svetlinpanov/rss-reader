import { call, put, takeLatest } from 'redux-saga/effects';

import apis from '../../api';
import errorToObject from '../../utils/errorToObject';
import * as actions from './actions';
import { GET_RSSITEMS_REQUEST } from './constants';

export function* getRssItems() {
  try {
    const rssItems = yield call(apis.rss.getRssItems);
    yield put(actions.getRssItemsSuccess(rssItems));
  } catch (error) {
    yield put(actions.getRssItemsError(errorToObject(error)));
  }
}

// Individual exports for testing
export default function* overviewPageSaga() {
  yield takeLatest(GET_RSSITEMS_REQUEST, getRssItems);
}
