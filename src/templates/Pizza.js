import React from 'react';
import { graphql } from 'gatsby';

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

const SinglePizzaPage = ({ data }) => (
  <div>Single Pizza - {data.pizza.name}!</div>
);

export default SinglePizzaPage;
