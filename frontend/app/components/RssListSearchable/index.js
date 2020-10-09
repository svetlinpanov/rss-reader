/**
 *
 * RssListSearchable
 *
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
// CardTitle, CardSubtitle, CardText, Button
const defaultSearchStringify = item => item.title;

const RssListSearchable = ({
  items = [],
  // searchStringify = defaultSearchStringify,
}) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // useEffect(() => {
  //   const filteredItems = items.filter(item =>
  //     searchStringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  //   setSearchResults(filteredItems);
  // }, [searchTerm, items, searchStringify]);
  // setSearchResults(items);
  return (
    <Fragment>
      <Container fluid>
        {items.map((item, index) => (
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
      PublishDate: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  ),
  // searchStringify: PropTypes.func,
};

export default RssListSearchable;
