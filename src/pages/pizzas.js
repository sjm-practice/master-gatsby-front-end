import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';

// note, the query can be named anything. Gatsby recognizes an exported qraphql query, and generates
// data props for the page using the query. (query could be named pageQuery, or anything else)
export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  return <PizzaList pizzas={pizzas} />;
};

export default PizzasPage;
