import path from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. get template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. loop over each pizza, create page for each
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // 1. get template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // 2. query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  // 3. loop over each pizza, create page for each
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
};

export async function createPages(params) {
  // create pages dynamically
  // 1. pizzas
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  // 2. toppings
  // 3. slicemasters
}
