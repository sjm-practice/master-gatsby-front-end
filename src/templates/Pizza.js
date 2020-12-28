import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const PizzaGridStyled = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

const SinglePizzaPage = ({ data: { pizza } }) => (
  <PizzaGridStyled>
    <Img fluid={pizza.image.asset.fluid} />
    <div>
      <h2 className="mark">{pizza.name}</h2>
      <ul>
        {pizza.toppings.map((topping) => (
          <li key={topping.id}>{topping.name}</li>
        ))}
      </ul>
    </div>
  </PizzaGridStyled>
);

export default SinglePizzaPage;
