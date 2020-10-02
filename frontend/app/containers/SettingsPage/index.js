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

export function SettingsPage({ rssUrls = [], postRssUrls, getRssUrls }) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  const [inputList, setInputList] = useState([]);
  const [currentUrls, setCurrentUrls] = useState([]);

  useEffect(() => {
    getRssUrls();
    initialLoad();
  }, [getRssUrls]);

  const initialLoad = () => {
    const list = rssUrls.map((url, index) => (
      <RssUrlInput
        value={url}
        onInputChange={e => handleInputChange(e, index)}
      />
    ));
    setCurrentUrls(rssUrls);
    setInputList(list);
  };
  // setInputList(inputListMap);

  const handleInputChange = (value, index) => {
    const list = [...rssUrls];
    list[index] = value;
    setCurrentUrls(list);
    // console.log(list);
  };

  const handleAddInput = () => {
    const list = [
      ...inputList,
      <RssUrlInput
        value=""
        onInputChange={e => handleInputChange(e, inputList.length)}
      />,
    ];
    setInputList(list);
    setCurrentUrls([...currentUrls, '']);
  };
  const handleSave = () => {
    const list = currentUrls.filter(x => x !== '');
    postRssUrls(list);
  };
  return (
    <div>
      <Container fluid>
        {inputList.map(item => (
          <InputGroup key={item.title}>{item}</InputGroup>
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
  postRssUrls: PropTypes.func,
  getRssUrls: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  rssUrls: selectRssUrls(state),
});

const mapDispatchToProps = dispatch => ({
  postRssUrls: currentUrls => dispatch(actions.postRssUrls(currentUrls)),
  getRssUrls: () => dispatch(actions.getRssUrls()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);
