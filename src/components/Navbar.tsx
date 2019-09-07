import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

export default function NavBar(): ReactElement {
  return <div style={{ fontSize: '1.5em' }}>🍔</div>;

  // return (
  //   <div>
  //     <Link to="/om">Om mig</Link>
  //     <Link to="/publicerat">Publicerat</Link>
  //     <Link to="/blog">Pressbilder</Link>
  //   </div>
  // );
}

function NameWithHamburger() {}
