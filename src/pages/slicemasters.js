import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const SlicemasterGridStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    margin: 2rem;
    margin-top: -6rem;
    padding: 1rem;
    background: var(--yellow);
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SliceMastersPage = ({ data }) => {
  const {
    slicemasters: { nodes: slicemasters, totalCount },
  } = data;
  console.log('totalCount:', totalCount);
  console.log(slicemasters);

  return (
    <SlicemasterGridStyles>
      {slicemasters.map((person) => (
        <SlicemasterStyles key={person.id}>
          <Link to={`/slicemaster/${person.slug.current}`}>
            <h2>
              <span className="mark">{person.name}</span>
            </h2>
          </Link>
          <Img fluid={person.image.asset.fluid} />
          <p className="description">{person.description}</p>
        </SlicemasterStyles>
      ))}
    </SlicemasterGridStyles>
  );
};

export default SliceMastersPage;
