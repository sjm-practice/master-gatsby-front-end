import React from 'react';
import { Link } from 'gatsby';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/">SliceMasters</Link>
      </li>
      <li>
        <Link to="/">Order Ahead!</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
