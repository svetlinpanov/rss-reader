/**
 *
 * RssListSearchable
 *
 */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Container, Row, Col, Card, CardBody, InputGroupAddon, InputGroupText, Input,  InputGroup } from 'reactstrap';
const defaultSearchStringify = item => item.title + item.publishDate.toISOString() + item.source;

const RssListSearchable = ({
  items = [],
  searchStringify = defaultSearchStringify,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const filteredItems = items.filter(item =>
      searchStringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(filteredItems);
  }, [searchTerm, items, searchStringify]);
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>search</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />    
            </InputGroup>    
          </Col>
        </Row>
        {searchResults.map((item, index) => (
          <Row key={index}>
            <Col>
              <Card color="info">
                <CardBody onClick={() => window.open(item.link, '_blank')}>
                  {item.title}
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </Fragment>
  );
};

RssListSearchable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      source: PropTypes.string,
      sourceUrl: PropTypes.string,
      link: PropTypes.string,
      publishDate: PropTypes.date,
      description: PropTypes.string,
    }).isRequired,
  ),
  // searchStringify: PropTypes.func,
};

export default RssListSearchable;
