import React from 'react';
import styled from 'styled-components';

import { ButtonLink } from '../components';

const Container = styled.footer`
  padding-top: 5vh;
  padding-bottom: 3vh;
  margin-top: 20vh;
  text-align: center;
  font-size: 17px;

  @media (max-width: 849px) {
    font-size: 16px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <ButtonLink
        href="https://github.com/sachetpatil"
        target="_blank">
        Github
      </ButtonLink>
      <ButtonLink
        href="https://www.dropbox.com/s/ffusi43te87d7gi/Resume.pdf?dl=1"
        target="_blank">
        Resume
      </ButtonLink>
    </Container>
  );
};

export default Footer;
