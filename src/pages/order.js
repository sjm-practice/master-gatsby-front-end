/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import MenuItemStyles from '../styles/MenuItemStyles';
import OrderStyles from '../styles/OrderStyles';

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

const OrderPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });

  const MenuItem = ({ pizza }) => (
    <MenuItemStyles>
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
          <button
            type="button"
            key={size}
            onClick={() => addToOrder({ id: pizza.id, size })}
          >
            {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
          </button>
        ))}
      </div>
    </MenuItemStyles>
  );

  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>

        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItem pizza={pizza} key={pizza.id} />
          ))}
        </fieldset>

        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>
    </>
  );
};
export default OrderPage;
