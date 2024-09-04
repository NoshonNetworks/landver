import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnection from './WalletConnection';

function Layout({ children }) {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register Land</Link></li>
          <li><Link to="/lands">Land List</Link></li>
        </ul>
      </nav>
      <WalletConnection />
      {children}
    </div>
  );
}

export default Layout;