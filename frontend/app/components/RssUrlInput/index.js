/**
 *
 * RssUrlInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const RssUrlInput = ({ value = '', onInputChange }) => {
  const [url, setUrl] = React.useState(value);
  const handleInputChange = (inputValue) => {
    // const tString = inputValue.trim();
    setUrl(inputValue);
    onInputChange(inputValue);
  };
  return (
    <>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>url</InputGroupText>
      </InputGroupAddon>
      <Input
        placeholder="url"
        value={url}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </>
  );
};
RssUrlInput.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
};

export default RssUrlInput;
