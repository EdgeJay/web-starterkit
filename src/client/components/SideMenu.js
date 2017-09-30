import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

const Nav = styled.nav`
  padding-top: 2rem !important;
  background-color: lightgray;
  height: 100%;
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
`;

export default class SideMenu extends React.PureComponent {
  generateMenuItems() {
    const { menu } = this.props;
    let key = 0;

    const items = menu.map((item) => {
      key += 1;
      return (
        <NavItem key={key}>
          <Link to={item.href}>{item.label}</Link>
        </NavItem>
      );
    });

    return items;
  }

  render() {
    return (
      <Nav className={'column column-25'}>
        <NavMenu>{this.generateMenuItems()}</NavMenu>
      </Nav>
    );
  }
}

SideMenu.defaultProps = {
  menu: [],
};

SideMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.object,
  ),
};
