import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import 'normalize.css';

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Typography />

    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
