import React from 'react';
import { Link } from 'gatsby';

export default function NavBar() {
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
