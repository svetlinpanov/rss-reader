/**
 *
 * Navigation
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export function Navigation() {
  const history = useHistory();

  const overviewHandler = () => {
    history.push('/overview');
  };
  const settingsHandler = () => {
    history.push('/settings');
  };
  return (
    <Fragment>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">RSS Feeds Reader</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" onClick={overviewHandler}>
              Overview
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" onClick={settingsHandler}>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </Fragment>
  );
}

Navigation.propTypes = {
  // overviewHandler: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Navigation);
