import { useState } from 'react';

const usePizza = ({ pizzas, inputs }) => {
  // 1. create some state to hold our order
  const [order, setOrder] = useState([]);

  // 2. make a function to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };

  // 3. make a function ro remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // keep all items before the item being removed
      ...order.slice(0, index),
      // keep all items after the item being removed
      ...order.slice(index + 1),
    ]);
  };

  // 4. send this data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
