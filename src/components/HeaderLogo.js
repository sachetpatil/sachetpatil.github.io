import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { FixedBar } from '../components';

const HeaderWrapper = styled(FixedBar)`
  justify-content: space-between;
`;

const Logo = styled.p`
  font-size: 26px;
  font-weight: 700;

  @media (max-width: 849px) {
    font-size: 28px;
  }
`;

const HeaderLogo = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo>~/home</Logo>
      </Link>
      <Link to="/about">
        <Logo>about</Logo>
      </Link>
    </HeaderWrapper>
  );
};

export default HeaderLogo;
