/**
 *
 * OverviewPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import RssListSearchable from 'components/RssListSearchable';

import { selectRssItems } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

export function OverviewPage({ rssItems = [], getRssItems }) {
  useEffect(() => {
    getRssItems();
  }, [getRssItems]);

  return <RssListSearchable items={rssItems} />;
}

OverviewPage.propTypes = {
  rssItems: PropTypes.array,
  getRssItems: PropTypes.func,
};

const mapStateToProps = state => ({
  rssItems: selectRssItems(state),
});

const mapDispatchToProps = dispatch => ({
  getRssItems: () => dispatch(actions.getRssItems()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  useInjectReducer({ key: 'overviewPage', reducer }),
  useInjectSaga({ key: 'overviewPage', saga }),
  withConnect,
)(OverviewPage);
