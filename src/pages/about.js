import React from 'react';
import { graphql } from 'gatsby';

import {
  Button,
  HeaderBack,
  HeadingXL,
  Image,
  Layout,
  SEO,
  TextBody,
} from '../components';

const About = ({ data }) => {
  return (
    <>
      <SEO title="About" />
      <HeaderBack />
      <Layout>
        <HeadingXL>About</HeadingXL>
        <Image fluid={data.MyPhoto.childImageSharp.fluid} />
        <TextBody>
          Software Engineering Manager based in NYC with a background in Data Engineering 
          and building micro-services using Python Flask and a keen follower of the 
          Apache Airflow Project.
          <br />
          <br />
          An Agile Software Development Methodology proponent and advocate for scalable, 
          healthy SDLC practices.
        </TextBody>
        <Button href="mailto:sachetpatil89&#64;gmail.com">Get in touch</Button>
      </Layout>
    </>
  );
};

export default About;

export const query = graphql`
  query {
    MyPhoto: file(relativePath: { eq: "Sachet.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
