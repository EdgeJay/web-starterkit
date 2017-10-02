import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import styled from 'styled-components';
import classNames from 'classnames';
import media from '../utils/media';

const Nav = styled.nav`
  margin: 0 -1rem;
  padding: 0 !important;
  background-color: lightgray;

  ${media.tablet`
    position: fixed;
    z-index: 100;
    margin: 0;
    padding: 2rem 0 0 0 !important;
    width: 32rem;
    top: 0;
    bottom: 0;
    left: 0;
  `}
`;

const NavMenu = styled.ul`
  display: block;
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 1rem 0 0 0;

  ${media.tablet`
    text-align: left;
    padding: 0;
  `}
`;

const NavItem = styled.li`
  display: inline-block;
  margin: 0;
  padding: 0;

  ${media.tablet`
    display: block;
  `}
`;

const NavLink = styled(Link)`
  display: block;
  color: #000;
  padding: 0.5rem 1rem;

  &:hover, &.selected {
    color: #fff;
    background-color: gray;
  }
`;

const SideMenu = (props) => {
  const cx = classNames;

  const generateMenuItems = () => {
    const { menu } = props;
    let key = 0;

    const items = menu.map((item) => {
      key += 1;

      // item.to can be a string or object
      let { pathname } = item.to;
      if (!pathname) {
        pathname = item.to;
      }

      const selected = pathname === props.location.pathname;

      return (
        <NavItem key={key}>
          <NavLink to={item.to} className={cx({ selected })}>{item.label}</NavLink>
        </NavItem>
      );
    });

    return items;
  };

  return (
    <Nav>
      <NavMenu>{generateMenuItems()}</NavMenu>
    </Nav>
  );
};

SideMenu.defaultProps = {
  menu: [],
};

SideMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default withRouter(SideMenu);
