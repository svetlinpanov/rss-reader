import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the overviewPage state domain
 */

const selectOverviewPageDomain = state => state.overviewPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OverviewPage
 */

const selectRssItems = createSelector(
  selectOverviewPageDomain,
  overviewPage => overviewPage.rssItems,
);

export { selectRssItems };
