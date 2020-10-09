/**
 *
 * SettingsPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { InputGroup, Button, Container, Row, Col } from 'reactstrap';
import RssUrlInput from 'components/RssUrlInput';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { selectRssUrls } from './selectors';
import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';

export function SettingsPage({ rssUrls = [], postRssUrls, getRssUrls, updateRssUrl, addRssUrl }) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    getRssUrls();
  }, []);

  useEffect(() => {
    setInputListInitial();
  }, [rssUrls]);

  const setInputListInitial = () => {
    const inputList = rssUrls.map((url, index) => (
      <RssUrlInput
        value={url}
        onInputChange={e => handleInputChange(e, index)}
      />
    ));
    setInputList([...inputList]);
  }

  const handleInputChange = (value, index) => {
    updateRssUrl(value,index);
  };

  const handleAddInput = () => {
    addRssUrl();
  };

  
  const handleSave = () => {
    console.log(rssUrls);
    postRssUrls(rssUrls.filter(x => x !== ''));
  };
  return (
    <div>
      <Container fluid>
        {inputList.map((item, index) => (
          <InputGroup key={index}>{item}</InputGroup>
        ))}
        <Row className="mt-1">
          <Col md={{ size: '1', offset: 10 }}>
            <Button color="secondary" size="md" onClick={handleAddInput}>
              Add
            </Button>
          </Col>
          <Col md="1">
            <Button color="primary" size="md" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

SettingsPage.propTypes = {
  rssUrls: PropTypes.array,
  currentUrls: PropTypes.array,
  postRssUrls: PropTypes.func,
  getRssUrls: PropTypes.func,
  updateRssUrl: PropTypes.func,
  addRssUrl: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rssUrls: selectRssUrls(state),
});

const mapDispatchToProps = dispatch => ({
  postRssUrls: currentUrls => dispatch(actions.postRssUrls(currentUrls)),
  getRssUrls: () => dispatch(actions.getRssUrls()),
  updateRssUrl: (value,index) => dispatch(actions.updateRssUrl(value,index)),
  addRssUrl: () => dispatch(actions.addRssUrl())
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);
