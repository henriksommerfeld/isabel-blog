import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

export default function NavBar(): ReactElement {
  return (
    <div className="navbar-start has-text-centered">
      <Link className="navbar-item" to="/about">
        About
      </Link>
      <Link className="navbar-item" to="/products">
        Products
      </Link>
      <Link className="navbar-item" to="/blog">
        Blog
      </Link>
    </div>
  );
}
