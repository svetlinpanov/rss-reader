/**
 *
 * RssUrlInput
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const RssUrlInput = ({ value = '', onInputChange }) => {
  const [url, setUrl] = React.useState(value);
  const handleInputChange = inputValue => {
    setUrl(inputValue);
    onInputChange(inputValue);
  };
  return (
    <Fragment>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>url</InputGroupText>
      </InputGroupAddon>
      <Input
        placeholder="url"
        value={url}
        onChange={e => handleInputChange(e.target.value)}
      />
    </Fragment>
  );
};
RssUrlInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
};

export default RssUrlInput;
