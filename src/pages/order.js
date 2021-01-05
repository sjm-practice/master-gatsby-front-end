import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const MenuItem = ({ pizza }) => (
  <div>
    <Img
      width="50"
      height="50"
      fluid={pizza.image.asset.fluid}
      alt={pizza.name}
    />
    <div>
      <h2>{pizza.name}</h2>
    </div>
    <div>
      {['S', 'M', 'L'].map((size) => (
        <button type="button" key={size}>
          {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
        </button>
      ))}
    </div>
  </div>
);

const OrderPage = ({ data }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza!" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItem pizza={pizza} key={pizza.id} />
          ))}
        </fieldset>

        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
};
export default OrderPage;
